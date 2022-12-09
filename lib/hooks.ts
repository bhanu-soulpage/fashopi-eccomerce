import useSWR from "swr";
import cookie from "js-cookie";

export const fetcher = (url) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
  }).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR("/api/user/details", fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data?.message ? null : data;

  return [user, { mutate, loading }];
}
