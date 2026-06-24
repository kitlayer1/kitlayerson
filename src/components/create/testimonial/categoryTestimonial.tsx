import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./categoryTestimonial.css?inline";

interface TestimonialItem {
  img: string;
  title: string;
  description: string;
}

interface Props {
  testimonials: TestimonialItem[];
}

export const CategoryTestimonial = component$<Props>(({ testimonials }) => {
  useStyles$(style0);

  return (
    <section class="testimonial-section">
      <div class="testimonial-container">
        <div class="testimonial-grid">
          {testimonials.map((item, i) => (
            <div class="testimonial-card" key={i}>
              
              <div class="testimonial-image">
                <img src={item.img} alt={item.title} width="300" height="200" />
              </div>

              <div class="testimonial-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
});