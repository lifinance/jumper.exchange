import dynamic from 'next/dynamic';

const ProfilePageWrapper = dynamic(
  () => import('../../ui/profile/ProfilePage'),
  {
    ssr: true,
  },
);

// `app/ui/learn/page.tsx` is the UI for the `/learn` URL
export default async function Page() {
  return <ProfilePageWrapper />;
}
