import ReactDOM from 'react-dom';

import './style.css';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import { Code } from './components/Code';
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
import classNames from 'classnames';
import { CopyIcon, GitHubIcon } from './components/Icons';

enum PackageManagers {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

const getText = (packageManager: PackageManagers) => {
  const packageName = 'react-url-modal';
  switch (packageManager) {
    case PackageManagers.NPM:
      return `npm install ${packageName}`;
    case PackageManagers.PNPM:
      return `pnpm install ${packageName}`;
    case PackageManagers.YARN:
      return `yarn add ${packageName}`;
  }
};

const App = () => {
  const [packageManager, setPackageManager] = useState<PackageManagers>(
    PackageManagers.NPM
  );

  const [tab, setTab] = useState(0);
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
      onClick: () => setTab(3),
      current: tab === 3,
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
    current: tab === i,
    onClick: () => setTab(i),
  }));

  return (
    <div className="sm:grid sm:grid-cols-[30vw_1fr] gap-6 min-h-screen sm:max-w-full max-w-[80%] m-auto">
      <div className="flex items-center justify-center flex-col sm:mb-0 mb-6 py-6 sm:py-0">
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
          React
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
            URLModal
          </span>
        </h1>
        <p className="leading-normal text-base md:text-2xl text-gray-900 mb-8 text-center md:text-left">
          Persistent Modal state with the URL
        </p>
        <div className=" flex items-center justify-center relative">
          <div className="block sm:flex items-center">
            <div className="grid grid-cols-3 sm:flex sm:flex-col text-xs border-0 sm:border-r-2 sm:border-r-indigo-400">
              <button
                type="button"
                className="text-gray-200 py-2 rounded-tl px-3 bg-slate-900 hover:bg-slate-700 grow"
                onClick={() => setPackageManager(PackageManagers.NPM)}
              >
                NPM
              </button>
              <button
                type="button"
                className="text-gray-200 py-2 px-3 bg-slate-900 hover:bg-slate-700 grow"
                onClick={() => setPackageManager(PackageManagers.YARN)}
              >
                YARN
              </button>
              <button
                type="button"
                className="text-gray-200 py-2 sm:rounded-bl rounded-tr px-3 bg-slate-900 hover:bg-slate-700 grow"
                onClick={() => setPackageManager(PackageManagers.PNPM)}
              >
                PNPM
              </button>
            </div>
            <input
              className="bg-slate-900 outline-none p-6 sm:rounded-r rounded-b shadow-sm min-w-[350px] h-[96px]"
              value={getText(packageManager)}
              readOnly
            />
          </div>
          <button
            onClick={() => clipboardCopy(getText(packageManager))}
            className="right-6 absolute hover:text-indigo-200 active:text-green-500"
            type="button"
          >
            <CopyIcon />
          </button>
        </div>
        <a
          href="https://github.com/remoteoss/react-url-modal"
          className="mt-6 flex gap-2 text-slate-200"
        >
          Open on <GitHubIcon />
        </a>
      </div>
      <div className="sm:p-12 p-0 sm:static absolute sm:w-auto w-100vw left-0 max-w-full bg-slate-900 max-h-screen overflow-auto sm:text-base text-sm text-slate-100 pb-12">
        <div>
          <div className="block max-w-screen overflow-auto">
            <nav className="flex" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <button
                  type="button"
                  key={tab.name}
                  onClick={tab.onClick}
                  className={classNames(
                    'px-4 py-3 font-medium text-xs sm:text-sm flex-grow',
                    {
                      'rounded-l-md': idx === 0,
                      'rounded-r-md': idx === tabs.length - 1,
                      'border-0 border-r-2 border-r-slate-900':
                        idx !== tabs.length - 1,
                      'bg-indigo-800 text-slate-100': !!tab.current,
                      'text-slate-400 hover:text-slate-100 hover:bg-indigo-800 bg-slate-800':
                        !tab.current,
                    }
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <Code code={tabs[tab].code} />
        <div className="sm:p-0 pl-2">{tabs[tab].Component()}</div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);
