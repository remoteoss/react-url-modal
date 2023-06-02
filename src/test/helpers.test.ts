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

const createFakeWindowLocation = (search: string | Record<string, string>) => {
  const url = new URL('https://localhost');

  url.search = new URLSearchParams(search).toString();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jsdom.reconfigure({
    url: url.toString(),
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
    ).toBe('JTdCJTIyc2VhcmNoJTIyJTNBJTIydGVzdCUyMiU3RA==');
  });
});

describe('test decodedUrlParams', () => {
  it('should decode the "params" query param from the URL', () => {
    createFakeWindowLocation({
      params: 'JTdCJTIyc2VhcmNoJTIyOiUyMnRlc3QlMjIlN0Q',
    });
    expect(decodedUrlParams()).toEqual({ search: 'test' });
  });

  it('should return an empty object when there is no "params" query param in the URL', () => {
    createFakeWindowLocation({});
    expect(decodedUrlParams()).toEqual({});
  });

  it('should return an empty object when decoding invalid URLSearchParams', () => {
    createFakeWindowLocation({
      params:
        'JTdCJTIyY29tcGFueUNvdW50cnklMjI6JTdCJTIyY29kZSUyAjolMjJVU0ElMjIlN0Q=',
    });
    expect(decodedUrlParams()).toEqual({});
  });
});

describe('test isModalOpen', () => {
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
    createFakeWindowLocation({});
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
      'JTdCJTIyaGVsbG8lMjIlM0ElMjJ3b3JsZCUyMiU3RA=='
    );
  });
});

describe('test closeModal', () => {
  beforeEach(() => {
    createFakeWindowLocation({});
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
      params: JSON.stringify({
        hello: 'world',
      }),
    });
    closeModal();
    expect(search.get(MODAL_KEY)).toBeNull();
    expect(search.get(PARAMS_KEY)).toBeNull();
  });
});

describe('test cleanSearchParams', () => {
  beforeEach(() => {
    createFakeWindowLocation({});
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
      params: JSON.stringify({
        hello: 'world',
      }),
    });
    cleanSearchParams();
    expect(search.get(MODAL_KEY)).toBeNull();
    expect(search.get(PARAMS_KEY)).toBeNull();
  });
});
