import { component$, isDev, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import globalStyles from "./global.css?inline";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="google-site-verification" content="jyq2EtFtgQbt4pIcm2SWrZdNXym1AfW7Vu6u53gLFqU" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        <script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7RQ60GB7NT"></script>
        <script dangerouslySetInnerHTML={`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7RQ60GB7NT');
        `} />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
