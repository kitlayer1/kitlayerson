// src/routes/app/colorOption.ts

export type ColorPalette = {
  background: string;
  text: string;
  icon?: string;
};

export type ColorOption = {
  id: number;
  displayColor: string;
  title: string;
  description: string;
  image: string;
  palettes: ColorPalette[];
};

// Internal-only: kategori etiketli palet (dış API'ye sızdırılmaz)
type CategorizedPalette = ColorPalette & { category: PaletteCategory };

type PaletteCategory =
  | "light-mono"
  | "dark-mono"
  | "accent"
  | "neutral-light"
  | "neutral-dark";

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^#/, "");
  if (hex.length === 8) {
    hex = hex.substring(0, 6);
  }
  if (hex.length === 3) {
    hex = hex.split("").map(x => x + x).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/**
 * Bir listeden eşit aralıklarla (stride) örnekleme yapar.
 * Böylece "ilk N" alma yerine baştan sona çeşitlilik korunur
 * (örn. dark-mono'da hem en koyu hem nispeten daha az koyu örnekler kalır).
 */
function sampleEvenly<T>(list: T[], maxCount: number): T[] {
  if (list.length <= maxCount) return list;
  const result: T[] = [];
  const step = list.length / maxCount;
  for (let i = 0; i < maxCount; i++) {
    result.push(list[Math.floor(i * step)]);
  }
  return result;
}

/**
 * Kategorilere göre ağırlıklı round-robin seçim yaparak listeyi dengeler.
 * Böylece "dark-mono" gibi koyu/siyah arkaplanlı kategoriler listenin
 * tamamını domine etmez; UI sırayla/ilk N gösterse bile renk çeşitliliği korunur.
 *
 * weight < 1 olan kategoriler her turda DEĞİL, her 1/weight turda bir eklenir
 * (örn. weight=0.34 → ~3 turda 1 kez, yani dark-mono oranı ~%8-10'a düşer).
 */
function balancePalettes(
  palettes: CategorizedPalette[],
  maxPerCategory?: number
): ColorPalette[] {
  const grouped = new Map<PaletteCategory, CategorizedPalette[]>();
  for (const p of palettes) {
    if (!grouped.has(p.category)) grouped.set(p.category, []);
    grouped.get(p.category)!.push(p);
  }

  // Her kategoriyi opsiyonel olarak kırp, ama BAŞTAN değil EŞİT ARALIKLI örnekle
  // (örn. dark-mono 384 -> 40, hem en koyu hem nispeten az koyu örnekleri içerir)
  if (maxPerCategory) {
    for (const [key, list] of grouped) {
      if (list.length > maxPerCategory) {
        grouped.set(key, sampleEvenly(list, maxPerCategory));
      }
    }
  }

  // Kategori ağırlıkları: koyu/siyah bg üreten kategoriler düşük ağırlıklı,
  // böylece round-robin'de daha seyrek görünürler.
  const categoryWeights: Record<PaletteCategory, number> = {
    "light-mono": 1,
    "dark-mono": 0.3,
    "accent": 1,
    "neutral-light": 1,
    "neutral-dark": 0.3,
  };

  const categories = Array.from(grouped.keys());
  // Her kategori için "ilerleme sayacı" - turda ne kadar ilerlendi
  const progress = new Map<PaletteCategory, number>(categories.map(c => [c, 0]));
  const indexInList = new Map<PaletteCategory, number>(categories.map(c => [c, 0]));

  const result: ColorPalette[] = [];
  let added = true;

  while (added) {
    added = false;
    for (const cat of categories) {
      const list = grouped.get(cat)!;
      const weight = categoryWeights[cat] ?? 1;
      const prog = progress.get(cat)! + weight;

      if (prog >= 1) {
        const idx = indexInList.get(cat)!;
        if (idx < list.length) {
          const item = list[idx];
          const rest: ColorPalette = {
            background: item.background,
            text: item.text,
            ...(item.icon ? { icon: item.icon } : {}),
          };
          result.push(rest);
          indexInList.set(cat, idx + 1);
          added = true;
        }
        progress.set(cat, prog - 1);
      } else {
        progress.set(cat, prog);
        // Bu kategoride hâlâ alınacak öğe varsa turun bitmediğini işaretle
        if (indexInList.get(cat)! < list.length) added = true;
      }
    }
  }

  return result;
}

export function generatePalettes(baseColor: string, title: string): ColorPalette[] {
  const { h, s: originalS } = hexToHsl(baseColor);
  const palettes: CategorizedPalette[] = [];
  const added = new Set<string>();

  const addPalette = (
    bg: string,
    txt: string,
    category: PaletteCategory,
    ic?: string
  ) => {
    const key = `${bg}-${txt}-${ic || ""}`;
    if (!added.has(key)) {
      added.add(key);
      palettes.push({ background: bg, text: txt, ...(ic ? { icon: ic } : {}), category });
    }
  };

  // Helper for reasonable saturation based on L
  function bgSatsForL(baseS: number): number[] {
    const factor = baseS / 100;
    return [
      Math.round(15 * factor),
      Math.round(40 * factor),
      Math.round(70 * factor),
      Math.round(95 * factor)
    ].filter(s => s >= 0);
  }

  // Black / neutral theme handling
  if (title.toLowerCase() === "black" || originalS < 10) {
    // 1. Dark backgrounds with light text
    const darkLValues = [0, 4, 8, 12, 16, 20, 24];
    const lightLValues = [75, 80, 85, 90, 95, 100];
    for (const bgL of darkLValues) {
      for (const txtL of lightLValues) {
        const bgHex = hslToHex(h, 0, bgL);
        const txtHex = hslToHex(h, 0, txtL);
        addPalette(bgHex, txtHex, "neutral-dark");
      }
    }
    // 2. Light backgrounds with dark text
    for (const bgL of lightLValues) {
      for (const txtL of darkLValues) {
        const bgHex = hslToHex(h, 0, bgL);
        const txtHex = hslToHex(h, 0, txtL);
        addPalette(bgHex, txtHex, "neutral-light");
      }
    }
    // 3. Cool grays, warm grays
    const coolHue = 220; // bluish gray
    const warmHue = 30;  // brownish/warm gray
    for (const hue of [coolHue, warmHue]) {
      for (const bgL of [5, 10, 15, 90, 95]) {
        for (const txtL of [85, 90, 98, 10, 15, 20]) {
          if (Math.abs(bgL - txtL) > 40) {
            const bgHex = hslToHex(hue, 8, bgL);
            const txtHex = hslToHex(hue, 8, txtL);
            const category: PaletteCategory = bgL < 50 ? "neutral-dark" : "neutral-light";
            addPalette(bgHex, txtHex, category);
          }
        }
      }
    }
    return balancePalettes(palettes);
  }

  // 1. Monochromatic Light Modes (bg L: 90-98%, text L: 10-30%)
  const lightBgs = [90, 94, 98];
  const lightBgSats = bgSatsForL(originalS);
  const darkTexts = [10, 15, 22, 28];
  const darkTextSats = [60, 80, 100];

  for (const bgL of lightBgs) {
    for (const bgS of lightBgSats) {
      for (const txtL of darkTexts) {
        for (const txtS of darkTextSats) {
          const bgHex = hslToHex(h, bgS, bgL);
          const txtHex = hslToHex(h, txtS, txtL);
          addPalette(bgHex, txtHex, "light-mono");

          // Add analogous icon version
          const analogousHue = (h + 30) % 360;
          const iconHex = hslToHex(analogousHue, txtS, txtL);
          addPalette(bgHex, txtHex, "light-mono", iconHex);
        }
      }
    }
  }

  // 2. Monochromatic Dark Modes (bg L: 4-16%, text L: 75-96%)
  const darkBgs = [4, 8, 12, 16];
  const darkBgSats = bgSatsForL(originalS);
  const lightTexts = [75, 82, 90, 96];
  const lightTextSats = [40, 70, 95];

  for (const bgL of darkBgs) {
    for (const bgS of darkBgSats) {
      for (const txtL of lightTexts) {
        for (const txtS of lightTextSats) {
          const bgHex = hslToHex(h, bgS, bgL);
          const txtHex = hslToHex(h, txtS, txtL);
          addPalette(bgHex, txtHex, "dark-mono");

          // Add complementary icon version
          const compHue = (h + 180) % 360;
          const iconHex = hslToHex(compHue, txtS, txtL);
          addPalette(bgHex, txtHex, "dark-mono", iconHex);
        }
      }
    }
  }

  // 3. Accent Modes (Solid/vivid background with white/black or light text)
  const accentBgs = [35, 45, 55, 65];
  for (const bgL of accentBgs) {
    for (const bgS of lightBgSats) {
      const bgHex = hslToHex(h, bgS, bgL);
      addPalette(bgHex, "#FFFFFF", "accent");
      addPalette(bgHex, hslToHex(h, 15, 96), "accent");

      // With complementary icon (renkli, siyah değil)
      const compHue = (h + 180) % 360;
      addPalette(bgHex, "#FFFFFF", "accent", hslToHex(compHue, 90, 80));
      addPalette(bgHex, hslToHex(h, 15, 96), "accent", hslToHex(compHue, 90, 70));
    }
  }

  // 4. Pure Neutrals with theme accents (sadece açık nötrler)
  const neutralBgs = ["#FFFFFF", "#F9FAFC", "#F3F4F6"];
  const themeLValues = [35, 45, 55, 65, 75];
  for (const bgHex of neutralBgs) {
    const bgL = hexToHsl(bgHex).l;
    for (const themeL of themeLValues) {
      if (Math.abs(bgL - themeL) > 40) {
        const themeTxtHex = hslToHex(h, Math.min(100, originalS + 10), themeL);
        addPalette(bgHex, themeTxtHex, "neutral-light");

        const analogousHue = (h + 30) % 360;
        const iconHex = hslToHex(analogousHue, Math.min(100, originalS + 10), themeL);
        addPalette(bgHex, themeTxtHex, "neutral-light", iconHex);
      }
    }
  }

  // dark-mono kategorisi sayıca çok fazla (384 kombinasyon), 40 ile sınırla
  return balancePalettes(palettes, 40);
}

export const colorOptions: ColorOption[] = [
  {
    id: 1,
    displayColor: '#2563EB',
    title: 'Blue',
    description: 'Trustworthy, professional, intelligent, secure, innovative',
    image: '/images/app/color/color-style-blue.svg',
    palettes: generatePalettes('#2563EB', 'Blue')
  },
  {
    id: 2,
    displayColor: '#16A34A',
    title: 'Green',
    description: 'Natural, sustainable, healthy, balanced, refreshing',
    image: '/images/app/color/color-style-green.svg',
    palettes: generatePalettes('#16A34A', 'Green')
  },
  {
    id: 3,
    displayColor: '#DC2626',
    title: 'Red',
    description: 'Bold, powerful, passionate, energetic, confident',
    image: '/images/app/color/color-style-red.svg',
    palettes: generatePalettes('#DC2626', 'Red')
  },
  {
    id: 4,
    displayColor: '#e6b801ff',
    title: 'Yellow',
    description: 'Optimistic, cheerful, vibrant, creative, uplifting',
    image: '/images/app/color/color-style-yellow.svg',
    palettes: generatePalettes('#e6b801ff', 'Yellow')
  },
  {
    id: 5,
    displayColor: '#9333EA',
    title: 'Purple',
    description: 'Prestigious, luxurious, imaginative, visionary, sophisticated',
    image: '/images/app/color/color-style-purple.svg',
    palettes: generatePalettes('#9333EA', 'Purple')
  },
  {
    id: 6,
    displayColor: '#F97316',
    title: 'Orange',
    description: 'Friendly, dynamic, ambitious, modern, energetic',
    image: '/images/app/color/color-style-orange.svg',
    palettes: generatePalettes('#F97316', 'Orange')
  },
  {
    id: 7,
    displayColor: '#111827',
    title: 'Black',
    description: 'Elegant, prestigious, luxurious, timeless, sophisticated',
    image: '/images/app/color/color-style-black.svg',
    palettes: generatePalettes('#111827', 'Black')
  },
  {
    id: 8,
    displayColor: '#92400E',
    title: 'Brown',
    description: 'Authentic, heritage-inspired, dependable, natural, enduring',
    image: '/images/app/color/color-style-brown.svg',
    palettes: generatePalettes('#92400E', 'Brown')
  }
];

// ID → Option map (hızlı erişim)
export const colorOptionById = Object.fromEntries(
  colorOptions.map(opt => [opt.id, opt])
) as Record<number, ColorOption>;