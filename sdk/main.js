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


  async addCertificate(data) {
    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org_id: data.org_id,
        prv_key: data.prv_key,
        data: data.data,
        walletAddress: data.walletAddress,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data : ", data);
      });
  }

  async checkPermissions(walletAddress, orgId, permission) {
    try {
      const response = await fetch("http://localhost:3000/check-permission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: walletAddress,
          org_id: orgId, // Ensure the property names match the backend's expectations
          permission: permission,
        }),
      });

      if (!response.ok) {
        // If the server responds with a status code outside the 200 range, handle it as an error
        const errorInfo = await response.json();
        throw new Error(errorInfo.error || "Request failed");
      }

      // If the request was successful, you can process the response further here
      const result = await response.json();
      console.log(result); // For debugging purposes or further processing
      return result;
    } catch (error) {
      console.error("Error checking permissions:", error);
      throw error; // Re-throw to let calling functions handle it
    }
  }

  async approveCertificate(data) {
    const signature = data.signature;

    delete data.signature;

    const recoveredAddress = await this.verifyData(
      data,
      signature,
      "0x63e6d778D938AC65882425cB05FB9A8BC76bA7FA"
    );

    

    console.log(recoveredAddress);
    // Rest of the code...
  }
}
