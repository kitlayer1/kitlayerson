import { component$ } from "@builder.io/qwik";
import "./featuresCard.css";

interface FeatureItem {
  badge: string;
  title: string;
  description: string;
}

export const FeaturesCard = component$(() => {
  const features: FeatureItem[] = [
    {
      badge: "Product",
      title: "Profitability's secret ingredient.",
      description:
        "Streamline your entire operations. Boost your margins. Cut waste. Meet the AI-powered restaurant management system that streamline your entire operations.",
    },
    {
      badge: "Product",
      title: "Profitability's secret ingredient.",
      description:
        "Streamline your entire operations. Boost your margins. Cut waste. Meet the AI-powered restaurant management system that streamline your entire operations.",
    },
    {
      badge: "Product",
      title: "Profitability's secret ingredient.",
      description:
        "Streamline your entire operations. Boost your margins. Cut waste. Meet the AI-powered restaurant management system that streamline your entire operations.",
    },
  ];

  return (
    <section class="featuresCard">
      <div class="featuresCard-container">
        {features.map((item, index) => (
          <div key={index} class="featuresCard-item">
            <div class="featuresCard-badge">
              <span class="featuresCard-dot"></span>
              {item.badge}
            </div>

            <h3 class="featuresCard-title">{item.title}</h3>

            <p class="featuresCard-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});