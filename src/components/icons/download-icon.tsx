import type { CustomIcon } from './index.types';

export function DownloadIcon({ size = 16, color = '#02B679' }: CustomIcon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5.5L8 9M8 9L4 5.5M8 9L8 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 11.0001V13.0001H1V11.0001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
