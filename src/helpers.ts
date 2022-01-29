import { MODAL_KEY, PARAMS_KEY } from './constants';

export const createURL = (urlParams: URLSearchParams) => {
  const {
    location: { protocol, host, pathname },
  } = window;
  const search = urlParams.toString();
  return `${protocol}//${host}${pathname}${search.length ? '?' : ''}${search}`;
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
