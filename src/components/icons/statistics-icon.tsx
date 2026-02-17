import type { CustomIcon } from './index.types';

export function StatisticsIcon({ size = 16, color = '#ed145b' }: CustomIcon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3C3 2.44772 3.44772 2 4 2H8.58579C8.851 2 9.10536 2.10536 9.29289 2.29289L12.7071 5.70711C12.8946 5.89464 13 6.149 13 6.41421V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V3Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 2V5.33333C9 5.70152 9.29848 6 9.66667 6H13"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M6 7L6 12" stroke={color} strokeWidth="1.5" />
      <path d="M8 10L8 12" stroke={color} strokeWidth="1.5" />
      <path d="M10 8L10 12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
