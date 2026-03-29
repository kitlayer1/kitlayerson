import { component$ } from "@builder.io/qwik";
import "./categoryBrandCard.css";

interface BrandLogo {
  img: string;
  bg: string;
}

interface Props {
  title: string;
  description: string;
  logos: BrandLogo[];
}

export const CategoryBrandCard = component$<Props>(
  ({ title, description, logos }) => {
    return (
      <section class="cbrand-sections">
        <div class="ccontainer">

          <div class="cbrand-header">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <div class="cbrand-grid">
            {logos.map((logo, index) => (
              <div
                key={index}
                class="cbrand-card"
                style={{ background: logo.bg }}
              >
                <img src={logo.img} alt="Brand Logo" width="120" height="120" />
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }
);