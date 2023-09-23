import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { ModalWrapperProps, URLModal } from '../URLModal';
import { openModal } from '../helpers';
import { createFakeWindowLocation } from './testHelpers';

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
    createFakeWindowLocation({});
  });

  it('renders correctly', async () => {
    render(<StandardModal />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Foobar')).not.toBeInTheDocument();

    act(() => screen.getByText('Open modal').click());

    expect(await screen.findByText('Foobar')).toBeInTheDocument();
  });

  it('uses custom action', async () => {
    const mockRouterAction = jest.fn();
    render(<StandardModal customRouterAction={mockRouterAction} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Foobar')).not.toBeInTheDocument();

    act(() => screen.getByText('Open modal').click());

    expect(await screen.findByText('Foobar')).toBeInTheDocument();
    expect(mockRouterAction).toBeCalledWith({
      href: 'https://localhost/?modal=standardModal',
      replace: undefined,
    });
  });
});
