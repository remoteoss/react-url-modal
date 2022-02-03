import {
  dynamicImportedModal,
  standardModalCode,
  usePortals,
  withCustomWrapper,
  withModal,
  withParams,
} from './code';
import {
  CustomWrapper,
  DynamicModal,
  PortalExample,
  StandardModal,
  WithModal,
  WithParams,
} from './components/Examples';
import { createURL } from '../../src/helpers';
import { useEffect, useState } from 'react';

export const useTabs = () => {
  const tabsURL = new URLSearchParams(window.location.search);
  const urlTab = parseInt(tabsURL.get('tab') || '0');

  const [currentTab, setTab] = useState(urlTab);
  const tabs = [
    {
      name: 'Standard Modal',
      code: standardModalCode,
      Component: StandardModal,
    },
    {
      name: 'Modal With Params',
      code: withParams,
      Component: WithParams,
    },
    {
      name: 'Modal With Custom Wrapper',
      code: withCustomWrapper,
      Component: CustomWrapper,
    },
    {
      name: 'Dynamically imported Modal',
      code: dynamicImportedModal,
      Component: DynamicModal,
    },
    {
      name: 'Using our Modal Component',
      code: withModal,
      Component: WithModal,
    },
    {
      name: 'Using portals',
      code: usePortals,
      Component: PortalExample,
    },
  ].map((example, i) => ({
    ...example,
    current: currentTab === i,
    onClick: () => setTab(i),
  }));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.set('tab', currentTab.toString());
    const url = createURL(params);
    window.history.pushState({ path: url }, '', url);
  }, [currentTab]);

  return {
    tabs,
    currentTab,
  };
};
