import { component$ } from '@builder.io/qwik';
import './SelectionSummary.css';

export interface SelectionSummaryProps {
  brandName: string;
  category: string;
  colors: string;
  style: string;
}

export const SelectionSummary = component$((props: SelectionSummaryProps) => {
  return (
    <div class="selection-summary-container">
      <div class="selection-summary-content">
        <div class="summary-items">
          <div class="summary-item">
            <span class="summary-label">Brand Name</span>
            <span class="summary-value">{props.brandName}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Category</span>
            <span class="summary-value">{props.category}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Color</span>
            <span class="summary-value">{props.colors}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Style</span>
            <span class="summary-value">{props.style}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
