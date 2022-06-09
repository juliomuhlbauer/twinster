import { theme } from "@/theme";
import { NextPageWithLayout } from "@/types/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";

import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const meta = {
  title: "Twinster",
  url: "https://twinster.app",
  description: "Share your tweets anywhere.",
  banner: "https://twinster.app/banner.png",
};

const SEO = () => {
  const router = useRouter();
  return (
    <DefaultSeo
      defaultTitle={meta.title}
      titleTemplate={`%s | Twinster`}
      description={meta.description}
      openGraph={{
        site_name: meta.title,
        title: meta.title,
        description: meta.description,
        url: meta.url + router.asPath,
        locale: "en_US",
        type: "website",
        images: [
          {
            url: meta.banner,
            width: 1200,
            height: 630,
            alt: meta.description,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  usePagesViews();

  return (
    <>
      <Head>
        <title>Twinster</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <SEO />

      {process.env.NODE_ENV !== "development" && (
        <GoogleAnalytics strategy="afterInteractive" />
      )}

      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default App;
