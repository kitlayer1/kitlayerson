import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './globalSelect.css?inline';

export interface GlobalSelectProps {
  features?: string[];
  backgroundColor?: string;
  textColor?: string;
}

export const GlobalSelect = component$<GlobalSelectProps>(({
  features = [
    "NO DESIGN SKILLS NEEDED",
    "READY IN 60 SECONDS",
    "PROFESSIONAL QUALITY",
    "DOWNLOAD & USE ANYWHERE",
    "NO CREDIT CARD REQUIRED",
    "FULLY CUSTOMIZABLE",
    "FULLY CUSTOMIZABLE",
  ],
  backgroundColor,
  textColor
}) => {
  useStylesScoped$(styles);

  const BadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  );

  return (
    <div 
      class="global-select-container"
      style={[
        backgroundColor ? `background-color: ${backgroundColor}` : '',
        textColor ? `--text-color: ${textColor}` : ''
      ].filter(Boolean).join(';')}
    >
      <div class="global-select-content">
        {features.map((feature, index) => (
          <div class="global-select-item" key={index}>
            <BadgeIcon />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
