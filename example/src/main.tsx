import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ModalWrapper, openModal } from '../../';

const App = () => {
  return (
    <div>
      <button
        onClick={() =>
          openModal({
            name: 'thing',
          })
        }
      >
        Standard Modal
      </button>
      <button
        onClick={() =>
          openModal({
            name: 'thing2',
            params: {
              hello: 'world',
            },
          })
        }
      >
        Passing props
      </button>
      <button
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
  thing: () => 'sup',
  thing2: ({ params }) => JSON.stringify(params),
  thing3: React.lazy(() => import('./Modal3')),
};

ReactDOM.render(
  <>
    <ModalWrapper modals={modals} />
    <App />
  </>,
  document.getElementById('root')
);
