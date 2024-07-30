import { metaMaskFixtures, testWithSynpress } from '@synthetixio/synpress';
import connectedSetup from '../jumper-exchange/tests/wallet-setup/connected.setup';

export default testWithSynpress(metaMaskFixtures(connectedSetup));