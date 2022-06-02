import { pageview } from "@/lib/gtm";
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
import Script from "next/script";

import NProgress from "nprogress";
import { useEffect } from "react";

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

const Analytics = () => {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
    </>
  );
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

      {process.env.NODE_ENV !== "development" && <Analytics />}

      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default App;
