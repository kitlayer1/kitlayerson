import { component$ } from "@builder.io/qwik";
import "./categoryHero.css";

interface Props {
  badge: string;
  title: string;
  description: string;
  subText: string;
  img: string;
}

export const CategoryHero = component$((props: Props) => {
  return (
    <section class="categoryhero">
      <div class="categoryhero-container">
        <div class="categoryhero-left">
          {props.badge && (
            <div class="categoryhero-badge">
              {props.badge}
            </div>
          )}

          <h1 class="categoryhero-title">
            {props.title}
          </h1>

          <p class="categoryhero-description">
            {props.description}
          </p>

          <div class="categoryhero-input">
            <input
              class="categoryhero-input-field"
              placeholder="Brand Name"
            />

            <button class="categoryhero-input-button">
              Generate
              <div class="categoryhero-button-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {props.subText && (
            <div class="categoryhero-avatars-sub">
              <div class="categoryhero-avatars">
                <div class="avatar-circle"></div>
                <div class="avatar-circle"></div>
                <div class="avatar-circle"></div>
              </div>
              <p class="categoryhero-sub">
                {props.subText}
              </p>
            </div>
          )}
        </div>

        <div class="categoryhero-right">
          <img
            class="categoryhero-mainimg"
            src={props.img}
            alt={props.title}
            width="500"
            height="410"
          />
        </div>
      </div>
    </section>
  );
});