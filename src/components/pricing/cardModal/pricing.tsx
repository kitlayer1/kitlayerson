import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import "./pricing.css";

interface Plan {
  title: string;
  price: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  features: string[];
  featured?: boolean;
  showInfoBox?: boolean;
}

export const Pricing = component$(() => {
  const plans: Plan[] = [
    {
      title: "Free",
      price: "Free",
      description: "Get started with basic logo creation tools and explore our platform at no cost.",
      buttonText: "Select",
      features: [
        "Download logo in JPG format",
        "Standard resolution export",
        "Basic customization",
      ],
    },
    {
      title: "Started",
      price: "7.90 $",
      description: "Unlock more customization options and download high-quality logos for your growing brand.",
      buttonText: "Select",
      showInfoBox: true,
      features: [
        "SVG, PNG & JPG exports",
        "Transparent background",
        "High-resolution files",
        "Full customization access",
        "Commercial use license",
      ],
    },
    {
      title: "Business",
      price: "10.90 $",
      description: "Access all premium features, unlimited downloads, and advanced tools to scale your brand effortlessly.",
      buttonText: "Select",
      featured: true, // Special styling for button
      showInfoBox: true,
      features: [
        "Everything in Started",
        "Black & white logo version",
        "Inverted color version",
        "Favicon version",
        "Commercial use license",
        "Priority support",
      ],
    },
  ];

  return (
    <section class="pricing-section">
      <div class="pricing-container">
        <div class="pricing-headers">
          <div class="product-badge">
            <span class="dot"></span>
            Pricing
          </div>
          <h2 class="pricing-title">Simple Pricing<br />Maximum Value</h2>
          <p class="pricing-subtitle">
            Pick the plan that fits your brand perfectly. Get full access to our logo creation tools, premium features, and hassle-free downloads to bring your brand to life quickly and effortlessly.
          </p>
        </div>

        <div class="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              class="pricing-card"
            >
              <div class="plan-badge">
                <span class="dot"></span>
                {plan.title}
              </div>
              
              <div class="price">
                <span class="amount">{plan.price}</span>
              </div>

              <p class="description">{plan.description}</p>

              <div class="divider"></div>

              <Link
                href="/app"
                class={`pricing-btn ${
                  plan.featured ? "primary-btn" : "secondary-btn"
                }`}
              >
                {plan.buttonText}
              </Link>

              <ul class="feature-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.showInfoBox && (
                <div class="info-box">
                  <p>Full commercial rights.</p>
                  <p>Exclusive ownership guaranteed.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
