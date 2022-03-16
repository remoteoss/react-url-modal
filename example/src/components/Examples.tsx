import React from 'react';
import { openModal, URLModal } from 'react-url-modal';
import { Modal } from 'react-url-modal/Modal';
const StandardModalContent = () => <>No params! Simple stuff</>;

const ModalWithParams = ({ params }: { params: { [key: string]: string } }) => (
  <>I have the params: {JSON.stringify(params.stuff)}</>
);
const CustomWrapperModal = () => (
  <>I am a modal with a custom component wrapper</>
);
const WithModalComponent = () => <>I use the default Modal</>;

const OpenButton = ({ params }: any) => (
  <button
    type="button"
    onClick={() => openModal(params)}
    className="px-6 py-3 my-3 block text-slate-50 bg-slate-800 rounded-lg shadow-md hover:bg-slate-700 hover:text-slate-200"
  >
    Open Modal
  </button>
);

export const StandardModal = () => (
  <>
    <OpenButton
      params={{
        name: 'standardModal',
      }}
    />{' '}
    <URLModal
      modals={{
        standardModal: StandardModalContent,
      }}
    />
  </>
);

export const WithParams = () => (
  <>
    {' '}
    <OpenButton
      params={{
        name: 'withParams',
        params: {
          stuff: 'Hello World',
        },
      }}
    />
    <URLModal
      modals={{
        withParams: ModalWithParams,
      }}
    />
  </>
);

export const CustomWrapper = () => (
  <>
    <OpenButton
      params={{
        name: 'customWrapper',
      }}
    />
    <URLModal
      modals={{
        customWrapper: CustomWrapperModal,
      }}
      Wrapper={({ onClose, children }) => (
        <div className="bg-slate-100 p-4 relative rounded text-slate-700 py-6 ">
          {children}
          <button
            onClick={onClose}
            type="button"
            className="px-2 text-sm text-slate-900 rounded absolute top-0 right-0 mt-4 mr-4"
          >
            x
          </button>
        </div>
      )}
    />
  </>
);

export const WithModal = () => (
  <>
    <OpenButton
      params={{
        name: 'withModal',
      }}
    />
    <URLModal
      Wrapper={Modal}
      modals={{
        withModal: WithModalComponent,
      }}
    />
  </>
);

export const DynamicModal = () => (
  <>
    <URLModal
      modals={{
        dynamicImported: React.lazy(() => import('./Modals/Modal3')),
      }}
    />
    <OpenButton
      params={{
        name: 'dynamicImported',
      }}
    />
  </>
);

const PortalModal = () => (
  <p className="bg-white text-slate-900 p-4">I am rendered in a portal</p>
);

export const PortalExample = () => (
  <>
    <URLModal
      modals={{
        portalModal: PortalModal,
      }}
      usePortal
      portalElement={document.getElementById('portal')}
    />
    <OpenButton
      params={{
        name: 'portalModal',
      }}
    />
  </>
);

const ReplaceModal = () => <>I use replaceState instead of pushState</>;

export const ReplaceExample = () => (
  <>
    <URLModal
      modals={{
        replaceModal: ReplaceModal,
      }}
      replace
    />
    <OpenButton
      params={{
        name: 'replaceModal',
      }}
    />
  </>
);
