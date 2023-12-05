import { useMediaQuery } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/material/styles';
import { useNavbarTabs } from '../../const/useNavbarTabs';
import { useActiveTabStore } from '../../stores';
import { Tabs } from '../Tabs';

export const NavbarTabs = () => {
  const theme = useTheme();
  const { activeTab, setActiveTab } = useActiveTabStore();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md' as Breakpoint));
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const navbarTabs = useNavbarTabs();

  const containerStyles = {
    display: 'none',
    minWidth: 392,
    borderRadius: 28,
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
    div: {
      height: '56px',
    },
    '.MuiTabs-indicator': {
      height: '48px',
      zIndex: '-1',
      borderRadius: '24px',
    },
  };

  const tabStyles = {
    height: '48px',
    width: '142px',
    borderRadius: '24px',
  };

  return (
    <Tabs
      data={navbarTabs}
      value={isDesktop ? activeTab : false}
      onChange={handleChange}
      ariaLabel="navbar-tabs"
      containerStyles={containerStyles}
      tabStyles={tabStyles}
    />
  );
};
