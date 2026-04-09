import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./abouttestimonial.css?inline";

export const AboutTestimonial = component$(() => {
  useStylesScoped$(styles);

  const testimonials = [
    {
      title: "Our Vision: Making Professional Logo Design Accessible to Everyone",
      description: "We envision a world where creating a professional logo is simple, intuitive, and accessible to everyone, from individual creators to growing businesses. Our goal is to empower brands to express their identity clearly and stand out in any market.",
      date: "March 16, 2026",
      color: "#0066ff",
      image: "/images/about/testimonial/about-vission.jpg"
    },
    {
      title: "Our Mission: Empowering Creators and Businesses Through Easy Logo Design",
      description: "Our mission is to provide powerful yet easy-to-use logo design tools that enable creators and businesses to bring their brand identity to life. We strive to simplify the design process while maintaining professional quality, helping every brand shine with confidence.",
      date: "March 16, 2026",
      color: "#0066ff",
      image: "/images/about/testimonial/about-mission.jpg"
    }
  ];

  return (
    <section class="about-testimonial">
      <div class="about-testimonial-container">
        <h2 class="about-testimonial-title">Crafting Logos That Make Your Brand Shine</h2>
        <p class="about-testimonial-subtitle">
          At Kitlayer, we make logo design simple and creative. Our tools empower creators and businesses to craft logos that capture their brand’s essence and leave a lasting impression.
        </p>
        
        <div class="about-testimonial-grid">
          {testimonials.map((item, index) => (
            <div key={index} class="about-testimonial-card">
              <div class="about-testimonial-image-container" style={{ backgroundColor: item.color }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  class="about-testimonial-image"
                  width={580}
                  height={400}
                />
              </div>
              <div class="about-testimonial-content">
                <h3 class="about-testimonial-card-title">{item.title}</h3>
                <p class="about-testimonial-card-description">{item.description}</p>
                <span class="about-testimonial-card-date">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
