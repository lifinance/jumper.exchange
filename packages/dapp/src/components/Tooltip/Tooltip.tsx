import { Tooltip as MUITooltip } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
interface TooltipProps {
  title?: string;
  children: ReactNode;
  disableHoverListener?: boolean | undefined;
}

export const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
  title,
  children,
  disableHoverListener,
}: TooltipProps) => {
  return !!title ? (
    <MUITooltip
      title={title}
      enterTouchDelay={0}
      disableHoverListener={disableHoverListener}
      arrow
    >
      <>{children}</>
    </MUITooltip>
  ) : (
    <>{children}</>
  );
};
