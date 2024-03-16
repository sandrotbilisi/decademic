import React, { useState } from 'react';
import { ethers } from "ethers";

const DecryptComponent = () => {
  const [encryptedData, setEncryptedData] = useState('');
  const [iv, setIv] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [error, setError] = useState(null);

  const decryptData = async (encryptedData) => {
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
  }

  const handleDecrypt = async () => {
    try {
        console.log(encryptedData)
      const decrypted = await decryptData(encryptedData);
      setDecryptedData(decrypted);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        placeholder="Enter IV"
        value={iv}
        onChange={(e) => setIv(e.target.value)}
      />
      <textarea
        placeholder="Enter encrypted data"
        value={encryptedData}
        onChange={(e) => setEncryptedData(e.target.value)}
      />
      <button onClick={handleDecrypt}>Decrypt Data</button>
      {error && <div>Error: {error}</div>}
      {decryptedData && (
        <div>
          <p>Decrypted Data:</p>
          <p>{decryptedData}</p>
        </div>
      )}
    </div>
  );
};

export default DecryptComponent;
