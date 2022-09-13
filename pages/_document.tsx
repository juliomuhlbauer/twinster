import { app } from "app";
import { Html, Head, Main, NextScript } from "next/document";

const { name, description, icons } = app;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content={name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={name} />
        <meta name="description" content={description} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="theme-color" content="#1c2732" />
        <link rel="apple-touch-icon" sizes="192x192" href={icons.web} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href={icons.web} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
