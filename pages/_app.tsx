import { useEffect } from "react";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { useUser } from "lib/hooks";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user,{mutate}] = useUser();
  useEffect(() => {
    console.log(user,router.pathname)
    if (router.pathname === "/signup" && user) router.push("/dashboard");
    
    if (!["/signup", "/"].includes(router.pathname) && !user)
      router.push("/signup");
  }, [user, router.asPath]);

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} {...{ user,mutate, router }} />
    </>
  );
}
