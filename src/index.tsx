import React, { useState, useEffect, Suspense, useCallback } from 'react';
import useCustomEvent from './hooks/useCustomEvent';

export const PARAMS_KEY = 'params';
export const MODAL_KEY = 'modal';

const routerPush = async (href: string) =>
  window.history.pushState({ path: href }, '', href);

const createURL = (urlParams: {}) => {
  const {
    location: { protocol, host, pathname },
  } = window;
  const search = urlParams.toString();
  return `${protocol}//${host}${pathname}${search.length ? '?' : ''}${search}`;
};

export const encodeUrlParams = (obj: {}): string =>
  window.btoa(encodeURI(JSON.stringify(obj)));

export const decodedUrlParams = (): {} => {
  const params = new URLSearchParams(window.location.search).get(PARAMS_KEY);
  if (params) {
    return JSON.parse(decodeURI(window.atob(params)));
  }
  return {};
};

export const openModal = ({
  name,
  params,
  ...props
}: {
  name: string;

  params?: {};
}) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(MODAL_KEY, name);
  if (params) {
    urlParams.set(PARAMS_KEY, encodeUrlParams(params));
  }

  routerPush(createURL(urlParams));
  const event = new CustomEvent('modal-trigger', { detail: props });
  window.dispatchEvent(event);
};

export const closeModal = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);
  if (urlParams.get(PARAMS_KEY)) {
    urlParams.delete(PARAMS_KEY);
  }
  urlParams.delete(MODAL_KEY);

  routerPush(createURL(urlParams));
  window.dispatchEvent(new Event('modal-trigger'));
  window.dispatchEvent(new Event(`${modalName}-close`));
};

export const isModalOpen = (name: string): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);

  return modalName === name;
};

export const ModalWrapper = ({
  modals,
  Wrapper,
}: {
  modals: {
    [name: string]:
      | React.ElementType
      | React.LazyExoticComponent<() => JSX.Element>;
  };
  Wrapper: React.ElementType;
}): React.ReactNode => {
  const [show, setShow] = useState(false);
  const [extraProps, setExtraProps] = useState({});
  const urlParams = new URLSearchParams(window.location.search);

  const listener = useCallback(
    (event?: any) => {
      const urlParams = new URLSearchParams(window.location.search);
      const modalQuery = urlParams.get(MODAL_KEY);

      if (!modalQuery) {
        setShow(false);
        setExtraProps({});
      }
      if (modalQuery && modals[modalQuery]) {
        setShow(true);
        if (event?.detail) setExtraProps(event.detail);
      }
    },
    [modals]
  );
  useCustomEvent('modal-trigger', listener);
  useCustomEvent('popstate', listener);

  useEffect(() => {
    // load modal if a modal is on the url at load
    listener();
  }, [listener]);

  if (typeof window === 'undefined') return null;

  const getData = (): {} | null => {
    const urlData = urlParams.get(PARAMS_KEY);
    if (!urlData) return null;
    try {
      return decodedUrlParams();
    } catch {
      return null;
    }
  };
  const modalName = urlParams.get(MODAL_KEY);
  const onSubmit = () => window.dispatchEvent(new Event(`${modalName}-submit`));

  const onClose = () => closeModal();

  const Component = modalName ? modals[modalName] : null;

  if (!show || !Component) return null;
  const WrapperEl = Wrapper ? Wrapper : React.Fragment;
  const wrapperProps = Wrapper
    ? {
        visible: show,
        onCancel: onClose,
        onDismiss: onClose,
      }
    : {};
  return (
    <>
      <WrapperEl {...wrapperProps}>
        <Suspense fallback={false}>
          <Component
            onCancel={onClose}
            open={show}
            onSubmit={onSubmit}
            params={getData()}
            {...extraProps}
          />
        </Suspense>
      </WrapperEl>
    </>
  );
};

export { Modal } from './Modal';
