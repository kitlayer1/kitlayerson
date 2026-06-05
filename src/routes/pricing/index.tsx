import { component$ } from '@builder.io/qwik';
import { PricingSection } from '../../components/pricing/PricingSection';
import { Footer } from '~/components/global/footer/footer';
import { HomeHeader } from '~/components/global/header/homeHeader';
import Faq from '~/components/global/faq/faq';
import { GlobalSelect } from '~/components/global/globalSelect/globalSelect';

export default component$(() => {
  return (
    <>
      <HomeHeader variant="cream" />
      <PricingSection />
      <Faq />
      <GlobalSelect
        features={[
          "100% FREE TO START",
                "FULLY CUSTOMIZABLE",
                "NO DESIGN SKILLS NEEDED",
                "10+ LOGO FORMATS",
                "8+ UNIQUE STYLES",
                "INSTANT DOWNLOAD",
                "HIGH-RES FILES INCLUDED",
                "UNLIMITED REVISIONSD",
              ]}
              backgroundColor="var(--color-secondary-200)"
              textColor="var(--color-primary-900)"
            />
      <Footer/>
    </>
  );
});

