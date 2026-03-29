import { component$, Slot, type QRL } from '@builder.io/qwik';
import './button.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'black' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
  isLoading?: boolean;
  onClick$?: QRL<() => void>;
  class?: string;
}

export const Button = component$<ButtonProps>((props) => {
  return (
    <button
      type={props.type || 'button'}
      class={[
        'btn',
        `btn--${props.variant || 'primary'}`,
        `btn--${props.size || 'md'}`,
        props.class,
      ]}
      disabled={props.disabled || props.isLoading}
      onClick$={props.onClick$}
    >
      {props.isLoading ? (
        <span class="btn__spinner"></span>
      ) : (
        <Slot />
      )}
    </button>
  );
});
