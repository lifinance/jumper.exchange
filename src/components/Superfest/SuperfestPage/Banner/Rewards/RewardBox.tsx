import Image from 'next/image';
import { RewardLeftBox } from '../Banner.style';
import { FlexCenterRowBox } from '../../SuperfestMissionPage.style';
import { SoraTypography } from 'src/components/Superfest/Superfest.style';
import { RewardTopBox } from './RewardBox.style';

interface RewardBoxProps {
  logo: string;
  title: string;
  value: string;
}

export const RewardBox = ({ logo, title, value }: RewardBoxProps) => {
  return (
    <RewardTopBox>
      <Image
        src={logo}
        style={{ borderRadius: '100%' }}
        alt="base"
        width="48"
        height="48"
      />
      <RewardLeftBox marginLeft={'20px'}>
        <SoraTypography fontSize={'16px'} fontWeight={700} color={'#525252'}>
          {title}
        </SoraTypography>
        <SoraTypography fontSize={'18px'} fontWeight={800}>
          {value}
        </SoraTypography>
      </RewardLeftBox>
    </RewardTopBox>
  );
};
