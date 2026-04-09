import { component$ } from "@builder.io/qwik";
import "./productHeroCard.css";

export const ProductHeroCard = component$(() => {
  const cards = [
    {
      title: "Start Using for Free",
      desc: "Begin creating logos instantly with no cost. Use our intuitive tools to craft professional and eye-catching designs in just minutes.",
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
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      bgColor: "#FFECB3",
    },
    {
      title: "Use Without Sign-Up",
      desc: "Skip the sign-up process and start designing right away. Enjoy a fast, simple, and uninterrupted logo creation experience.",
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="18" y1="8" x2="23" y2="13"></line>
          <line x1="23" y1="8" x2="18" y2="13"></line>
        </svg>
      ),
      bgColor: "#D1EAFF",
    },
    {
      title: "Commercial Usage Rights",
      desc: "Use your logos confidently across your brand, social media, and all commercial projects without any restrictions.",
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      bgColor: "#C8E6C9",
    },
  ];

  return (
    <section class="phc_section">
      <div class="phc_container">
        <div class="phc_grid">
          {cards.map((card, index) => (
            <div key={index} class="phc_card">
              <div class="phc_icon_box" style={{ backgroundColor: card.bgColor }}>
                {card.icon}
              </div>
              <h3 class="phc_title">{card.title}</h3>
              <p class="phc_desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
