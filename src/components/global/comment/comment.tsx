import { useStyles$ } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';
import style0 from "./comment.css?inline";

export interface CommentItem {
  text: string;
  name: string;
  title: string;
  image: string;
  color: string;
}

interface CommentSectionProps {
  title?: string;
  description?: string;
  comments: CommentItem[];
}

export default component$<CommentSectionProps>(
  ({ title, description, comments }) => {
  useStyles$(style0);

    return (
      <section class="comment-section">
         <div class="comment-header">
        <h2>
          {title || (
            <>
              SEE WHAT REAL USERS SAY ABOUT THEIR LOGO DESIGN EXPERIENCE
            </>
          )}
        </h2>
        {description && <p class="comment-description">{description}</p>}
      </div>

        <div class="comment-grid">
          {comments.map((item, index) => (
            <div
              key={index}
              class="comment-card"
              style={{ color: item.color }}
            >
              <p class="comment-text">{item.text}</p>

              <div class="comment-footer">
                <img
                  src={item.image}
                  alt={item.name}
                  class="comment-avatar"
                  width="48"
                  height="48"
                />
                <div>
                  <p class="comment-name">{item.name}</p>
                  <p class="comment-title">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
);