import { component$, useStyles$ } from '@builder.io/qwik';
import style0 from "./createVisual.css?inline";

interface VisualData {
  title: string;
  paragraphs: string[];
}

interface Props {
  visual: VisualData;
}

export const CreateVisual = component$<Props>(({ visual }) => {
  useStyles$(style0);

  return (
    <section class="create-visual">
      <div class="create-visual-container">
        <h2 class="create-visual-title">{visual.title}</h2>
        <div class="create-visual-content">
          {visual.paragraphs.map((paragraph, index) => (
            <p key={index} class="create-visual-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
});
