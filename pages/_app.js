import { appWithTranslation } from "next-i18next";
import { i18n } from "../next-i18next.config";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../public/css/main.css";
import NProgress, { configure } from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { wrapper } from "../store";
import useSWR from "swr";
import { MENU_FETCH_LINK } from "../redux/links";
import { useEffect } from "react";
import Head from "next/head";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const fetcher = (...args) => fetch(...args).then(res => res.json());

function MyApp({ Component, pageProps, router }) {
  const { data, error } = useSWR(MENU_FETCH_LINK(router.locale), fetcher);

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", function () {
  //       navigator.serviceWorker.register("/sw.js").then(
  //         function (registration) {
  //           console.log(
  //             "Service Worker registration successful with scope: ",
  //             registration.scope
  //           );
  //         },
  //         function (err) {
  //           console.log("Service Worker registration failed: ", err);
  //         }
  //       );
  //     });
  //   }
  // }, []);

  if (error) return <div>failed to load</div>;
  if (!data) return <div></div>;
  return (
    <Layout locale={router.locale} menu={data}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} menu={data} />
    </Layout>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
/* MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // calls store's `dispatch` and set initial state for menuData
  //store.dispatch(fetchingMenuSuccess(menuData));

  return { ...appProps };
}; */

export default appWithTranslation(wrapper.withRedux(MyApp), { i18n });
