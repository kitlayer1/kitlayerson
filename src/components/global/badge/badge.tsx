import { component$, Slot } from '@builder.io/qwik';
import './badge.css';

interface BadgeProps {
  variant?: 'default' | 'product' | 'plan';
  hasDot?: boolean;
  class?: string;
}

export const Badge = component$<BadgeProps>(({ variant = 'default', hasDot = true, class: className }) => {
  return (
    <div class={['badge', `badge--${variant}`, className]}>
      {hasDot && <span class="badge__dot"></span>}
      <Slot />
    </div>
  );
});
