export const createFakeWindowLocation = (
  search: string | Record<string, string>
) => {
  const url = new URL('https://localhost');

  url.search = new URLSearchParams(search).toString();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  jsdom.reconfigure({
    url: url.toString(),
  });
};
