import { component$, useSignal, $, useStyles$ } from '@builder.io/qwik';
import { useNavigate } from "@builder.io/qwik-city";
import style0 from "./homeHero.css?inline";
import style1 from "~/styles/tokens/spacing.css?inline";
import style2 from "~/styles/tokens/colors.css?inline";
import style3 from "~/styles/tokens/typography.css?inline";
import style4 from "~/styles/tokens/radius.css?inline";

interface Props {
  title: string;
  description: string;
  subText?: string;
  placeholder?: string;
  buttonText?: string;
  badgeText?: string;
}

export const HomeHero = component$((props: Props) => {
  useStyles$(style0);
  useStyles$(style1);
  useStyles$(style2);
  useStyles$(style3);
  useStyles$(style4);

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
    <section class="homehero">
      <div class="homehero-container">
        <div class="homehero-left">
          {props.badgeText && (
            <div class="homehero-badge">
              {props.badgeText}
            </div>
          )}

          <h1 class="homehero-title">
            {props.title}
          </h1>

          <p class="homehero-description">
            {props.description}
          </p>
          <div class="homehero-input">
            <input
              class="homehero-input-field"
              placeholder={props.placeholder || "Enter brand name"}
              bind:value={inputValue}
              onKeyDown$={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
            />

            <button class="homehero-input-button" onClick$={handleGenerate}>
              <span class="button-text">{props.buttonText || "Generate"}</span>
              <div class="button-icon-wrapper">
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
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {props.subText && (
            <p class="homehero-sub">
              {props.subText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
});