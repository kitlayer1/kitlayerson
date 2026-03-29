import { component$, useResource$, Resource } from "@builder.io/qwik";
import type { ResourceReturn } from "@builder.io/qwik";
import styles from "./categoryDesFrame.css?inline";

export interface CategoryDetail {
  id: number;
  tag: string;
  title: string;
  description: string;
  extraText: string;
  imageUrl: string;
  imageAlt: string;
  layout: "text-left" | "image-left";
}

export const CategoryDesFrame = component$(() => {
  const dataResource: ResourceReturn<CategoryDetail[]> = useResource$(
    async () => {
      const res = await fetch("/createDetail.json");
      if (!res.ok) throw new Error("Failed to fetch createDetail.json");
      return res.json() as Promise<CategoryDetail[]>;
    }
  );

  return (
    <>
      <style dangerouslySetInnerHTML={styles} />
      <section class="cdf-section">
        <Resource
          value={dataResource}
          onPending={() => (
            <div class="cdf-loading">
              <span class="cdf-loading__dot" />
              <span class="cdf-loading__dot" />
              <span class="cdf-loading__dot" />
            </div>
          )}
          onRejected={(err) => (
            <p class="cdf-error">Veri yüklenemedi: {err.message}</p>
          )}
          onResolved={(items) => (
            <div class="cdf-list">
              {items.map((item) => (
                <article
                  key={item.id}
                  class={[
                    "cdf-card",
                    item.layout === "image-left"
                      ? "cdf-card--image-left"
                      : "cdf-card--text-left",
                  ].join(" ")}
                >
                  {/* TEXT SIDE */}
                  <div class="cdf-card__body">
                    <h2 class="cdf-card__title">{item.title}</h2>
                    <p class="cdf-card__desc">{item.description}</p>
                    <p class="cdf-card__extra">{item.extraText}</p>
                  </div>

                  {/* IMAGE SIDE */}
                  <div class="cdf-card__media">
                    <span class="cdf-card__tag">
                      <span class="cdf-card__tag-dot" />
                      {item.tag}
                    </span>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      class="cdf-card__img"
                      width={480}
                      height={340}
                      loading="lazy"
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        />
      </section>
    </>
  );
});

export default CategoryDesFrame;