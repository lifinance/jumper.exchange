'use client';
import { ProfilePage as ProfilePageComponent } from '@/components/ProfilePage';
import { SupportModal } from '@/components/SupportModal/SupportModal';
import { AppProvider } from '@/providers/AppProvider';

const ProfilePage = () => {
  return (
    <AppProvider>
      <ProfilePageComponent />;
      <SupportModal />
    </AppProvider>
  );
};

export default ProfilePage;
