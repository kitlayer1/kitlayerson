import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { CategoryBadge } from "~/components/create/badge/categoryBadge";
import { CategoryHero } from "~/components/create/hero/categoryHero";
import { CategorySectionCard } from "~/components/create/card/section/categorySectionCard";
import { CategoryBrandCard } from "~/components/create/card/brand/categoryBrandCard";
import { CategoryTestimonial } from "~/components/create/testimonial/categoryTestimonial";
import { HomeHeader } from "~/components/global/header/homeHeader";
import { NotFound } from "~/components/global/notFound/notFound";
import createData from "../../../../public/data/createDetail.json";
import { HomeBanner } from "~/components/home/banner/homeBanner";
import { Footer } from "~/components/global/footer/footer";

interface CardItem {
  badge: string;
  title: string;
  description: string;
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
      <HomeHeader />

      <CategoryHero
        badge={page.value.hero.badge}
        title={page.value.hero.title}
        description={page.value.hero.description}
        subText={page.value.hero.subText}
        img={page.value.hero.img}
      />

      {/* CARD SECTION */}
      {page.value.categorySection.cards && (
        <CategorySectionCard cards={page.value.categorySection.cards} />
      )}

      {/* BRAND LOGOS */}
      {page.value.brandLogos && (
        <CategoryBrandCard
          title={page.value.hero.title}
          description={page.value.hero.description}
          logos={page.value.brandLogos}
        />
      )}

      {/* TESTIMONIAL */}
      {page.value.testimonials && (
        <CategoryTestimonial testimonials={page.value.testimonials} />
      )}

      {/* CATEGORY BADGES */}
      {page.value.categories && (
        <CategoryBadge categories={page.value.categories} />
      )}
      <HomeBanner />
      <Footer />

    </>
  );
});