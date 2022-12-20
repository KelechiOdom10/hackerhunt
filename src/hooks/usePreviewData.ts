import { useMemo } from "react";
import { HTMLResponse } from "server/models";
import useSWR from "swr";
import { fetcher } from "~/utils/fetcher";

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
  }, [error, data]);
};
