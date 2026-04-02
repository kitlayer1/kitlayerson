// src/components/editor/Modal/downloadModal.tsx
import { component$, useSignal, $, QRL } from '@builder.io/qwik';
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



  // File Chart SVG ikonu
  const fileChartIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="file-chart-icon">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M8 18v-2"/>
    <path d="M12 18v-4"/>
    <path d="M16 18v-6"/>
  </svg>`;

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
      const modalWidth = 500;
      const modalHeight = 400;
      
      let top = rect.bottom + 10;
      // Align the right edge of the modal with the right edge of the trigger button
      let left = rect.right - modalWidth;
      
      if (left + modalWidth > window.innerWidth) {
        left = window.innerWidth - modalWidth - 10;
      }
      
      if (left < 10) {
        left = 10;
      }
      
      if (top + modalHeight > window.innerHeight) {
        top = rect.top - modalHeight - 10;
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

  // Format seçiminde kontrol işlevi inline olarak kullanılacak

  // İndirme işlemini başlat
  const handleDownload$ = $(async () => {
    console.log("Download started...", { format: selectedFormat.value, isPaid: props.isPaid, includeAll: includeAllFormats.value });
    

    const isColorLogo = selectedLogoType.value === 'color';
    const isJpgFormat = selectedFormat.value === 'jpg';
    const isBusiness = props.planType === 'business';
    const isPremium = props.planType === 'started';

    let isAllowed = false;

    // 1. Business: Her şeye izin var (Tüm logo tipleri, tüm formatlar, ZIP)
    if (isBusiness) {
      isAllowed = true;
    }
    // 2. Premium (Started): Sadece COLOR logosunun tüm formatlarına izin var
    else if (isPremium && isColorLogo && !includeAllFormats.value) {
      isAllowed = true;
    }
    // 3. Free: Sadece COLOR logosunun JPG formatına izin var
    else if (isColorLogo && isJpgFormat && !includeAllFormats.value) {
      isAllowed = true;
    }

    if (!isAllowed) {
      console.log("Paywall triggered: Plan requirements not met", { plan: props.planType, logo: selectedLogoType.value, format: selectedFormat.value });
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
        console.log("Download cancelled by onFormatSelect$");
        return;
      }
    }

    isDownloading.value = true;
    
    try {
      const downloadEverything$ = $(async (formats: string[]) => {
        const MODES = ['color', 'invert', 'black', 'white', 'transparent'];
        for (const mode of MODES) {
          // Temporarily set the mode for generation
          // Note: In a real app, you might want to use a more direct generation approach
          // but here we can just loop through the download functions.
          // We need to pass the mode to each download function.
          if (formats.includes('jpg')) await downloadJpg$(mode);
          if (formats.includes('png')) await downloadPng$(mode);
          if (formats.includes('svg')) await downloadSvg$(mode);
          if (formats.includes('pdf')) await downloadPdf$(mode);
        }
      });

      if (includeAllFormats.value || selectedLogoType.value === 'all') {
        console.log("Downloading bundle...");
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
        console.log(`Downloading ${selectedFormat.value}...`);
        if (selectedFormat.value === 'png') await downloadPng$();
        if (selectedFormat.value === 'jpg') await downloadJpg$();
        if (selectedFormat.value === 'svg') await downloadSvg$();
        if (selectedFormat.value === 'pdf') await downloadPdf$();
        if (selectedFormat.value === 'zip') await downloadZip$();
      }
      
      console.log("Download completed successfully");
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
    { value: 'jpg', label: 'JPG', description: 'Ücretsiz (Color logo için) - İstediğiniz zaman indirebilirsiniz' },
    { value: 'png', label: 'PNG', description: 'Yüksek çözünürlüklü PNG (Premium veya Business paket gereklidir)' },
    { value: 'svg', label: 'SVG', description: 'Vektörel format (Premium veya Business paket gereklidir)' },
    { value: 'pdf', label: 'PDF', description: 'PDF dökümanı (Premium veya Business paket gereklidir)' },
    { value: 'zip', label: 'ZIP (Tümü)', description: 'Tüm formatlar tek dosyada (Sadece Business paketi gereklidir)' }
  ];

  const logoTypeOptions = [
    { value: 'color', label: 'Color', description: 'Logonuzun orijinal renkli versiyonu' },
    { value: 'invert', label: 'Inverted', description: 'Koyu arka planlar için ters renkli versiyon' },
    { value: 'black', label: 'Black', description: 'Siyah beyaz baskılar için düz siyah versiyon' },
    { value: 'white', label: 'White', description: 'Koyu zeminlerde kullanım için düz beyaz versiyon' },
    { value: 'transparent', label: 'Transparent', description: 'Arka plansız şeffaf versiyon' },
    { value: 'all', label: 'All Logos', description: 'Tüm varyasyonları tek seferde paket olarak indir' }
  ];

  // Modal gösterildiğinde pozisyonu hesapla
  if (showModal.value) {
    checkScreenSize$();
    calculatePosition$();
  }


  return (
    <>
      {/* Ana Download Modal */}
      {showModal.value && (
        <div class="canva2025-overlay">
          <div class="canva2025-backdrop" onClick$={handleClose$} />
          <div 
            class={`canva2025-modal ${isMobile.value ? 'canva2025-modal-mobile' : ''}`}
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
              <h2>Download</h2>
              <button class="canva2025-close-btn" onClick$={handleClose$}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <div class="canva2025-content">
              <div class="canva2025-section">
                <label class="canva2025-label">Logo Type</label>
                <div class="canva2025-select-wrapper">
                  <div class={`canva2025-select-trigger ${showLogoTypeModal.value ? 'active' : ''}`} onClick$={() => { showLogoTypeModal.value = !showLogoTypeModal.value; showFormatModal.value = false; }}>
                    <div class="canva2025-selected-value">
                      <span class="canva2025-select-icon" dangerouslySetInnerHTML={fileChartIcon} />
                      <span class="canva2025-select-text">
                         {logoTypeOptions.find(opt => opt.value === selectedLogoType.value)?.label}
                      </span>
                      {selectedLogoType.value === 'color' && <span class="canva2025-badge-free">Free</span>}
                    </div>
                    <svg class={`canva2025-select-arrow ${showLogoTypeModal.value ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {showLogoTypeModal.value && (
                    <>
                      <div class="canva2025-dropdown-backdrop" onClick$={(e) => { e.stopPropagation(); showLogoTypeModal.value = false; }} />
                      <div class="canva2025-dropdown-menu">
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
                              <div class="canva2025-dropdown-option-content">
                                <div class="canva2025-dropdown-option-label">
                                  <span class="canva2025-select-icon" dangerouslySetInnerHTML={fileChartIcon} />
                                  <span class="canva2025-dropdown-option-title">{option.label}</span>
                                  {option.value === 'color' ? (
                                    <span class="canva2025-badge-free">Free</span>
                                  ) : (
                                    <span class="canva2025-badge-business">Business</span>
                                  )}
                                </div>
                                <div class="canva2025-dropdown-option-description">{option.description}</div>
                              </div>
                              {selectedLogoType.value === option.value && (
                                <svg class="canva2025-dropdown-option-check" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div class="canva2025-section">
                <label class="canva2025-label">File Type</label>
                <div class="canva2025-select-wrapper">
                  <div class={`canva2025-select-trigger ${showFormatModal.value ? 'active' : ''}`} onClick$={() => { showFormatModal.value = !showFormatModal.value; showLogoTypeModal.value = false; }}>
                    <div class="canva2025-selected-value">
                      <span class="canva2025-select-icon" dangerouslySetInnerHTML={fileChartIcon} />
                      <span class="canva2025-select-text">
                        {formatOptions.find(opt => opt.value === selectedFormat.value)?.label}
                      </span>
                      {selectedFormat.value === 'jpg' && <span class="canva2025-badge-free">Free</span>}
                    </div>
                    <svg class={`canva2025-select-arrow ${showFormatModal.value ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                  {showFormatModal.value && (
                    <>
                      <div class="canva2025-dropdown-backdrop" onClick$={(e) => { e.stopPropagation(); closeFormatModal$(); }} />
                      <div class="canva2025-dropdown-menu">
                        <div class="canva2025-dropdown-content">
                          {formatOptions.map((option) => {

                            return (
                              <div 
                                key={option.value}
                                class={`canva2025-dropdown-option ${selectedFormat.value === option.value ? 'selected' : ''}`}
                                onClick$={() => {
                                  selectFormat$(option.value);
                                }}
                              >
                                <div class="canva2025-dropdown-option-content">
                                  <div class="canva2025-dropdown-option-label">
                                    <span class="canva2025-select-icon" dangerouslySetInnerHTML={fileChartIcon} />
                                    <span class="canva2025-dropdown-option-title">{option.label}</span>
                                    {option.value === 'jpg' ? (
                                      selectedLogoType.value === 'color' ? (
                                        <span class="canva2025-badge-free">Free</span>
                                      ) : (
                                        <span class="canva2025-badge-business">Business</span>
                                      )
                                    ) : (
                                      // PNG, SVG, PDF, ZIP
                                      option.value === 'zip' || selectedLogoType.value !== 'color' ? (
                                        <span class="canva2025-badge-business">Business</span>
                                      ) : (
                                        <span class="canva2025-badge-premium">Premium</span>
                                      )
                                    )}
                                  </div>
                                  <div class="canva2025-dropdown-option-description">{option.description}</div>
                                </div>
                                {selectedFormat.value === option.value && (
                                  <svg class="canva2025-dropdown-option-check" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                  </svg>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div class="canva2025-section">
                <div class="canva2025-checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    id="all-formats" 
                    class="canva2025-checkbox" 
                    checked={includeAllFormats.value}
                    onChange$={(e) => {
                      const checked = (e.target as HTMLInputElement).checked;
                      // Business plan kontrolü
                      if (checked && props.planType !== 'business') {
                        props.onShowPricing$?.();
                        handleClose$();
                        return;
                      }
                      includeAllFormats.value = checked;
                    }}
                    disabled={props.planType !== 'business'} // Sadece Business plan sahipleri kullanabilir
                  />
                  <label for="all-formats" class="canva2025-checkbox-label">
                    <div class="canva2025-checkbox-texts">
                      <span class="canva2025-checkbox-title">Download all Logo files</span>
                      <span class="canva2025-checkbox-desc">You can download all the logo files at once and use them as you wish.</span>
                    </div>
                    {props.planType !== 'business' && (
                      <span class="canva2025-badge-business">Business</span>
                    )}
                  </label>
                </div>
                
                
              </div>
            </div>

            <div class="canva2025-footer">
              <button 
                class="canva2025-download-btn" 
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