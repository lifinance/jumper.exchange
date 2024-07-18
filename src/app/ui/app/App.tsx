'use client';

import { usePathname } from 'next/navigation';
import { WelcomeScreen } from '@/components/WelcomeScreen/WelcomeScreen';
import type { StarterVariantType } from '@/types/internal';
import { WidgetContainer } from '@/components/Widgets';
import { TrackingAction, TrackingCategory } from '@/const/trackingKeys';
import { EventTrackingTool } from '@/types/userTracking';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useUserTracking } from '@/hooks/userTracking';
import { Box, Stack } from '@mui/material';
import { StyledSlide } from './App.style';
import { JUMPER_LEARN_PATH, JUMPER_LOYALTY_PATH } from 'src/const/urls';
import { usePartnerTheme } from 'src/hooks/usePartnerTheme';
import { useSuperfest } from 'src/hooks/useSuperfest';
import { VerticalTabs } from 'src/components/Menus/VerticalMenu';

export interface AppProps {
  starterVariant: StarterVariantType;
  children: React.ReactNode;
  isWelcomeScreenClosed: boolean;
}

const App = ({ starterVariant, isWelcomeScreenClosed, children }: AppProps) => {
  const pathname = usePathname();

  const { trackEvent } = useUserTracking();

  const welcomeScreen = useWelcomeScreen(isWelcomeScreenClosed);

  const handleWelcomeScreenEnter = () => {
    if (!welcomeScreen.welcomeScreenClosed) {
      welcomeScreen.setWelcomeScreenClosed(true);

      trackEvent({
        category: TrackingCategory.WelcomeScreen,
        action: TrackingAction.CloseWelcomeScreen,
        label: 'enter_welcome_screen_on_widget-click',
        data: { widgetVariant: starterVariant },
        disableTrackingTool: [
          EventTrackingTool.ARCx,
          EventTrackingTool.Cookie3,
        ],
        enableAddressable: true,
      });
    }
  };

  const isLearnPage = pathname?.includes(JUMPER_LEARN_PATH);
  const isLoyaltyPage = pathname?.includes(JUMPER_LOYALTY_PATH);
  const { hasTheme } = usePartnerTheme();
  const { isSuperfest } = useSuperfest();

  return (
    <Box onClick={handleWelcomeScreenEnter}>
      <StyledSlide
        direction="up"
        in={!welcomeScreen.welcomeScreenClosed}
        appear={false}
        timeout={400}
        className="welcome-screen-container"
        mountOnEnter
        unmountOnExit
      >
        <Box
          style={{
            zIndex: 1000,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <WelcomeScreen closed={welcomeScreen.welcomeScreenClosed!} />
        </Box>
      </StyledSlide>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="start"
        spacing={4}
        paddingTop={3.5}
        useFlexGap
      >
        {!isLearnPage && !hasTheme ? (
          <VerticalTabs verticalPageReload={isLoyaltyPage || isSuperfest} />
        ) : null}
        <WidgetContainer
          welcomeScreenClosed={welcomeScreen.welcomeScreenClosed!}
          className="widget-container"
        >
          {children}
        </WidgetContainer>
      </Stack>
    </Box>
  );
};

export default App;
