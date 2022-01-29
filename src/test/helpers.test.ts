import {
  createURL,
  decodedUrlParams,
  encodeUrlParams,
  isModalOpen,
} from '../helpers';
const realLocation = window.location;

const createFakeWindowLocation = (search: { [key: string]: string }) => {
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
  beforeEach(() => {
    createFakeWindowLocation({
      params: 'JTdCJTIyc2VhcmNoJTIyOiUyMnRlc3QlMjIlN0Q',
    });
  });

  afterEach(() => {
    global.window.location = realLocation;
  });

  it('should decode when its URLSearchParams', () => {
    expect(decodedUrlParams()).toEqual({ search: 'test' });
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
