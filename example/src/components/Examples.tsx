import { Modal, openModal, URLModal } from '../../../';

const StandardModalContent = () => <>No params! Simple stuff</>;

const ModalWithParams = ({ params }: { params: { [key: string]: string } }) => (
  <>{params.stuff}</>
);
const CustomWrapperModal = () => <>I am a modal with a cute close button</>;
const WithModalComponent = () => <>I use the default Modal</>;

export const StandardModal = () => (
  <>
    <URLModal
      modals={{
        standardModal: StandardModalContent,
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

export const WithParams = () => (
  <>
    <URLModal
      modals={{
        withParams: ModalWithParams,
      }}
    />
    <button
      onClick={() =>
        openModal({
          name: 'withParams',
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

export const CustomWrapper = () => (
  <>
    <URLModal
      modals={{
        customWrapper: CustomWrapperModal,
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

export const WithModal = () => (
  <>
    <URLModal
      Wrapper={Modal}
      modals={{
        withModal: WithModalComponent,
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
