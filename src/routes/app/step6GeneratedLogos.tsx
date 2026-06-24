import { useStyles$ } from '@builder.io/qwik';
import { component$, useStore, $, type QRL } from '@builder.io/qwik';
import { allFavicons } from './allFavicons';
import { allFonts } from './allFonts';
import { colorOptionById } from './colorOption';
import { getLogoIndices } from './logoUtils';
import style0 from "./step6GeneratedLogos.css?inline";

export const Step6GeneratedLogos = component$((props: {
  brandName: string;
  selectedStyleIds: number[];
  colors: number[];
  selectedCategory: string;
  selectedFontStyleId: number;
  onSelect$: QRL<(index: number) => void>;
}) => {
  useStyles$(style0);

  const state = useStore({
    visibleCount: 12,
  });

  const usableFavicons = allFavicons.filter(f =>
  f.category === props.selectedCategory &&
  props.selectedStyleIds.includes(f.styleId)
);

  const usableFonts = allFonts.filter(
    f => f.styleId === props.selectedFontStyleId
  );

  const loadMore = $(() => {
    state.visibleCount += 12;
  });

  const handleSelect = $((i: number) => {
    props.onSelect$(i);
  });

  return (
    <div class="step6">
      <div class="step6-content">
     

        <div class="step6-header">
          <div class="step6-text">
            <h2>Your Logo Ideas Are Ready to Explore</h2>
            <p class="step6-description">
               Based on your selections, we’ve generated unique logo concepts tailored to your brand.
            </p>
          </div>
        </div>

        <div class="step6-options">
          {Array.from({ length: Math.min(state.visibleCount, 1000) }).map((_, i) => {
            const { fIndexHash, fontIndexHash, cIndexHash, pIndexHash } = getLogoIndices(i, props.brandName);

            const f = usableFavicons[fIndexHash % usableFavicons.length];

            const font =
              usableFonts.length > 0
                ? usableFonts[fontIndexHash % usableFonts.length].fontFamily
                : 'sans-serif';

            const selectedId = props.colors[cIndexHash % props.colors.length];
            const option = colorOptionById[selectedId];

            const palettes =
              option?.palettes || [
                { background: '#f9f9f9', text: '#222' },
              ];

            const palette = palettes[pIndexHash % palettes.length];

            return (
              <div
                key={i}
                class="step6-logo-item"
                style={{
                  backgroundColor: palette.background,
                  fontFamily: font,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  minHeight: '240px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onClick$={() => handleSelect(i)}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  opacity: 0.04,
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  color: palette.text,
                  transform: 'rotate(-30deg)',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  zIndex: 10,
                  fontFamily: 'sans-serif'
                }}>kitlayer</div>
                <div
                  style={{
                    width: '105px',
                    height: '105px',
                    marginBottom: '1.6rem',
                    backgroundColor: palette.icon || palette.text,
                    WebkitMaskImage: `url(${f.iconPath})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskImage: `url(${f.iconPath})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                  }}
                />
                <span
                  style={{
                    fontSize: '3rem',
                    color: palette.text,
                  }}
                >
                  {props.brandName}
                </span>
              </div>
            );
          })}
        </div>

        {state.visibleCount < 1000 && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button class="step6-more-button" onClick$={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
