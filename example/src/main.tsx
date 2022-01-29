import React from 'react';
import ReactDOM from 'react-dom';
import { URLModal, openModal } from '../../';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import { Sandpack } from '@codesandbox/sandpack-react';
import '../../styles/index.css';
import './style.css';
import { useRef } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useState } from 'react';
import { Code } from './components/Code';

enum PackageManagers {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

const getText = (packageManager: PackageManagers) => {
  const packageName = 'react-url-modal';
  switch (packageManager) {
    case 'npm':
      return `npm install ${packageName}`;
    case 'pnpm':
      return `pnpm install ${packageName}`;
    case 'yarn':
      return `yarn add ${packageName}`;
  }
};

const modals = {
  thing: Modal1,
  thing2: Modal2,
  thing3: React.lazy(() => import('./Modal3')),
};

const App = () => {
  const [packageManager, setPackageManager] = useState<PackageManagers>('npm');
  return (
    <div className="grid grid-cols-2 gap-6 min-h-screen">
      <div className="flex items-center justify-center flex-col">
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
                className="text-gray-200 py-2 rounded-tl px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager('npm')}
              >
                NPM
              </button>
              <button
                className="text-gray-200 py-2 px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager('yarn')}
              >
                YARN
              </button>
              <button
                className="text-gray-200 py-2 rounded-bl px-3 bg-slate-900 hover:bg-slate-700"
                onClick={() => setPackageManager('pnpm')}
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
          <button className="right-6 absolute hover:text-indigo-200 active:text-green-500">
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
      <div className="p-12 bg-slate-900">
        <div className="flex">
          <button
            className="relative px-6 py-2 group flex-grow"
            type="button"
            onClick={() =>
              openModal({
                name: 'thing',
              })
            }
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white">
              {' '}
              Standard Modal
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              openModal({
                name: 'thing2',
                params: {
                  stuff: 'hello world',
                },
              })
            }
            className="relative px-6 py-2 group flex-grow"
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-cyan-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-cyan-700 group-hover:bg-cyan-700"></span>
            <span className="relative text-cyan-700 group-hover:text-cyan-100">
              {' '}
              Passing Params
            </span>
          </button>
          <button
            className="relative px-6 py-2 group flex-grow"
            type="button"
            onClick={() =>
              openModal({
                name: 'thing3',
              })
            }
          >
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-indigo-700 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-indigo-700 group-hover:bg-indigo-700"></span>
            <span className="relative text-indigo-700 group-hover:text-indigo-100">
              {' '}
              Imported Modal
            </span>
          </button>
        </div>
        <Code
          code={`
<URLModal
  modals={modals}
  Wrapper={({ onCancel, children }) => (
    <>
      {children}
      <button onClick={onCancel} type="button">
        Close
      </button>
    </>
  )}
/>`}
        />
        <URLModal
          modals={modals}
          Wrapper={({
            onCancel,
            children,
          }: {
            onCancel: () => void;
            children: React.ElementType;
          }) => (
            <>
              {children}
              <button onClick={onCancel} type="button">
                Close
              </button>
            </>
          )}
        />
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
