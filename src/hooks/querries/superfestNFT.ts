import { gql } from 'graphql-request';

export const availableNFT = gql`
  mutation claim($campaignID: ID!, $address: String!) {
    prepareParticipate(
      input: {
        signature: "" # provide a test signature
        campaignID: $campaignID # campaign hash id
        address: $address # user address
      }
    ) {
      allow # Is allow user claim nft
      disallowReason # Disallow reason
      signature # Claim signature
      spaceStation # Claim nft contract address
      mintFuncInfo {
        # Claim function args
        cap # Campaign cap, 0 is no cap
        powahs # Reserved field, currently is campaign id
        verifyIDs # Unique id
        nftCoreAddress # NFT contract address
      }
    }
  }
`;
