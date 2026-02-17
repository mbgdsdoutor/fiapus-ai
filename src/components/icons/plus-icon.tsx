import type { CustomIcon } from './index.types';

export function PlusIcon({ size = 16, color = '#303030' }: CustomIcon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 8H14" stroke={color} strokeWidth="1.5" />
      <path d="M8 2V14" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
