import { component$ } from "@builder.io/qwik";
import "./featuresCard.css";

export const FeaturesCard = component$(() => {
  const features = [
    { title: "150K", desc: "Join thousands of designers who create stunning logos with our platform every day." },
    { title: "400K", desc: "Thousands of unique logos generated, each crafted to match a brand’s identity perfectly." },
    { title: "198+", desc: "Our platform is used by creators and businesses across countries worldwide." },
  ];

  return (
    <section class="fc_section">
      <div class="fc_container">
        <div class="fc_grid">
          {features.map((feature, index) => (
            <div key={index} class="fc_card">
              <h2 class="fc_title">{feature.title}</h2>
              <p class="fc_desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
