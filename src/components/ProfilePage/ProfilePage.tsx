import { useAccounts } from '@/hooks/useAccounts';
import { useLoyaltyPass } from '@/hooks/useLoyaltyPass';
import { useOngoingQuests } from '@/hooks/useOngoingQuests';
import { Grid, Stack } from '@mui/material';
import { useMercleNft } from 'src/hooks/useMercleNft';
import { AddressBox } from './AddressBox/AddressBox';
import { TierBox } from './LevelBox/TierBox';
import {
  ProfilePageContainer,
  ProfilePageHeaderBox,
} from './ProfilePage.style';
import { QuestCarousel } from './QuestCarousel/QuestCarousel';
import { QuestCompletedList } from './QuestsCompleted/QuestsCompletedList';
import { Leaderboard } from './Leaderboard/Leaderboard';

export const ProfilePage = () => {
  const { account } = useAccounts();
  const { isLoading, points, tier, pdas } = useLoyaltyPass();
  const { imageLink } = useMercleNft({ userAddress: account?.address });
  const { quests, isQuestLoading } = useOngoingQuests();

  return (
    <ProfilePageContainer className="profile-page">
      <Grid container>
      <Grid xs={12} md={4} sx={{
        paddingRight: { xs: 0, md: 4 },
        paddingBottom: { xs: 4, md: 0 },
      }}>
          <AddressBox
            address={account?.address}
            isEVM={account?.chainType === 'EVM'}
            imageLink={imageLink}
          />
          <Leaderboard address={account?.address} />
      </Grid>
      <Grid xs={12} md={8}>
        <Stack
          spacing={{ xs: 2, sm: 4 }}
        >
          <ProfilePageHeaderBox
            sx={{ display: 'flex', flex: 2, padding: { xs: 0, sm: 3 } }}
          >
            <TierBox points={points} tier={tier} loading={isLoading} />
          </ProfilePageHeaderBox>

          <QuestCarousel quests={quests} loading={isQuestLoading} />
          <QuestCompletedList pdas={pdas} loading={isLoading} />
        </Stack>
      </Grid>
      </Grid>
    </ProfilePageContainer>
  );
};
