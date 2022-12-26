import { URL } from "url";

export const isValidUrl = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    const newUrl = new URL(url);
    return newUrl.protocol === "https:";
  } catch (e) {
    return false;
  }
};
