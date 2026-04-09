import { component$ } from "@builder.io/qwik";
import "./productBrandPreview.css";

interface Category {
  id: string;
  label: string;
  images: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "food",
    label: "Food",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484723088339-32383399b581?w=600&h=800&fit=crop",
    ],
  },
  {
    id: "fashion",
    label: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1539109132335-34a91bf3040b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
    ],
  },
  {
    id: "education",
    label: "Education",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1509062522246-37fa55ee2b71?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop",
    ],
  },
  {
    id: "technology",
    label: "Technology",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=800&fit=crop",
    ],
  },
];

export const ProductBrandPreview = component$(() => {
  const allImages = CATEGORIES.flatMap(cat => cat.images).slice(0, 5);

  return (
    <section class="pbp_section">
      <div class="pbp_container">
        <div class="pbp_header">
          <h2 class="pbp_title">Explore Stunning Logo Examples</h2>
          <p class="pbp_subtitle">
            Browse a curated collection of professional logos to inspire your next design. See styles, colors, and layouts in action.
          </p>
        </div>

        <div class="pbp_grid">
          {allImages.map((img, index) => (
            <div key={index} class="pbp_card">
              <img
                src={img}
                alt={`Brand preview ${index + 1}`}
                class="pbp_image"
                loading="lazy"
                width="600"
                height="800"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
