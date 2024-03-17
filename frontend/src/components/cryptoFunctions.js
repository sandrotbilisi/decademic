import { ethers } from "ethers";

// console.log(ethers.utils.verifyMessage("hello", "0x7b2264617461223a2268656c6c6f227d"));

// console.log(ethers.verifyMessage("hello", "0x7b2264617461223a2268656c6c6f227d"));

export const encryptData = async (data, privateKeyHex) => {
  // use ethers to sign the data
  const wallet = new ethers.Wallet(privateKeyHex);
  console.log(data)
  const encryptedData = await wallet.signMessage(JSON.stringify(data));
  return encryptedData;
};

export const decryptData = async (encryptedData) => {
    try {
        // Convert the encrypted data string to a BytesLike object
        // const bytes = ethers.utils.hexlify(encryptedData);

        Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));

        // Decrypt the data and return it
        
        const decryptedData = await ethers.verifyMessage('hello',encryptedData);
        return decryptedData;
    } catch (error) {
        console.error("Error decrypting data:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};
  