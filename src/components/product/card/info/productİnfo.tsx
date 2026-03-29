import { component$ } from "@builder.io/qwik";
import "./productİnfo.css";

interface InfoItem {
  title: string;
  value: string;
}

interface Props {
  items: InfoItem[];
}

export const ProductInfo = component$<Props>(({ items }) => {
  return (
    <section class="pinfo-section">
      <div class="pinfo-container">
        {items.map((item, index) => (
          <div key={index} class="pinfo-card">
            <p class="pinfo-title">{item.title}</p>
            <h2 class="pinfo-value">{item.value}</h2>
          </div>
        ))}
      </div>
    </section>
  );
});