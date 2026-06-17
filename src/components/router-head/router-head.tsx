import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import metaTagsData from "../../../public/data/metaTags.json";

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

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

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
