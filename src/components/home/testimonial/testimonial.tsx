import { component$ } from "@builder.io/qwik";
import "./testimonial.css";

interface TestimonialItem {
  image: string;
  title: string;
  description: string;
}

export const Testimonial = component$(() => {
  const testimonials: TestimonialItem[] = [
    {
      image: "/images/home/testimonial/brandName.svg",
      title: "Enter Your Brand Details",
      description:
        "Start by adding your brand’s core information. Name, description, and key details — all set up in just a few steps.",
    },
    {
      image: "/images/home/testimonial/brandCategory.svg",
      title: "Choose Your Brand Category.",
      description:
        "Select the category that best fits your brand. We’ll tailor the experience and suggestions based on your choice.",
    },
    {
      image: "/images/home/testimonial/brandDownload.svg",
      title: "Download Ready-to-Use Files",
      description:
        "Download your brand assets in popular formats like JPG, SVG PNG, or PDF — ready for web, social media, or print.",
    },
  ];

  return (
    <section class="testi-wrapper">
      <div class="testi-container">

        {/* section header */}
        <div class="testi-header">
          <h2 class="testi-section-title">
           How It Works Step by Step
          </h2>
          <p class="testi-section-desc">
            Follow our simple, guided process to create, customize, and launch your brand effortlessly. Each step is designed to make your experience smooth, intuitive, and productive
          </p>
        </div>

        <div class="testi-grid">
          {testimonials.map((item, index) => (
            <div class="testi-card" key={index}>
              <div class="testi-image">
                <img src={item.image} alt={item.title} width="300" height="200" />
              </div>

              <div class="testi-content">
                <h3 class="testi-title">{item.title}</h3>
                <p class="testi-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});