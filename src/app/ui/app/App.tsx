'use client';

import { WelcomeScreen } from '@/components/WelcomeScreen/WelcomeScreen';
import { TrackingAction, TrackingCategory } from '@/const/trackingKeys';
import { useWelcomeScreen } from '@/hooks/useWelcomeScreen';
import { useUserTracking } from '@/hooks/userTracking';
import type { StarterVariantType } from '@/types/internal';
import { EventTrackingTool } from '@/types/userTracking';
import { Box } from '@mui/material';
import { StyledSlide } from './App.style';

export interface AppProps {
  starterVariant: StarterVariantType;
  children: React.ReactNode;
  isWelcomeScreenClosed: boolean;
}

const App = ({ starterVariant, isWelcomeScreenClosed, children }: AppProps) => {
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
      {children}
    </Box>
  );
};

export default App;
