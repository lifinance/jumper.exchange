import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../ui/app/App'), { ssr: false });

const Page = () => {
  return <App starterVariant="default" />;
};

export default Page;
