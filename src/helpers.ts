import { MODAL_KEY, PARAMS_KEY } from './constants';
import create, { StoreApi } from 'zustand/vanilla';

export type openModalProps = {
  name: string;
  params?: Record<string, unknown>;
};

export type adapters = null | 'nextjs';
type state = {
  adapter: adapters;
  replace?: boolean;
};

export const store: StoreApi<state> = create<state>(() => ({
  adapter: null,
  replace: false,
}));

export const createURL = (urlParams: URLSearchParams) => {
  const {
    location: { protocol, host, pathname },
  } = window;
  const search = urlParams.toString();
  return `${protocol}//${host}${pathname}${search.length ? '?' : ''}${search}`;
};

const nextRouterAction = async ({
  href,
  replace,
}: {
  href: string;
  replace?: boolean;
}) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Router = await (await import('next/router')).default;
    if (replace) {
      Router.replace(href, undefined, { shallow: true });
    } else {
      Router.push(href, undefined, { shallow: true });
    }
  } catch {
    console.log(`There was an error while trying to push to ${href}`);
  }
};

const vanillaRouterAction = ({
  href,
  replace,
}: {
  href: string;
  replace?: boolean;
}) => {
  if (replace) window.history.replaceState({ path: href }, '', href);
  else window.history.pushState({ path: href }, '', href);
};

const routerPush = async (href: string) => {
  const { adapter, replace } = store.getState();

  if (adapter === 'nextjs') {
    await nextRouterAction({ href, replace });
  } else {
    vanillaRouterAction({ href, replace });
  }
};

export const cleanSearchParams = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get(PARAMS_KEY)) urlParams.delete(PARAMS_KEY);
  if (urlParams.get(MODAL_KEY)) urlParams.delete(MODAL_KEY);

  return urlParams;
};

export const encodeUrlParams = (
  obj: URLSearchParams | Record<string, unknown>
): string => window.btoa(encodeURIComponent(JSON.stringify(obj)));

export const decodedUrlParams = () => {
  const params = new URLSearchParams(window.location.search).get(PARAMS_KEY);
  if (params) {
    try {
      return JSON.parse(decodeURIComponent(window.atob(params)));
    } catch {
      return {};
    }
  }
  return {};
};

export const isModalOpen = (name: string): boolean => {
  const modalName = new URLSearchParams(window.location.search).get(MODAL_KEY);
  return modalName === name;
};

export const openModal = async ({ name, params, ...props }: openModalProps) => {
  const urlParams = cleanSearchParams();

  urlParams.set(MODAL_KEY, name);
  if (params) urlParams.set(PARAMS_KEY, encodeUrlParams(params));

  await routerPush(createURL(urlParams));

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

export const closeModal = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const modalName = urlParams.get(MODAL_KEY);

  await routerPush(createURL(cleanSearchParams()));
  window.dispatchEvent(new Event('modal-trigger'));
  window.dispatchEvent(new Event(`${modalName}-close`));
};
