export const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (res.status >= 400) {
      throw res.statusText;
    }
    return res.json();
  });
