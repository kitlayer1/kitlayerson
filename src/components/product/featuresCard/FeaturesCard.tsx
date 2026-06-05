import { component$ } from "@builder.io/qwik";
import "./featuresCard.css";

export const FeaturesCard = component$(() => {
  const features = [
    { 
      title: "150K", 
      desc: "Join thousands of designers who create stunning logos with our platform every day.",
      bg: "#091329",
      color: "#CFE7FF",
      descColor: "#CFE7FF"
    },
    { 
      title: "400K", 
      desc: "Thousands of unique logos generated, each crafted to match a brand’s identity perfectly.",
      bg: "#380C0F",
      color: "#CBB7DB",
      descColor: "#CBB7DB"
    },
    { 
      title: "200K", 
      desc: "Thousands of unique logos, each delivered as a complete brand kit tailored to your brand.",
      bg: "#022C13",
      color: "#F1F97E",
      descColor: "#F1F97E"
    },
    { 
      title: "198+", 
      desc: "Our platform is used by creators and businesses across countries worldwide.",
      bg: "#933F28",
      color: "#FFDBD1",
      descColor: "#FFDBD1"
    },
  ];

  return (
    <section class="fc_section">
      <div class="fc_container">
        <div class="fc_grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              class="fc_card"
              style={{
                "--card-bg": feature.bg,
                "--card-color": feature.color,
                "--card-desc-color": feature.descColor
              } as any}
            >
              <h2 class="fc_title">{feature.title}</h2>
              <p class="fc_desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
