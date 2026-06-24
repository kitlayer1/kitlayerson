import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./homeCardSection.css?inline";

export const HomeCardSection = component$(() => {
  useStyles$(style0);

  const cards = [
    {
      title: "Enter Your Brand Name",
      desc: "Start by adding your brand name and tagline Select your industry to generate logo to begin shaping your logo identity.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 7 4 4 20 4 20 7"></polyline>
          <line x1="9" y1="20" x2="15" y2="20"></line>
          <line x1="12" y1="4" x2="12" y2="20"></line>
        </svg>
      ),
      bgColor: "#368ffb",
      iconColor: "#022C12",
    },
    {
      title: "Choose Your Category",
      desc: "Select your industry to generate logo styles that match your brand with styles that reflect you begin shaping your logo identity.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      bgColor: "var(--color-primary-500)",
      iconColor: "#022C12",
    },
    {
      title: "Pick Your Brand Style",
      desc: "Define the look and feel of your brand and create the right emotional impact brand with styles that reflect your vision.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      bgColor: "var(--color-secondary-200)",
      iconColor: "#022C12",
    },
    {
      title: "Select Your Colors",
      desc: "Choose colors that represent your brand and create Explore different logo layouts and styles the right emotional impact.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="13.5" cy="6.5" r=".5"></circle>
          <circle cx="17.5" cy="10.5" r=".5"></circle>
          <circle cx="8.5" cy="7.5" r=".5"></circle>
          <circle cx="6.5" cy="12.5" r=".5"></circle>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.707-.484 2.179-1.208.402-.618.398-1.428-.01-2.062A4.57 4.57 0 0 1 13.5 16.5c.34-.606.5-1.303.5-2 0-1.38 1.12-2.5 2.5-2.5 1.104 0 2 .896 2 2 0 1.933 1.567 3.5 3.5 3.5 1.104 0 2-.896 2-2 0-7.732-6.268-14-14-14z"></path>
        </svg>
      ),
      bgColor: "var(--color-green-BG)",
      iconColor: "var(--color-secondary-200)",
    },
    {
      title: "Choose a Logo Style",
      desc: "Explore different logo layouts multiple formats, ready for use acros and styles to find the perfect fit for your brand.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      bgColor: "#FFFFFF",
      iconColor: "#022C12",
    },
    {
      title: "Download Your Logo",
      desc: "Get your logo in multiple formats, ready Choose a style, customize colors and typography your brand and create layouts multiple.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
      ),
      bgColor: "var(--color-primary-200)",
      iconColor: "#022C12",
    },
  ];

  return (
    <section class="pcs_section">
      <div class="pcs_container">
        <div class="pcs_header">
          <h2 class="pcs_heading">
           YOUR PERFECT LOGO, READY IN JUST A FEW SIMPLE STEPS FOR YOUR BRAND
          </h2>
          <p class="pcs_subtext">
         Create a professional logo for your brand in just a few simple steps no design experience needed and easy to get started.
          </p>
        </div>

        <div class="pcs_grid">
          {cards.map((card, index) => (
            <div key={index} class="pcs_card">
              <div class="pcs_card_icon" style={{ backgroundColor: card.bgColor, color: card.iconColor }}>
                {card.icon}
              </div>
              <h3 class="pcs_card_title">{card.title}</h3>
              <p class="pcs_card_desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
