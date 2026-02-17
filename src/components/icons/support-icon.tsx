import type { CustomIcon } from './index.types';

export function SupportIcon({ size = 16, color = '#ed145b' }: CustomIcon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 9L12 9" stroke={color} strokeWidth="1.5" />
      <path
        d="M6 6V12H12L14 14V6H6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.42857V2H2V10L4 8H6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
