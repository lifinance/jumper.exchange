import { CSSObject, Tooltip } from '@mui/material';
import { Tab, TabsContainer } from './Tabs.style';

interface TabProps {
  label?: string;
  tooltip?: string;
  value: number;
  icon: JSX.Element;
  onClick: any;
  disabled?: boolean;
}

interface TabsProps {
  data: TabProps[];
  value: number | boolean;
  onChange?: any;
  ariaLabel: string;
  containerStyles?: CSSObject;
  tabStyles?: CSSObject;
}

export const Tabs = ({
  data,
  value,
  onChange,
  ariaLabel,
  containerStyles,
  tabStyles,
}: TabsProps) => {
  return (
    <TabsContainer
      value={value}
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
            aria-controls={`simple-tabpanel-${index}`}
            sx={tabStyles}
          />
        );
        return !!el.tooltip ? (
          <Tooltip
            title={el.tooltip ?? null}
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
  );
};
