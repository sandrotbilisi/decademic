// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTWithIPFS is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    constructor(address initialOwner) ERC721("Certificate", "CRT") Ownable(initialOwner) {
        // Ownable is now initialized with an initialOwner.
    }
    

    function mintNFC(address recipient, string memory metadataURI) public onlyOwner {
        _mint(recipient, nextTokenId);
        _setTokenURI(nextTokenId, metadataURI);
        nextTokenId++;
    }
}
