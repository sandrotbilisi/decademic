import { ethers } from "ethers";
import nftWithIPFS from "./build/NFTWithIPFS.json" assert { type: "json" };
const { generateKeyPair } = require("crypto");

const { abi } = nftWithIPFS;

import { ethers } from "ethers";
import nftWithIPFS from "./build/NFTWithIPFS.json" assert { type: "json" };
const { generateKeyPair } = require("crypto");

// console.log(abi);

class DAVS {
  constructor(chain) {
    this.contract = null;
    this.provider = null;

    if (chain == "arbitrum") {
      const provider = new ethers.JsonRpcProvider(
        "https://sepolia-rollup.arbitrum.io/rpc"
      );

      const signer = new ethers.Wallet(
        "82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb",
        provider
      );

      const contract = new ethers.Contract(
        "0x49677038398038f51Ee4cb33214e6A5a6eE60023",
        abi,
        signer
      );

      this.contract = contract;
      this.provider = provider;
    } else if (chain == "optimism") {
      const provider = new ethers.JsonRpcProvider(
        "https://optimism-sepolia-rpc-url"
      );
    }
  }

  async getProfile(profileId) {
    // console.log('came heere')
    const getNFTsOwnedByAddress = async (contractAddress, ownerAddress) => {
      const nftContract = this.contract;
      const balance = await nftContract.balanceOf(ownerAddress);

      //   console.log(balance)

      //   console.log(Number(balance))
      let tokenIds = [];

      for (let i = 0; i < Number(balance); i++) {
        // Assuming balance is a BigNumber, calling toNumber() for iteration
        // console.log(i, ownerAddress)
        // console.log(nftContract)
        let tokenId = await nftContract.tokenOfOwnerByIndex(ownerAddress, i);

        let tokenURI = await nftContract.tokenURI(tokenId);

        console.log(tokenURI);

        tokenIds.push(tokenId.toString());
      }

      return tokenIds;
    };

    return getNFTsOwnedByAddress(
      this.contract.address,
      "0xb33796b1a7914E25E533d8bB1e0a9EEDA5709Bf7"
    );
  }
}
