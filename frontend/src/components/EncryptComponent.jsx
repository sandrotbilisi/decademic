import React, { useState } from "react";
import { ethers } from "ethers";

const EncryptComponent = () => {
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [error, setError] = useState(null);

  const encryptData = async (data, privateKeyHex) => {
    // use ethers to sign the data
    const wallet = new ethers.Wallet(privateKeyHex);
    console.log(data);
    const encryptedData = await wallet.signMessage(data);
    return encryptedData;
  };

  const handleEncrypt = async () => {
    try {
      const encrypted = await encryptData(
        "hello",
        "82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb"
      );
      console.log("encrypted :>> ", encrypted);
      setEncryptedData(encrypted);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <textarea
        placeholder="Enter data to encrypt"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleEncrypt}>Encrypt Data</button>
      {error && <div>Error: {error}</div>}
      {encryptedData && (
        <div>
          <p>Encrypted Data:</p>
          <p>{encryptedData}</p>
        </div>
      )}
    </div>
  );
};

export default EncryptComponent;
