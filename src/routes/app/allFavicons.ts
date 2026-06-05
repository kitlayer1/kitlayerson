// src/routes/app/allFavicons.ts
//
// LOOKUP TABLE: category (step2) + styleId (step3 slot 1-7) → iconPath
//
// Step 3'te gösterilen ikonlar bu listeden DEĞİL, ayrı bir
// styleIcons listesinden gelir (step3Favicons.tsx içinde tanımlı).
// Bu liste yalnızca step 6/7 logo önizlemesinde kullanılır:
//   allFavicons.find(f => f.category === selectedCategory && f.styleId === selectedStyleId)

export interface Favicon {
  id: number;
  category: string; // step 2 kategorisiyle eşleşmeli
  styleId: number;  // step 3'teki slot numarası (1-7)
  iconPath: string;
  name: string;
}

export const allFavicons: Favicon[] = [

  // ─── Agriculture ───────────────────────────────────────────
  { id: 1, category: 'Agriculture', styleId: 1, iconPath: '/images/app/favicon/agriculture/logo1.svg', name: 'Agriculture Style 1' },
  { id: 2, category: 'Agriculture', styleId: 2, iconPath: '/images/app/favicon/agriculture/logo2.svg', name: 'Agriculture Style 2' },
  { id: 3, category: 'Agriculture', styleId: 3, iconPath: '/images/app/favicon/agriculture/logo3.svg', name: 'Agriculture Style 3' },
  { id: 4, category: 'Agriculture', styleId: 4, iconPath: '/images/app/favicon/agriculture/logo4.svg', name: 'Agriculture Style 4' },
  { id: 5, category: 'Agriculture', styleId: 5, iconPath: '/images/app/favicon/agriculture/logo5.svg', name: 'Agriculture Style 5' },
  { id: 6, category: 'Agriculture', styleId: 6, iconPath: '/images/app/favicon/agriculture/logo6.svg', name: 'Agriculture Style 6' },
  { id: 7, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logo7.svg', name: 'Agriculture Style 7' },
  { id: 8, category: 'Agriculture', styleId: 8, iconPath: '/images/app/favicon/agriculture/logoipsum-399.svg', name: 'Agriculture Style 8' },
  { id: 9, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logoipsum-415.svg', name: 'Agriculture Style 7' },
  { id: 10, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logoipsum-424.svg', name: 'Agriculture Style 7' },
  { id: 11, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logoipsum-417.svg', name: 'Agriculture Style 7' },
  { id: 12, category: 'Agriculture', styleId: 7, iconPath: '/images/app/favicon/agriculture/logoipsum-427.svg', name: 'Agriculture Style 7' },

  
];

/**
 * Kullanım:
 *   const favicon = getFavicon(selectedCategory, selectedStyleId);
 *   if (favicon) { ... favicon.iconPath ... }
 */
export function getFavicon(category: string, styleId: number): Favicon | undefined {
  return allFavicons.find(f => f.category === category && f.styleId === styleId);
}

/**
 * Bir kategoriye ait tüm favicon'ları döndürür.
 */
export function getFaviconsByCategory(category: string): Favicon[] {
  return allFavicons.filter(f => f.category === category);
}