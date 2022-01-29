export const standardModalCode = `
import { URLModal } from "react-url-modal";

const StandardModal = () => <>No params! Simple stuff</>;

export const App = () => (
  <>
    <URLModal
      modals={{
        standardModal: StandardModal,
      }}
    />
    <button
      onClick={() =>
        openModal({
          name: 'standardModal',
        })
      }
    >
      Open
    </button>
  </>
);
`;

export const withParams = `
import { URLModal, openModal } from 'react-url-modal';

const ModalWithParams = ({ params }) => <>{params.stuff}</>;

export const App = () => (
  <>
    <URLModal
      modals={{
        modalWithParams: ModalWithParams,
      }}
    />
    <button
      onClick={() =>
        openModal({
          name: 'modalWithParams',
          params: {
            stuff: 'Hello World',
          },
        })
      }
    >
      Open
    </button>
  </>
);
`;
export const withCustomWrapper = `
import { URLModal, openModal } from 'react-url-modal';

const CustomWrapper = () => <>I am a modal with a cute close button</>;

export const App = () => (
  <>
    <URLModal
      modals={{
        customWrapper: CustomWrapper,
      }}
      Wrapper={({ onCancel, children }) => (
        <>
          {children}
          <button onClick={onCancel} type="button">
            Close
          </button>
        </>
      )}
    />
    <button
      onClick={() =>
        openModal({
          name: 'customWrapper',
        })
      }
    >
      Open
    </button>
  </>
);
`;

export const dynamicImportedModal = `
import { URLModal, openModal } from 'react-url-modal';

export const App = () => (
  <>
    <URLModal
      modals={{
        dynamicImported: React.lazy(() => import('./DynamicImported')),
      }}
    />
    <button
      onClick={() =>
        openModal({
          name: 'dynamicImported',
        })
      }
    >
      Open
    </button>
  </>
);
`;

export const withModal = `
import { URLModal, openModal, Modal } from 'react-url-modal';

const WithModal = () => <>I use the default Modal</>;

export const App = () => (
  <>
    <URLModal
      Wrapper={Modal}
      modals={{
        withModal: WithModal,
      }}
    />
    <button
      onClick={() =>
        openModal({
          name: 'withModal',
        })
      }
    >
      Open
    </button>
  </>
);
`;
