import React, {
  useState,
  useEffect,
  Suspense,
  useCallback,
  Fragment,
  LazyExoticComponent,
  ElementType,
} from 'react';
import { MODAL_KEY, PARAMS_KEY } from './constants';
import { closeModal, decodedUrlParams, store, adapters } from './helpers';
import { useCustomEvent } from './hooks/useCustomEvent';
import { Portal } from './Portal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentType = (...args: any) => JSX.Element;

export type ModalChildren = ComponentType | LazyExoticComponent<ComponentType>;

export interface ModalWrapperProps {
  modals: {
    [name: string]: ModalChildren;
  };
  Wrapper?: ElementType;
  usePortal?: boolean;
  portalElement?: HTMLElement | null;
  adapter?: adapters;
  replace?: boolean;
}

interface ModalState {
  name?: string | null;
  params?: Record<string, unknown> | null;
  extraProps?: Record<string, unknown> | null;
}

function urlIntoModalState(): ModalState {
  const urlParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : { get: () => null };
  const modalName = urlParams.get(MODAL_KEY);
  const encodedParams = urlParams.get(PARAMS_KEY);

  if (!modalName) return { name: null, extraProps: {}, params: {} };

  return {
    name: modalName,
    params: decodedUrlParams(encodedParams),
    extraProps: {},
  };
}

export const URLModal = ({
  modals,
  Wrapper,
  usePortal,
  portalElement,
  adapter,
  replace,
}: ModalWrapperProps) => {
  const [modalState, setModalState] = useState<ModalState>(urlIntoModalState());

  const popStateListener = useCallback(() => {
    setModalState(urlIntoModalState());

    // Run this when location search changes
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modals, typeof window !== 'undefined' ? window.location.search : {}]);
  const modalTriggerListener = useCallback(
    (event: CustomEvent) => {
      const { modalName, props } = event.detail || {};

      if (!modalName) {
        setModalState({ name: null, extraProps: {}, params: {} });
      }

      if (modalName && modals[modalName]) {
        setModalState({
          name: modalName,
          extraProps: props,
          params: props.params,
        });
      }
    },
    [modals]
  );
  useCustomEvent('modal-trigger', modalTriggerListener);
  useCustomEvent('popstate', popStateListener);

  useEffect(() => {
    store.setState({ adapter: adapter || null, replace });
  }, [adapter, replace]);

  useEffect(() => {
    // load modal if a modal is on the url at load
    popStateListener();
  }, [popStateListener]);

  if (typeof window === 'undefined') return null;

  const Component = modalState.name ? modals[modalState.name] : null;

  if (!Component) return null;

  const WrapperEl = Wrapper ? Wrapper : Fragment;
  const wrapperProps = Wrapper
    ? {
        visible: !!Component,
        onClose: closeModal,
      }
    : {};

  const RootEl = usePortal ? Portal : Fragment;
  const rootElProps = usePortal
    ? {
        parent: portalElement,
      }
    : {};

  return (
    <RootEl {...rootElProps}>
      <WrapperEl {...wrapperProps}>
        <Suspense fallback={false}>
          <Component
            onCancel={closeModal}
            onClose={closeModal}
            onSubmit={() =>
              window.dispatchEvent(new Event(`${modalState.name}-submit`))
            }
            params={modalState.params}
            modalName={modalState.name}
            {...modalState.extraProps}
          />
        </Suspense>
      </WrapperEl>
    </RootEl>
  );
};
