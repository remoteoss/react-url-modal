import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { MODAL_KEY, PARAMS_KEY } from './constants';
import { createURL, decodedUrlParams, encodeUrlParams } from './helpers';
import useCustomEvent from './hooks/useCustomEvent';

const routerPush = async (href: string) =>
  window.history.pushState({ path: href }, '', href);

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
  if (urlParams.get(PARAMS_KEY)) {
    urlParams.delete(PARAMS_KEY);
  }
  urlParams.delete(MODAL_KEY);

  routerPush(createURL(urlParams));

  window.dispatchEvent(new Event('modal-trigger'));
  window.dispatchEvent(new Event(`${modalName}-close`));
};

export type ModalChildren =
  | ((...args: any) => JSX.Element)
  | React.LazyExoticComponent<(...args: any) => JSX.Element>;

export interface ModalWrapperProps {
  modals: {
    [name: string]: ModalChildren;
  };
  Wrapper: React.ElementType;
}

export function URLModal({ modals, Wrapper }: ModalWrapperProps) {
  const [extraProps, setExtraProps] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
  const [modalName, setModalName] = useState<string | null>(
    urlParams.get(MODAL_KEY)
  );

  const popStateListener = useCallback(
    (event?: any) => {
      const urlParams = new URLSearchParams(window.location.search);
      const modalQuery = urlParams.get(MODAL_KEY);

      if (!modalQuery) {
        setModalName(null);
        setExtraProps({});
      }
      if (modalQuery && modals[modalQuery]) {
        setModalName(modalQuery);
        if (event?.detail) setExtraProps(event.detail.props);
      }
    },
    [modals]
  );
  const modalTriggerListener = useCallback(
    (event: any) => {
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

  const getData = (): {} | null => {
    const urlData = urlParams.get(PARAMS_KEY);
    if (!urlData) return null;
    try {
      return decodedUrlParams();
    } catch {
      return null;
    }
  };

  const onSubmit = () => window.dispatchEvent(new Event(`${modalName}-submit`));

  const onClose = () => closeModal();

  const Component = modalName ? modals[modalName] : null;

  if (!Component) return null;

  const WrapperEl = Wrapper ? Wrapper : React.Fragment;
  const wrapperProps = Wrapper
    ? {
        visible: !!Component,
        onCancel: onClose,
        onDismiss: onClose,
      }
    : {};

  return (
    <WrapperEl {...wrapperProps}>
      <Suspense fallback={false}>
        <Component
          onCancel={onClose}
          onSubmit={onSubmit}
          params={getData()}
          {...extraProps}
        />
      </Suspense>
    </WrapperEl>
  );
}
