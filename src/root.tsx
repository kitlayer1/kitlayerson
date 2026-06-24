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
        
        {/* Google tag (gtag.js) — loaded on first user interaction */}
        <script dangerouslySetInnerHTML={`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7RQ60GB7NT', { send_page_view: false });

          (function() {
            var _gtmLoaded = false;

            function _loadGtag() {
              if (_gtmLoaded) return;
              _gtmLoaded = true;

              ['scroll', 'click', 'mousemove', 'touchstart', 'keydown'].forEach(function(evt) {
                window.removeEventListener(evt, _loadGtag, { passive: true });
              });

              var s = document.createElement('script');
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-7RQ60GB7NT';
              s.async = true;
              s.onload = function() {
                gtag('event', 'page_view');
              };
              document.head.appendChild(s);
            }

            ['scroll', 'click', 'mousemove', 'touchstart', 'keydown'].forEach(function(evt) {
              window.addEventListener(evt, _loadGtag, { passive: true, once: true });
            });

            // Fallback: 8 saniye içinde etkileşim olmazsa yine de yükle
            setTimeout(_loadGtag, 8000);
          })();
        `} />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
