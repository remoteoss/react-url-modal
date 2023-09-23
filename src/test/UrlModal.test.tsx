import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModalWrapperProps, URLModal } from '../URLModal';
import { closeModal, openModal } from '../helpers';

const StandardModalContent = () => <>Foobar</>;

const StandardModal = (props: Partial<ModalWrapperProps> = {}) => (
  <>
    <button
      type="button"
      onClick={() =>
        openModal({
          name: 'standardModal',
        })
      }
    >
      Open modal
    </button>
    <URLModal
      modals={{
        standardModal: StandardModalContent,
      }}
      {...props}
    />
  </>
);

describe('UrlModalTest', () => {
  beforeEach(() => {
    closeModal();
  });

  it('renders correctly', async () => {
    render(<StandardModal />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Foobar')).not.toBeInTheDocument();

    screen.getByText('Open modal').click();

    expect(await screen.findByText('Foobar')).toBeInTheDocument();
  });

  it('uses custom action', async () => {
    const mockRouterAction = jest.fn();
    render(<StandardModal customRouterAction={mockRouterAction} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Foobar')).not.toBeInTheDocument();

    screen.getByText('Open modal').click();

    expect(mockRouterAction).toBeCalledWith({
      href: 'http://localhost/?modal=standardModal',
      replace: undefined,
    });
  });
});
