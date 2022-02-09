import { MODAL_KEY, PARAMS_KEY } from './constants';

export type openModalProps = {
  name: string;
  params?: Record<string, unknown>;
};

export const createURL = (urlParams: URLSearchParams) => {
  const {
    location: { protocol, host, pathname },
  } = window;
  const search = urlParams.toString();
  return `${protocol}//${host}${pathname}${search.length ? '?' : ''}${search}`;
};

const triggerPopState = () => {
  const popStateEvent = new PopStateEvent('popstate', { state: null });
  dispatchEvent(popStateEvent);
};

const routerPush = (href: string) => {
  window.history.pushState({ path: href }, '', href);
  triggerPopState();
};

const routerReplace = (href: string) => {
  window.history.replaceState({ path: href }, '', href);
  triggerPopState();
};
export const cleanSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get(PARAMS_KEY)) urlParams.delete(PARAMS_KEY);
  if (urlParams.get(MODAL_KEY)) urlParams.delete(MODAL_KEY);

  return createURL(urlParams);
};

export const encodeUrlParams = (
  obj: URLSearchParams | Record<string, unknown>
): string => window.btoa(encodeURI(JSON.stringify(obj)));

export const decodedUrlParams = () => {
  const params = new URLSearchParams(window.location.search).get(PARAMS_KEY);
  if (params) {
    return JSON.parse(decodeURI(window.atob(params)));
  }
  return {};
};

export const isModalOpen = (name: string): boolean => {
  const modalName = new URLSearchParams(window.location.search).get(MODAL_KEY);
  return modalName === name;
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
