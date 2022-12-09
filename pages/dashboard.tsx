import Card from "components/card";
import useSWR from "swr";
import cookie from "js-cookie";
import NavBar from "components/NavBar/navbar";

export const fetcher = (url: any) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${cookie.get("accessToken")}` },
  }).then((r) => r.json());

export default function Dashboard({ user }) {
  const { data } = useSWR("/api/user/stores", fetcher);
  console.log(!user);

  if (!data || !user) return <div>Loading ...</div>;
  console.log(!user);
  return (
    <div>
      <NavBar />
      <div>
        <div className="card-container-dashboard h-100 w-100">
          <div className="store-info container">
            <h1 className="pt-3">Dashboard</h1>
            <p>
              Hello <b>{user.firstName}</b>
            </p>
            <h6 className="ps-5 text-center">Your Stores</h6>
            <Card items={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
