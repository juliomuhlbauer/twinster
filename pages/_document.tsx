import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Twinster" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Twinster" />
        <meta name="description" content="Share your tweets anywhere" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="#1c2732" />
        <link rel="apple-touch-icon" sizes="192x192" href="/twinster.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/twinster.png" />

        <meta property="og:image" content="/banner.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
