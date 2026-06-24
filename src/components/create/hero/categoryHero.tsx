import { component$, useSignal, $, useStyles$ } from '@builder.io/qwik';
import { useNavigate } from "@builder.io/qwik-city";
import style0 from "./categoryHero.css?inline";
import ImgGlobalherouser1 from '../../../../public/images/global/hero/user/globalHeroUser1.svg?jsx';
import ImgGlobalherouser2 from '../../../../public/images/global/hero/user/globalHeroUser2.svg?jsx';
import ImgGlobalherouser3 from '../../../../public/images/global/hero/user/globalHeroUser3.svg?jsx';

interface Props {
  badge: string;
  title: string;
  description: string;
  subText: string;
  img: string;
}

export const CategoryHero = component$((props: Props) => {
  useStyles$(style0);

  const nav = useNavigate();
  const inputValue = useSignal("");

  const handleGenerate = $(() => {
    if (inputValue.value.trim()) {
      nav(`/app?brandName=${encodeURIComponent(inputValue.value.trim())}`);
    } else {
      nav("/app");
    }
  });

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
              bind:value={inputValue}
              onKeyDown$={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
            />

            <button class="categoryhero-input-button" onClick$={handleGenerate}>
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
                <ImgGlobalherouser1
                  class="avatar-circle"
                  aria-label="User Avatar"
                />
                <ImgGlobalherouser2
                  class="avatar-circle"
                  aria-label="User Avatar"
                />
                <ImgGlobalherouser3
                  class="avatar-circle"
                  aria-label="User Avatar"
                />
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
            width="900"
            height="400"
          />
        </div>
      </div>
    </section>
  );
});