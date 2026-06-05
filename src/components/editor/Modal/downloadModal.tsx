// src/components/editor/Modal/downloadModal.tsx
import { component$, useSignal, $, QRL } from '@builder.io/qwik';
import { supabase } from '~/lib/supabaseClient';
import "./downloadModal.css";

interface DownloadModalProps {
  brandName: string;
  generateSvg$: QRL<(mode?: string) => Promise<string>>;
  palette?: { background: string; text: string; icon?: string };
  closeMethod$?: QRL<() => void>;
  triggerElement?: HTMLElement;
  isPaid?: boolean;
  planType?: 'started' | 'business' | null;
  onFormatSelect$?: QRL<(format: string, includeAll: boolean) => Promise<boolean>>;
  onShowPricing$?: QRL<() => void>;
}

export const DownloadModal = component$<DownloadModalProps>((props) => {
  const showModal = useSignal(true);
  const modalPosition = useSignal({ top: 0, left: 0 });
  const selectedFormat = useSignal('jpg');
  const includeAllFormats = useSignal(false);
  const showFormatModal = useSignal(false);
  const isMobile = useSignal(false);
  const isDownloading = useSignal(false);
  const selectedLogoType = useSignal('color');
  const showLogoTypeModal = useSignal(false);

  // File Icon
  const fileIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <path d="M14 2v6h6"></path>
    <path d="M8 13h2"></path>
    <path d="M8 17h2"></path>
    <path d="M10 9h2"></path>
    <path d="M10 15h2"></path>
  </svg>`;

  const purpleCrownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#a45cf6" stroke="none"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`;
  const goldCrownIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#e5a400" stroke="none"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`;

  // Ekran genişliğini kontrol et
  const checkScreenSize$ = $(() => {
    isMobile.value = window.innerWidth < 1000;
  });

  // Modal pozisyonunu hesapla
  const calculatePosition$ = $(() => {
    if (!props.triggerElement) return;
    
    if (isMobile.value) {
      modalPosition.value = { top: 0, left: 0 };
    } else {
      const rect = props.triggerElement.getBoundingClientRect();
      const modalWidth = 440; // Genişletildi
      const modalHeight = 560;
      
      let top = rect.bottom + 12;
      let left = rect.right - modalWidth;
      
      if (left + modalWidth > window.innerWidth) {
        left = window.innerWidth - modalWidth - 16;
      }
      
      if (left < 16) {
        left = 16;
      }
      
      if (top + modalHeight > window.innerHeight) {
        top = rect.top - modalHeight - 12;
      }
      
      modalPosition.value = { top, left };
    }
  });

  const downloadSvg$ = $(async (mode?: string) => {
    const targetMode = mode || selectedLogoType.value;
    const svg = await props.generateSvg$(targetMode);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.brandName}_${targetMode}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const downloadPng$ = $(async (mode?: string) => {
    const targetMode = mode || selectedLogoType.value;
    const svg = await props.generateSvg$(targetMode);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    
    return new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 4000;
        canvas.height = 4000;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, 4000, 4000);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${props.brandName}_${targetMode}.png`;
        a.click();
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("PNG generation failed - Image load error"));
      };
      img.src = url;
    });
  });

  const downloadJpg$ = $(async (mode?: string) => {
    const targetMode = mode || selectedLogoType.value;
    const svg = await props.generateSvg$(targetMode);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    
    return new Promise<void>((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 4000;
        canvas.height = 4000;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = props.palette?.background || '#ffffff';
        ctx.fillRect(0, 0, 4000, 4000);
        ctx.drawImage(img, 0, 0, 4000, 4000);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/jpeg", 0.95);
        a.download = `${props.brandName}_${targetMode}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("JPG generation failed - Image load error"));
      };
      img.src = url;
    });
  });

  const downloadPdf$ = $(async (mode?: string) => {
    const targetMode = mode || selectedLogoType.value;
    const svg = await props.generateSvg$(targetMode);
    const blob = new Blob([svg], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.brandName}_${targetMode}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const downloadZip$ = $(async () => {
    await downloadJpg$();
    await downloadPng$();
    await downloadSvg$();
    await downloadPdf$();
  });

  const handleClose$ = $(() => {
    showModal.value = false;
    props.closeMethod$?.();
  });

  // İndirme işlemini başlat
  const handleDownload$ = $(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user) {
      console.error("User session not found during download");
      return;
    }

    const isPremium = props.planType === 'business';
    const isPro = props.planType === 'started';

    let isAllowed = false;

    if (isPremium) {
      isAllowed = true;
    }
    else if (isPro) {
      if (selectedLogoType.value === 'color') {
        isAllowed = true;
      }
    }
    else {
      if (selectedLogoType.value === 'color' && selectedFormat.value === 'jpg') {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      await props.onShowPricing$?.();
      handleClose$();
      return;
    }

    if (props.onFormatSelect$) {
      const canDownload = await props.onFormatSelect$(
        selectedFormat.value, 
        includeAllFormats.value
      );
      
      if (canDownload === false) {
        return;
      }
    }

    isDownloading.value = true;
    
    try {
      const downloadEverything$ = $(async (formats: string[]) => {
        const MODES = ['color', 'invert', 'black', 'white', 'transparent'];
        for (const mode of MODES) {
          if (formats.includes('jpg')) await downloadJpg$(mode);
          if (formats.includes('png')) await downloadPng$(mode);
          if (formats.includes('svg')) await downloadSvg$(mode);
          if (formats.includes('pdf')) await downloadPdf$(mode);
        }
      });

      if (includeAllFormats.value || selectedLogoType.value === 'all') {
        const formatsToDownload = includeAllFormats.value 
          ? ['jpg', 'png', 'svg', 'pdf'] 
          : [selectedFormat.value];
        
        if (selectedLogoType.value === 'all') {
          await downloadEverything$(formatsToDownload);
        } else {
          for (const fmt of formatsToDownload) {
            if (fmt === 'png') await downloadPng$();
            if (fmt === 'jpg') await downloadJpg$();
            if (fmt === 'svg') await downloadSvg$();
            if (fmt === 'pdf') await downloadPdf$();
          }
        }
      } else {
        if (selectedFormat.value === 'png') await downloadPng$();
        if (selectedFormat.value === 'jpg') await downloadJpg$();
        if (selectedFormat.value === 'svg') await downloadSvg$();
        if (selectedFormat.value === 'pdf') await downloadPdf$();
        if (selectedFormat.value === 'zip') await downloadZip$();
      }
      
      handleClose$();
    } catch (error) {
      console.error("İndirme hatası:", error);
    } finally {
      isDownloading.value = false;
    }
  });

  const closeFormatModal$ = $(() => {
    showFormatModal.value = false;
  });

  const selectFormat$ = $((format: string) => {
    selectedFormat.value = format;
    closeFormatModal$();
  });

  const formatOptions = [
    { value: 'jpg', label: 'JPG', description: 'High-quality image format with a small file size for everyday use', icon: 'image' },
    { value: 'png', label: 'PNG', description: 'High-quality image format with transparent background support', recommended: true, icon: 'image', isPremium: true },
    { value: 'svg', label: 'SVG', description: 'Scalable vector format that stays sharp at any size', isPremium: true, icon: 'image' },
    { value: 'pdf', label: 'Standart PDF', description: 'Print-ready format for sharing and professional use', icon: 'document', isPremium: true },
    { value: 'zip', label: 'ZIP (all inclusive)', description: 'Download all logo formats in a single package', isPremium: true, icon: 'document' }
  ];

  const logoTypeOptions = [
    { value: 'color', label: 'Main', description: 'The original and complete version of your logo for everyday use', icon: 'image' },
    { value: 'invert', label: 'Inverted', description: 'An inverted-color version of your logo for dark backgrounds', icon: 'image', isPremium: true },
    { value: 'black', label: 'Black', description: 'A clean black version of your logo for maximum versatility', icon: 'image', isPremium: true },
    { value: 'white', label: 'White', description: 'A clean white version of your logo for dark backgrounds', icon: 'image', isPremium: true },
    { value: 'transparent', label: 'Transparent', description: 'Your logo with a transparent background for flexible use on any design', icon: 'image', isPremium: true },
    { value: 'all', label: 'All Logos', description: 'Download every logo variation in a single package', icon: 'document', isPremium: true }
  ];

  // Modal gösterildiğinde pozisyonu hesapla
  if (showModal.value) {
    checkScreenSize$();
    calculatePosition$();
  }

  return (
    <>
      {showModal.value && (
        <div class="canva2025-overlay">
          <div class="canva2025-backdrop" onClick$={handleClose$} />
          <div 
            class={`canva2025-modal-v2 ${isMobile.value ? 'canva2025-modal-mobile' : ''}`}
            style={
              isMobile.value 
                ? {} 
                : {
                    position: 'fixed',
                    top: `${modalPosition.value.top}px`,
                    left: `${modalPosition.value.left}px`
                  }
            }
          >
            <div class="canva2025-header">
              <button class="canva2025-back-btn" onClick$={handleClose$}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              <h2>Download</h2>
            </div>

            <div class="canva2025-content">
              <div class="canva2025-section-v2">
                <label class="canva2025-label-v2">File Type</label>
                <div class="canva2025-select-wrapper">
                  <div 
                    class={`canva2025-select-trigger-v2 ${showFormatModal.value ? 'active' : ''}`} 
                    onClick$={(e) => { e.stopPropagation(); showFormatModal.value = !showFormatModal.value; showLogoTypeModal.value = false; }}
                  >
                    <div class="canva2025-selected-value">
                      <svg class="dropdown-file-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                      </svg>
                      <span class="canva2025-select-text-v2">
                        {formatOptions.find(opt => opt.value === selectedFormat.value)?.label}
                      </span>
                    </div>
                    <svg class={`canva2025-select-arrow-v2 ${showFormatModal.value ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {showFormatModal.value && (
                    <>
                      <div class="canva2025-dropdown-backdrop" onClick$={(e) => { e.stopPropagation(); closeFormatModal$(); }} />
                      <div class="canva2025-dropdown-menu-v2">
                        <div class="canva2025-dropdown-content">
                          {formatOptions.map((option) => (
                            <div 
                              key={option.value}
                              class={`canva2025-dropdown-option ${selectedFormat.value === option.value ? 'selected' : ''}`}
                              onClick$={() => {
                                selectFormat$(option.value);
                              }}
                            >
                              <div class="canva2025-dropdown-option-icon-wrapper">
                                {option.icon === 'image' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                )}
                                {option.icon === 'document' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                                )}
                                {option.icon === 'video' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m10 9 5 3-5 3z"/></svg>
                                )}
                              </div>
                              <div class="canva2025-dropdown-option-content">
                                <div class="canva2025-dropdown-option-label">
                                  <span class="canva2025-dropdown-option-title">{option.label}</span>
                                  {option.value === 'jpg' && !props.planType && <span class="canva2025-badge-free">Free</span>}
                                  {option.recommended && <span class="canva2025-badge-recommended">Suggested</span>}
                                  {option.isPremium && props.planType !== 'business' && props.planType !== 'started' && <span class="canva2025-crown-icon" style="display: flex;" dangerouslySetInnerHTML={goldCrownIcon} />}
                                </div>
                                <div class="canva2025-dropdown-option-description">{option.description}</div>
                              </div>
                              <div class="canva2025-dropdown-option-check-wrapper">
                                {selectedFormat.value === option.value && (
                                  <svg class="canva2025-dropdown-option-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div class="canva2025-section-v2">
                <label class="canva2025-label-v2">Logo Type</label>
                <div class="canva2025-select-wrapper">
                  <div 
                    class={`canva2025-select-trigger-v2 ${showLogoTypeModal.value ? 'active' : ''}`} 
                    onClick$={(e) => { e.stopPropagation(); showLogoTypeModal.value = !showLogoTypeModal.value; showFormatModal.value = false; }}
                  >
                    <div class="canva2025-selected-value">
                      <span class="canva2025-select-text-v2">
                         {logoTypeOptions.find(opt => opt.value === selectedLogoType.value)?.label}
                      </span>
                    </div>
                    <svg class={`canva2025-select-arrow-v2 ${showLogoTypeModal.value ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {showLogoTypeModal.value && (
                    <>
                      <div class="canva2025-dropdown-backdrop" onClick$={(e) => { e.stopPropagation(); showLogoTypeModal.value = false; }} />
                      <div class="canva2025-dropdown-menu-v2">
                        <div class="canva2025-dropdown-content">
                          {logoTypeOptions.map((option) => (
                            <div 
                              key={option.value}
                              class={`canva2025-dropdown-option ${selectedLogoType.value === option.value ? 'selected' : ''}`}
                              onClick$={() => {
                                selectedLogoType.value = option.value;
                                showLogoTypeModal.value = false;
                              }}
                            >
                              <div class="canva2025-dropdown-option-icon-wrapper">
                                {option.icon === 'image' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                                )}
                                {option.icon === 'document' && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                                )}
                              </div>
                              <div class="canva2025-dropdown-option-content">
                                <div class="canva2025-dropdown-option-label">
                                  <span class="canva2025-dropdown-option-title">{option.label}</span>
                                  {option.isPremium && props.planType !== 'business' && <span class="canva2025-crown-icon" style="display: flex;" dangerouslySetInnerHTML={purpleCrownIcon} />}
                                </div>
                                <div class="canva2025-dropdown-option-description">{option.description}</div>
                              </div>
                              <div class="canva2025-dropdown-option-check-wrapper">
                                {selectedLogoType.value === option.value && (
                                  <svg class="canva2025-dropdown-option-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>

            <div class="canva2025-footer-v2">
              <button 
                class="canva2025-download-btn-v2" 
                onClick$={handleDownload$}
                disabled={isDownloading.value}
              >
                {isDownloading.value ? 'Downloading...' : 'Download'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});