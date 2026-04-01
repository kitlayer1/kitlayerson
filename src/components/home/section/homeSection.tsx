/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";
import "./homeSection.css";

export const HomeSection = component$(() => {
  return (
    <section class="hs-wrapper">
      <div class="hs-grid">

        <div class="hs-leftCard">
          <h2 class="hs-title">
            <span class="hs-line">Create</span>
            <span class="hs-line">Customize</span>
            <span class="hs-line">Empower</span>
            <span class="hs-line">Share Your</span>
            <span class="hs-line">Brand</span>
            <span class="hs-line">Instantly</span>
          </h2>
        </div>

        <div class="hs-imageArea">
          <img
            src="/images/home/section/homeSection.svg"
            alt="Dashboard"
            class="hs-image"
            width="800"
            height="600"
          />
        </div>

      </div>
    </section>
  );
});