import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./categoryBadge.css?inline";

interface Props {
  categories: { label: string; slug: string }[];
}

export const CategoryBadge = component$<Props>(({ categories }) => {
  useStyles$(style0);

  return (
    <div class="category-badge-wrapper">
      {categories.map((item) => (
        <a
          key={item.slug}
          href={`/create/${item.slug}`}
          class="category-badge-item"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
});

