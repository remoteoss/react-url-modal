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

export const URLModal = ({
  modals,
  Wrapper,
  usePortal,
  portalElement,
  adapter,
  replace,
}: ModalWrapperProps) => {
  store.setState({ adapter: adapter || null, replace });
  const [extraProps, setExtraProps] = useState({});
  const urlParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : { get: () => null };
  const [modalName, setModalName] = useState<string | null>(
    urlParams.get(MODAL_KEY)
  );

  const popStateListener = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modalQuery = urlParams.get(MODAL_KEY);

    if (!modalQuery) {
      setModalName(null);
      setExtraProps({});
    }

    if (modalQuery && modals[modalQuery]) {
      setModalName(modalQuery);
    }
    // run this when location search changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modals, typeof window !== 'undefined' ? window.location.search : {}]);
  const modalTriggerListener = useCallback(
    (event: CustomEvent) => {
      const { modalName, props } = event.detail || {};

      if (!modalName) {
        setModalName(null);
        setExtraProps({});
      }

      if (modalName && modals[modalName]) {
        setExtraProps(props);
        setModalName(modalName);
      }
    },
    [modals]
  );
  useCustomEvent('modal-trigger', modalTriggerListener);
  useCustomEvent('popstate', popStateListener);

  useEffect(() => {
    // load modal if a modal is on the url at load
    popStateListener();
  }, [popStateListener]);

  if (typeof window === 'undefined') return null;

  const getData = () => {
    const urlData = urlParams.get(PARAMS_KEY);
    if (!urlData) return null;
    try {
      return decodedUrlParams();
    } catch {
      return null;
    }
  };

  const Component = modalName ? modals[modalName] : null;

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
              window.dispatchEvent(new Event(`${modalName}-submit`))
            }
            params={getData()}
            modalName={modalName}
            {...extraProps}
          />
        </Suspense>
      </WrapperEl>
    </RootEl>
  );
};
