import { MODAL_KEY, PARAMS_KEY } from '../constants';
import {
  cleanSearchParams,
  closeModal,
  createURL,
  decodedUrlParams,
  encodeUrlParams,
  isModalOpen,
  openModal,
} from '../helpers';
const realLocation = window.location;

const createFakeWindowLocation = (search: {
  [key: string]: string | Record<string, unknown>;
}) => {
  global.window = Object.create(window);

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      search: search,
    },
  });
};

describe('test createURL', () => {
  it('should append one search param', () => {
    expect(
      createURL(
        new URLSearchParams({
          search: 'test',
        })
      )
    ).toBe('http://localhost/?search=test');
  });

  it('should append several search params', () => {
    expect(
      createURL(
        new URLSearchParams({
          search: 'test',
          anotherParams: 'true',
        })
      )
    ).toBe('http://localhost/?search=test&anotherParams=true');
  });

  it('should do nothing when params are empty', () => {
    expect(createURL(new URLSearchParams({}))).toBe('http://localhost/');
  });
});

describe('test encodeUrlParams', () => {
  it('should encode when its URLSearchParams', () => {
    expect(
      encodeUrlParams(
        new URLSearchParams({
          search: 'test',
        })
      )
    ).toBe('JTdCJTdE');
  });

  it('should encode objects', () => {
    expect(
      encodeUrlParams({
        search: 'test',
      })
    ).toBe('JTdCJTIyc2VhcmNoJTIyOiUyMnRlc3QlMjIlN0Q=');
  });
});

describe('test decodedUrlParams', () => {
  it('should decode when its URLSearchParams', () => {
    expect(decodedUrlParams('')).toEqual({});
  });

  it('should return an empty object when nothing is passed', () => {
    expect(decodedUrlParams('JTdCJTIyc2VhcmNoJTIyOiUyMnRlc3QlMjIlN0Q')).toEqual(
      { search: 'test' }
    );
  });
});

describe('test isModalOpen', () => {
  afterEach(() => {
    global.window.location = realLocation;
  });

  it('should return true when modal is open', () => {
    createFakeWindowLocation({
      modal: 'ModalName',
    });
    expect(isModalOpen('ModalName')).toBe(true);
  });

  it('should return false when modal is not open', () => {
    createFakeWindowLocation({
      modal: 'notTheSameName',
    });
    expect(isModalOpen('AnotherModalName')).toBe(false);
  });
});

describe('test openModal', () => {
  afterEach(() => {
    global.window.location = realLocation;
    closeModal();
  });
  it('should open modal by adding the modal param', async () => {
    await openModal({
      name: 'ModalName',
    });
    expect(new URLSearchParams(window.location.search).get(MODAL_KEY)).toBe(
      'ModalName'
    );
  });
  it('should also append any params passed', async () => {
    await openModal({
      name: 'ModalName',
      params: {
        hello: 'world',
      },
    });
    expect(new URLSearchParams(window.location.search).get(MODAL_KEY)).toBe(
      'ModalName'
    );
    expect(new URLSearchParams(window.location.search).get(PARAMS_KEY)).toBe(
      'JTdCJTIyaGVsbG8lMjI6JTIyd29ybGQlMjIlN0Q='
    );
  });
});

describe('test closeModal', () => {
  beforeEach(() => {
    global.window.location = realLocation;
  });
  it('should close a modal', async () => {
    const search = new URLSearchParams(global.window.location.search);
    createFakeWindowLocation({
      modal: 'aModal',
    });

    closeModal();
    expect(search.get(MODAL_KEY)).toBeNull();
  });
  it('should also delete any params passed', () => {
    const search = new URLSearchParams(global.window.location.search);
    createFakeWindowLocation({
      modal: 'ModalName',
      params: {
        hello: 'world',
      },
    });
    closeModal();
    expect(search.get(MODAL_KEY)).toBeNull();
    expect(search.get(PARAMS_KEY)).toBeNull();
  });
});

describe('test cleanSearchParams', () => {
  beforeEach(() => {
    global.window.location = realLocation;
  });
  it('should clear modal param', async () => {
    const search = new URLSearchParams(global.window.location.search);
    createFakeWindowLocation({
      modal: 'aModal',
    });

    cleanSearchParams();
    expect(search.get(MODAL_KEY)).toBeNull();
  });
  it('should also delete any params passed', () => {
    const search = new URLSearchParams(global.window.location.search);
    createFakeWindowLocation({
      modal: 'ModalName',
      params: {
        hello: 'world',
      },
    });
    cleanSearchParams();
    expect(search.get(MODAL_KEY)).toBeNull();
    expect(search.get(PARAMS_KEY)).toBeNull();
  });
});
