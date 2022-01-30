import React from 'react';
import ReactDOM from 'react-dom';
import { URLModal, openModal } from '../../';
import Modal1 from './Modal1';
import Modal2 from './Modal2';

const App = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() =>
          openModal({
            name: 'thing',
          })
        }
      >
        Standard Modal
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
      >
        Passing props
      </button>
      <button
        type="button"
        onClick={() =>
          openModal({
            name: 'thing3',
          })
        }
      >
        Imported Modal
      </button>
    </div>
  );
};

const modals = {
  thing: Modal1,
  thing2: Modal2,
  thing3: React.lazy(() => import('./Modal3')),
};

ReactDOM.render(
  <>
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
    <App />
  </>,
  document.getElementById('root')
);
