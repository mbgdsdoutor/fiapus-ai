import type { CustomIcon } from './index.types';

export function CloseIcon({ size = 24, color = '#006241' }: CustomIcon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 7L17 17" stroke={color} strokeWidth="1.5" />
      <path d="M17 7L7 17" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
