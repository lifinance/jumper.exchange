import type { Breakpoint, Theme } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  theme: Theme;
}

const JumperLogo = ({ theme }: Props) => {
  const mainCol =
    theme.palette.mode === 'light'
      ? theme.palette.accent1.main
      : theme.palette.accent1Alt.main;
  const subCol = theme.palette.accent2.main;

  return (
    <svg
      width={154}
      height={32}
      viewBox="0 0 154 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_4369_26046)">
        <path
          d="M21.6578 15.9999L10.344 27.3136L13.1724 30.142C14.5866 31.5562 17.415 31.5563 18.8292 30.1421L30.1429 18.8284C31.5571 17.4142 31.5573 14.5856 30.1429 13.1715L24.4862 7.5146L18.8294 13.1715L21.6578 15.9999Z"
          fill={mainCol}
        />
        <path
          d="M10.3438 4.68628L13.1722 1.85785C14.5864 0.443639 17.4148 0.443639 18.829 1.85785L21.6575 4.68628L16.0006 10.3431L10.3438 4.68628Z"
          fill={subCol}
        />
      </g>
      <path
        d="M138 17.9999L142 17.9999V11.9999L154 11.9999V9.99988C154 8.99988 153 7.99988 152 7.99988H140C139 7.99988 138 8.99988 138 9.99988V17.9999Z"
        fill={mainCol}
      />
      <path
        d="M142 23.9999H140C139 23.9999 138 22.9999 138 21.9999V19.9999L142 19.9999L142 23.9999Z"
        fill={subCol}
      />
      <path
        d="M123 19.9999V17.3332H133V14.6665L123 14.6665L123 11.9999L135 11.9999V9.99988C135 8.99988 134 7.99988 133 7.99988H121C120 7.99988 119 8.99988 119 9.99988V21.9999C119 22.9999 120 23.9999 121 23.9999H133C134 23.9999 135 22.9999 135 21.9999V19.9999H123Z"
        fill={mainCol}
      />
      <path
        d="M101 19.9999H105V23.9999H103C102 23.9999 101 22.9999 101 21.9999V19.9999Z"
        fill={mainCol}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103 7.99988C102 7.99988 101 8.99988 101 9.99988V19.9999H111C115 19.9999 117 16.9999 117 13.9999C117 10.9999 115 7.99988 111 7.99988H103ZM111 11.9999H105V15.9999H111C112.5 15.9999 113 14.7363 113 13.9999C113 13.2635 112.5 11.9999 111 11.9999Z"
        fill={mainCol}
      />
      <path
        d="M98 9.99988C98 8.99988 97 7.99988 96 7.99988H84C83 7.99988 82 8.99988 82 9.99988V21.9999C82 22.9999 83 23.9999 84 23.9999H86L86 11.9999L88.5 11.9999V23.9999H91.5V11.9999H94L94 23.9999H96C97 23.9999 98 22.9999 98 21.9999C98 20.9999 98 9.99988 98 9.99988Z"
        fill={mainCol}
      />
      <path
        d="M63 9.99988C63 8.99988 63.9998 7.99988 64.9998 8.00049H67V20.0005H75V8.00049L76.9998 8.00049C77.9998 8.00049 79 8.99988 79 9.99988V21.9999C79 22.9999 77.9998 24.0005 76.9998 24.0005H64.9998C63.9998 24.0005 63 22.9999 63 21.9999V9.99988Z"
        fill={mainCol}
      />
      <path
        d="M56.0039 8.00049H57.9999C58.9999 8.00049 59.9999 8.99988 59.9999 9.99988L60.0039 12.0005H56.0039V8.00049Z"
        fill={subCol}
      />
      <path
        d="M60.004 13.9999H56.004V20.0004H44.004L44 21.9999C44 22.9999 45 24.0004 46 24.0004H58C59 24.0004 60.004 22.9999 60 21.9999L60.004 13.9999Z"
        fill={mainCol}
      />
      <defs>
        <clipPath id="clip0_4369_26046">
          <rect width={32} height={32} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const JumperIcon = ({ theme }: Props) => {
  const mainCol =
    theme.palette.mode === 'light'
      ? theme.palette.accent1.main
      : theme.palette.accent1Alt.main;

  const subCol = theme.palette.accent2.main;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill={mainCol}
        d="M17.655 16 6.341 27.314l2.829 2.828c1.414 1.414 4.242 1.414 5.656 0L26.14 18.828c1.414-1.414 1.414-4.242 0-5.656l-5.657-5.657-5.656 5.657L17.655 16Z"
      />
      <path
        fill={subCol}
        d="M6.341 4.686 9.17 1.858c1.414-1.414 4.242-1.414 5.657 0l2.828 2.828-5.657 5.657-5.657-5.657Z"
      />
    </svg>
  );
};

type BrandLogoProps = {
  isConnected: boolean;
  theme: Theme;
};

export const BrandLogo = ({ isConnected, theme }: BrandLogoProps) => {
  const isTablet = useMediaQuery(theme.breakpoints.up('sm' as Breakpoint));

  return !isTablet || (!isTablet && isConnected) ? (
    <JumperIcon theme={theme} />
  ) : (
    <JumperLogo theme={theme} />
  );
};
