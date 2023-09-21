import ReactDOM from 'react-dom';

import './style.css';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';

import { Code } from './components/Code';

import classNames from 'classnames';
import { CopyIcon, GitHubIcon } from './components/Icons';
import { useTabs } from './useTabs';

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
  const { currentTab, tabs } = useTabs();

  return (
    <div className="sm:grid sm:grid-cols-[30vw_1fr] gap-6 min-h-screen sm:max-w-full max-w-[80%] m-auto">
      <div className="sm:p-12 p-6 sm:pr-0 flex items-center justify-center flex-col">
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center sm:text-left w-full whitespace-pre-wrap break-words">
          React
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
            URLModal
          </span>
        </h1>
        <p className="leading-normal text-base md:text-2xl text-gray-900 mb-8 text-center sm:text-left w-full">
          Persistent Modal state with the URL
        </p>
        <div className=" flex items-center justify-center relative w-full">
          <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-3 text-xs border-0 border-b-2 border-b-indigo-400 w-full">
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
            <div className="flex items-center justify-between gap-4 w-full bg-slate-900 outline-none p-4 sm:rounded-r rounded-b shadow-sm min-h-[96px]">
              <p>{getText(packageManager)}</p>
              <button
                onClick={() => clipboardCopy(getText(packageManager))}
                className="hover:text-indigo-200 active:text-green-500"
                type="button"
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        </div>
        <a
          href="https://github.com/remoteoss/react-url-modal"
          className="mt-6 flex gap-2 text-slate-200"
        >
          Open on <GitHubIcon />
        </a>
      </div>
      <div className="sm:p-12 p-6 sm:static absolute sm:w-auto w-100vw left-0 max-w-full bg-slate-900 max-h-screen overflow-auto sm:text-base text-sm text-slate-100">
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
        <Code code={tabs[currentTab].code} />
        <div className="sm:p-0 pl-2">{tabs[currentTab].Component()}</div>
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
