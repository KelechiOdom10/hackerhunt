import { useMemo } from "react";
import useSWR from "swr";
import { HTMLResponse } from "../components/post/preview/PostPreview";
import { fetcher } from "../utils/fetcher";

export const usePreviewData = (
  url: string
): { data: HTMLResponse; error: unknown } => {
  const { data, error } = useSWR(
    `/api/link-preview?url=${encodeURIComponent(url)}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return useMemo(() => {
    return { data, error };
  }, [url, error, data]);
};
