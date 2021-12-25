import { URL } from "url";

export const isValidUrl = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
