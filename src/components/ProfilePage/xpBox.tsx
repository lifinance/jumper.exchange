import { useTheme } from '@mui/material';

// XPBox
export const XPBox = ({ size }: any) => {
  const theme = useTheme();

  return theme.palette.mode === 'light' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? '32'}
      height={size ?? '32'}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g clipPath="url(#a)">
        <circle cx="16" cy="16" r="16" fill="#F9F5FF" />
        <path
          fill="#31007A"
          d="M6.374 11.374a1.25 1.25 0 0 0 0 1.768l2.872 2.872-2.872 2.872a1.25 1.25 0 0 0 1.768 1.767l2.872-2.872 2.872 2.872a1.25 1.25 0 0 0 1.767-1.767l-2.872-2.872 2.872-2.872a1.25 1.25 0 0 0-1.767-1.768l-2.872 2.872-2.872-2.872a1.25 1.25 0 0 0-1.768 0ZM18 18.5h2.5V21h-1.25c-.625 0-1.25-.625-1.25-1.25V18.5Z"
        />
        <path
          fill="#31007A"
          fillRule="evenodd"
          d="M19.25 11c-.625 0-1.25.625-1.25 1.25v6.25h6.25c2.5 0 3.75-1.875 3.75-3.75S26.75 11 24.25 11h-5Zm5 2.5H20.5V16h3.75c.938 0 1.25-.79 1.25-1.25 0-.46-.313-1.25-1.25-1.25Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? '32'}
      height={size ?? '32'}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g clipPath="url(#a)">
        <circle cx="16" cy="16" r="16" fill="#BEA0EB" />
        <path
          fill="#360A7A"
          d="M6.374 11.374a1.25 1.25 0 0 0 0 1.768l2.872 2.872-2.872 2.872a1.25 1.25 0 0 0 1.768 1.767l2.872-2.872 2.872 2.872a1.25 1.25 0 0 0 1.767-1.767l-2.872-2.872 2.872-2.872a1.25 1.25 0 0 0-1.767-1.768l-2.872 2.872-2.872-2.872a1.25 1.25 0 0 0-1.768 0ZM18 18.5h2.5V21h-1.25c-.625 0-1.25-.625-1.25-1.25V18.5Z"
        />
        <path
          fill="#360A7A"
          fillRule="evenodd"
          d="M19.25 11c-.625 0-1.25.625-1.25 1.25v6.25h6.25c2.5 0 3.75-1.875 3.75-3.75S26.75 11 24.25 11h-5Zm5 2.5H20.5V16h3.75c.938 0 1.25-.79 1.25-1.25 0-.46-.313-1.25-1.25-1.25Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
