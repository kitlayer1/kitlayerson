import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CategoryBadge } from "~/components/create/badge/categoryBadge";
import { CategoryHero } from "~/components/create/hero/categoryHero";
import { CategorySection } from "~/components/create/categorySection/categorySection";
import { CategoryLogoBrand } from "~/components/create/logoBrand/categoryLogoBrand";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { NotFound } from "~/components/global/notFound/notFound";
import createData from "../../../../public/data/createDetail.json";
import { Footer } from "~/components/global/footer/footer";
import { ProductSection } from "~/components/product/productSection/productSection";
import { GlobalSelect } from "~/components/global/globalSelect/globalSelect";

interface CardItem {
  badge: string;
  title: string;
  description: string;
  img?: string;
}

interface HeroData {
  badge: string;
  title: string;
  description: string;
  subText: string;
  img: string;
}

interface SectionData {
  badge: string;
  title: string;
  description: string;
  subText: string;
  cards?: CardItem[];
}

interface CategoryItem {
  label: string;
  slug: string;
}

interface BrandLogo {
  img: string;
  bg: string;
}

interface TestimonialItem {
  img: string;
  title: string;
  description: string;
}

interface PageData {
  hero: HeroData;
  categorySection: SectionData;
  categories?: CategoryItem[];
  brandLogos?: BrandLogo[];
  testimonials?: TestimonialItem[];
}


export const usePageData = routeLoader$<PageData | null>(
  async ({ params, status }) => {
    const slug = params.slug?.toLowerCase();

    if (!slug) {
      status(404);
      return null;
    }

    const pages = (createData as any).success;
    const pageData = pages[slug];

    if (!pageData) {
      status(404);
      return null;
    }

    return pageData;
  }
);

export default component$(() => {
  const page = usePageData();

  if (!page.value) {
    return <NotFound />;
  }

  return (
    <>
      <HomeHeader variant="light" />

      <CategoryHero
        badge={page.value.hero.badge}
        title={page.value.hero.title}
        description={page.value.hero.description}
        subText={page.value.hero.subText}
        img={page.value.hero.img}
      />
      <GlobalSelect
        features={[
          "NO DESIGN SKILLS NEEDED",
          "READY IN 60 SECONDS",
          "PROFESSIONAL QUALITY",
          "DOWNLOAD & USE ANYWHERE",
          "NO CREDIT CARD REQUIRED",
          "FULLY CUSTOMIZABLE",
          "FULLY CUSTOMIZABLE",
        ]}
        backgroundColor="var(--color-secondary-200)"
        textColor="var(--color-primary-900)"
      />

      {page.value.categorySection.cards && (
        <CategorySection cards={page.value.categorySection.cards} />
      )}

      {page.value.brandLogos && (
        <CategoryLogoBrand logos={page.value.brandLogos} />
      )}
      <ProductSection/>
      {page.value.categories && (
        <CategoryBadge categories={page.value.categories} />
      )}

      <GlobalSelect
              features={[
                "100% FREE TO START",
                "FULLY CUSTOMIZABLE",
                "NO DESIGN SKILLS NEEDED",
                "10+ LOGO FORMATS",
                "8+ UNIQUE STYLES",
                "INSTANT DOWNLOAD",
                "HIGH-RES FILES INCLUDED",
                "UNLIMITED REVISIONS",
              ]}
              backgroundColor="var(--color-secondary-200)"
              textColor="var(--color-primary-900)"
            />
      
      <Footer />

    </>
  );
});