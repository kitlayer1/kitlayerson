import { component$ } from "@builder.io/qwik";
import { Footer } from "~/components/global/footer/footer";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { HomeBanner } from "~/components/home/banner/homeBanner";
import { Pricing } from "~/components/pricing/cardModal/pricing";




export default component$(() => {

  return (
    <>
      <HomeHeader />
      <Pricing />
      <HomeBanner />
      <Footer />
    </>
  );
});
