import { component$ } from "@builder.io/qwik";
import "./createVisual.css";

interface VisualData {
  title: string;
  paragraphs: string[];
}

interface Props {
  visual: VisualData;
}

export const CreateVisual = component$<Props>(({ visual }) => {
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
