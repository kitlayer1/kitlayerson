import { component$ } from "@builder.io/qwik";
import "./homeBanner.css";

export const HomeBanner = component$(() => {
  return (
    <section class="hb_wrap">
      <div class="hb_container">
        <div class="hb_left">
          <h1 class="hb_title">Ready to Give Your Brand a Real Try?</h1>
          <p class="hb_desc">
            Take full control of your brand with our all-in-one AI-powered platform. Create, manage, and customize your assets effortlessly, streamline your workflow, and watch your brand grow with ease and confidence.
          </p>
          <a href="/app" class="hb_button">Get Started</a>
        </div>
      </div>
    </section>
  );
});