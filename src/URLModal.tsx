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
import { createURL, decodedUrlParams, encodeUrlParams } from './helpers';
import { useCustomEvent } from './hooks/useCustomEvent';
import { Portal } from './Portal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentType = (...args: any) => JSX.Element;

export type ModalChildren = ComponentType | LazyExoticComponent<ComponentType>;

export type openModalProps = {
  name: string;
  params?: Record<string, unknown>;
};

export interface ModalWrapperProps {
  modals: {
    [name: string]: ModalChildren;
  };
  Wrapper?: ElementType;
  usePortal?: boolean;
  portalElement?: HTMLElement | null;
}

const routerPush = (href: string) =>
  window.history.pushState({ path: href }, '', href);

const routerReplace = (href: string) =>
  window.history.replaceState({ path: href }, '', href);

const cleanSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get(PARAMS_KEY)) urlParams.delete(PARAMS_KEY);
  if (urlParams.get(MODAL_KEY)) urlParams.delete(MODAL_KEY);

  return createURL(urlParams);
};

export const openModal = ({ name, params, ...props }: openModalProps) => {
  routerReplace(cleanSearchParams());
  const urlParams = new URLSearchParams(window.location.search);

  urlParams.set(MODAL_KEY, name);
  if (params) urlParams.set(PARAMS_KEY, encodeUrlParams(params));

  routerPush(createURL(urlParams));

  const event = new CustomEvent('modal-trigger', {
    detail: {
      modalName: name,
      props: {
        params,
        ...props,
      },
    },
  });
  window.dispatchEvent(event);
};

export const closeModal = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);

  routerPush(cleanSearchParams());

  window.dispatchEvent(new Event('modal-trigger'));
  window.dispatchEvent(new Event(`${modalName}-close`));
};

export const URLModal = ({
  modals,
  Wrapper,
  usePortal,
  portalElement,
}: ModalWrapperProps) => {
  const [extraProps, setExtraProps] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
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
  }, [modals]);
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
            {...extraProps}
          />
        </Suspense>
      </WrapperEl>
    </RootEl>
  );
};
