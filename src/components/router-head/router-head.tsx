import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import metaTagsData from "../../../src/data/metaTags.json";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  let pathname = loc.url.pathname;
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const tags = (metaTagsData as any).success;
  const pageMeta = tags[pathname];

  const title = pageMeta?.title || head.title || tags["/"].title;
  const description = pageMeta?.description || head.meta.find((m) => m.name === 'description')?.content || tags["/"].description;

  const filteredMeta = head.meta.filter((m) => m.name !== 'description');

  return (
    <>
      <title>{title}</title>

      <link rel="canonical" href={`https://kitlayer.com${pathname}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      
      {/* Font Preloads */}
      <link rel="preload" href="/fonts/national/national-bold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/geist/Geist-Medium.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/geist/Geist-SemiBold.otf" as="font" type="font/otf" crossOrigin="anonymous" />

      {/* External Domain Preconnects */}
      <link rel="preconnect" href="https://assets.lemonsqueezy.com" />
      <link rel="dns-prefetch" href="https://assets.lemonsqueezy.com" />

      {/* Deferred Fonts CSS */}
      <link rel="preload" href="/fonts-faces.css" as="style" />
      <link rel="stylesheet" href="/fonts-faces.css" media="print" onLoad$={(e, t) => t.media = 'all'} />
      <noscript><link rel="stylesheet" href="/fonts-faces.css" /></noscript>

      {description && <meta name="description" content={description} />}

      {filteredMeta.map((m) => (
        <meta key={m.key || m.name || m.property} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
