'use client';
import type { SxProps, Theme } from '@mui/material';
import { Tooltip } from '@mui/material';
import { Tab, TabsContainer } from './Tabs.style';

export interface TabProps {
  label?: string;
  tooltip?: string;
  value: number;
  blur?: boolean;
  icon?: JSX.Element;
  onClick: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
  disabled?: boolean;
}

type Orientation = 'horizontal' | 'vertical';

interface TabsProps {
  data: TabProps[];
  value: number | boolean;
  onChange?: (event: React.SyntheticEvent, value: number) => void;
  orientation?: Orientation;
  ariaLabel: string;
  containerStyles?: SxProps<Theme>;
  tabStyles?: SxProps<Theme>;
}

export const Tabs = ({
  data,
  value,
  onChange,
  orientation,
  ariaLabel,
  containerStyles,
  tabStyles,
}: TabsProps) => {
  return data ? (
    <TabsContainer
      value={value}
      orientation={orientation ?? 'horizontal'}
      onChange={onChange}
      aria-label={ariaLabel}
      sx={containerStyles}
    >
      {data.map((el, index) => {
        const tab = (
          <Tab
            key={`${el.label ?? 'tab-key'}-${index}`}
            onClick={(event) => {
              el.onClick(event, el.value);
            }}
            icon={el.icon}
            label={el.label}
            id={`tab-${el.label ?? 'key'}-${el.value}`}
            aria-label={el.label}
            aria-controls={`simple-tabpanel-${index}`}
            sx={tabStyles}
            blur={el.blur}
          />
        );
        return !!el.tooltip ? (
          <Tooltip
            title={el.tooltip}
            key={`tooltip-${el.label}-${index}`}
            enterTouchDelay={0}
            disableHoverListener={el.disabled}
            componentsProps={{
              popper: { sx: { zIndex: 1700 } },
            }}
            arrow
          >
            {tab}
          </Tooltip>
        ) : (
          tab
        );
      })}
    </TabsContainer>
  ) : null;
};
