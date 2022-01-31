import ReactDOM from 'react-dom';

import './style.css';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import { Code } from './components/Code';
import {
  dynamicImportedModal,
  standardModalCode,
  withCustomWrapper,
  withModal,
  withParams,
} from './code';
import {
  CustomWrapper,
  StandardModal,
  WithModal,
  WithParams,
} from './components/Examples';

enum PackageManagers {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
      onClick: () => setTab(0),
      current: tab === 0,
      code: standardModalCode,
    },
    {
      name: 'Modal With Params',
      onClick: () => setTab(1),
      current: tab === 1,
      code: withParams,
    },
    {
      name: 'Modal With Custom Wrapper',
      onClick: () => setTab(2),
      current: tab === 2,
      code: withCustomWrapper,
    },
    {
      name: 'Dynamically imported Modal',
      onClick: () => setTab(3),
      current: tab === 3,
      code: dynamicImportedModal,
    },
    {
      name: 'Using our Modal Component',
      onClick: () => setTab(4),
      current: tab === 4,
      code: withModal,
    },
  ];

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
        <div className="flex items-center justify-center relative">
          <div className="flex items-center">
            <div className="flex flex-col text-xs border-0 border-r-2 border-r-indigo-400">
              <button
                type="button"
                className="text-gray-200 py-2 rounded-tl px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager(PackageManagers.NPM)}
              >
                NPM
              </button>
              <button
                type="button"
                className="text-gray-200 py-2 px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager(PackageManagers.YARN)}
              >
                YARN
              </button>
              <button
                type="button"
                className="text-gray-200 py-2 rounded-bl px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager(PackageManagers.PNPM)}
              >
                PNPM
              </button>
            </div>
            <input
              onClick={() => clipboardCopy(getText(packageManager))}
              className="bg-slate-900 outline-none p-6 rounded-r shadow-sm min-w-[350px] h-[96px]"
              value={getText(packageManager)}
              readOnly
            />
          </div>
          <button
            className="right-6 absolute hover:text-indigo-200 active:text-green-500"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="sm:p-12 p-0 sm:static absolute sm:w-auto w-100vw left-0 max-w-full bg-slate-900 max-h-screen overflow-auto sm:text-base text-sm  pb-12">
        <div>
          <div className="hidden sm:block ">
            <nav className="flex" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <button
                  type="button"
                  key={tab.name}
                  onClick={tab.onClick}
                  className={classNames(
                    idx === 0 ? 'rounded-l-md' : '',
                    idx === tabs.length - 1 ? 'rounded-r-md' : '',
                    idx !== tabs.length - 1
                      ? 'border-0 border-r-2 border-r-slate-900'
                      : '',
                    tab.current
                      ? 'bg-indigo-800 text-slate-100'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-indigo-800 bg-slate-800',
                    'px-4 py-3 font-medium text-sm flex-grow'
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <Code code={tabs[tab].code} />
        {tab === 0 && <StandardModal />}
        {tab === 1 && <WithParams />}
        {tab === 2 && <CustomWrapper />}
        {tab === 4 && <WithModal />}
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
