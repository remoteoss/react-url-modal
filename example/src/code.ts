export const standardModalCode = `
import { URLModal } from "react-url-modal";

const StandardModal = () => <div>No params! Simple stuff</div>;

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

const ModalWithParams = ({ params }) => <div>{params.stuff}</div>;

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

const CustomWrapper = () => <div>I am a modal with a cute close button</div>;

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
