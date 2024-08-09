import { Box } from '@mui/material';
import {
  RewardsCarouselContainer,
  RewardsCarouselMainBox,
  ClaimButtonBox,
  EarnedTypography,
  RewardsOpenIconButton,
} from './RewardsCarousel.style';
import { RewardsAmountBox } from './RewardsAmountBox/RewardsAmountBox';
import { Button } from 'src/components/Button';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from 'wagmi';
import { ChainId } from '@lifi/types';
import { MerklDistribABI } from '../../../const/abi/merklABI';
import { SoraTypography } from '../LandingPage/LandingPage.style';
import { FlexCenterRowBox } from '../MissionPage/MissionPage.style';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface RewardsCarouselProps {
  hideComponent: boolean;
  rewardAmount: number;
  accumulatedAmountForContractBN: string;
  isMerklSuccess: boolean;
  proof: string[];
}

const CLAIMING_CONTRACT_ADDRESS = '0x3Ef3D8bA38EBe18DB133cEc108f4D14CE00Dd9Ae';
const OP_TOKEN = '0x4200000000000000000000000000000000000042';
//TESTING
// const TEST_TOKEN = '0x41A65AAE5d1C8437288d5a29B4D049897572758E';

export const RewardsCarousel = ({
  hideComponent,
  rewardAmount,
  accumulatedAmountForContractBN,
  isMerklSuccess,
  proof,
}: RewardsCarouselProps) => {
  const { address } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function handleClick() {
    try {
      const { id } = await switchChainAsync({
        chainId: ChainId.OPT,
      });

      const canClaim =
        id === ChainId.OPT &&
        address &&
        isMerklSuccess &&
        proof &&
        rewardAmount > 0;

      if (canClaim) {
        writeContract({
          address: CLAIMING_CONTRACT_ADDRESS,
          abi: MerklDistribABI,
          functionName: 'claim',
          // args: [[address], [OP_TOKEN], [rewardAmountBN], [proof]], //   function claim(address[] calldata users, address[] calldata tokens, uint256[] calldata amounts, bytes32[][] calldata proofs)
          // TESTING
          args: [
            [address],
            [OP_TOKEN],
            [accumulatedAmountForContractBN],
            [proof],
          ], //   function claim(address[] calldata users, address[] calldata tokens, uint256[] calldata amounts, bytes32[][] calldata proofs)
          // TESTING
          // args: [
          //   [address],
          //   [TEST_TOKEN],
          //   [accumulatedAmountForContractBN],
          //   [proof],
          // ], //   function claim(address[] calldata users, address[] calldata tokens, uint256[] calldata amounts, bytes32[][] calldata proofs)
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!hideComponent && rewardAmount && rewardAmount > 0 ? (
        <RewardsCarouselContainer>
          <RewardsCarouselMainBox>
            <FlexCenterRowBox>
              <Box>
                <EarnedTypography>You've earned:</EarnedTypography>
              </Box>
              <RewardsAmountBox
                rewardAmount={rewardAmount}
                isConfirmed={isConfirmed}
              />
            </FlexCenterRowBox>
            <ClaimButtonBox>
              <Button
                disabled={isPending || isConfirming || isConfirmed}
                variant="primary"
                size="large"
                styles={{
                  alignItems: 'center',
                  padding: '16px',
                  width: '100%',
                }}
                onClick={() => handleClick()}
              >
                <SoraTypography
                  fontSize="16px"
                  lineHeight="18px"
                  fontWeight={600}
                >
                  {isPending || isConfirming
                    ? 'CLAIMING...'
                    : isConfirmed
                      ? 'CLAIMED'
                      : 'CLAIM REWARDS'}
                </SoraTypography>
              </Button>
            </ClaimButtonBox>
            {hash ? (
              <a
                href={`https://optimistic.etherscan.io/tx/${hash}`}
                target="_blank"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  marginLeft: '32px',
                }}
                rel="noreferrer"
              >
                <RewardsOpenIconButton>
                  <OpenInNewIcon sx={{ height: '32px' }} />
                </RewardsOpenIconButton>
              </a>
            ) : undefined}
          </RewardsCarouselMainBox>
        </RewardsCarouselContainer>
      ) : undefined}
    </>
  );
};
