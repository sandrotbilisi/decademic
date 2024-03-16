const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const ethers = require("ethers");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

app.use(express.json());
app.use(cors());

// In-memory storage for keys
let keysDatabase = {};
let idDatabase = {};
let permissionsArr = {};

const JWT_SECRET = "secter_shhh";

app.post("/generate-key", (req, res) => {
    const { walletAddress, message, signature } = req.body;
  
    try {
      // Verify the signature
      const signerAddress = ethers.verifyMessage(message, signature);
  
      if (signerAddress.toLowerCase() === walletAddress.toLowerCase()) {
        // Generate a one-time key
        const oneTimeKey = ethers.hexlify(ethers.randomBytes(16));
  
        // Store the key with its usage status and associated wallet address
        keysDatabase[oneTimeKey] = { used: false, walletAddress: walletAddress };
  
        // Send the one-time key back to the client
        res.send({ oneTimeKey });
      } else {
        res.status(401).send({ error: "Signature verification failed" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  });

  app.post("/verify-key", (req, res) => {
    const { oneTimeKey } = req.body;
    const keyData = keysDatabase[oneTimeKey];
  
    if (keyData && !keyData.used) {
      keyData.used = true;
  
      // Generate JWT for the wallet address
      const token = jwt.sign(
        { walletAddress: keyData.walletAddress },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({ success: true, walletAddress: keyData.walletAddress, token });
    } else {
      res
        .status(401)
        .json({ success: false, error: "Invalid or already used key." });
    }
  });

  app.post("/verify-token", (req, res) => {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ success: true, walletAddress: decoded.walletAddress });
    } catch (error) {
      res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
  });
  
  app.post("/store-id", (req, res) => {
    const { id, private_key } = req.body;
  
    const encryptedPrivate_Key = bcrypt.hashSync(private_key, 10);
  
    idDatabase[id] = encryptedPrivate_Key;
  
    res.status(200).json({ success: true });
  });

  app.get("/get-stored-values", (req, res) => {
    res.status(200).json({ idDatabase });
  });
  
  
  app.post("/add", async (req, res) => {
    const { org_id, prv_key, data, walletAddress } = req.body;
  
    function processData(data) {
      let processedData = {};
      for (const key in data) {
        if (data[key].hash) {
          // If 'hash' is true, hash the 'name' value
          processedData[key] = ethers.id(data[key].name);
        } else if (typeof data[key] === 'object' && data[key] !== null && 'name' in data[key]) {
          // Directly include 'name' if 'hash' is not true or not present
          processedData[key] = data[key].name;
        } else {
          // Directly include other properties as is
          processedData[key] = data[key];
        }
      }
      return processedData;
    }
  
    function hashData(data) {
      let hashedData = {};
      for (const key in data) {
        if (data[key].hash) {
          hashedData[key] = ethers.id(data[key].name);
        } else {
          hashedData[key] = data[key].name;
        }
      }
      return hashedData;
    }
  
    async function signData(data, privateKey) {
      const wallet = new ethers.Wallet(privateKey);
      const hashedMessage = ethers.id(JSON.stringify(data));
      const byteArrayMessage = Buffer.from(hashedMessage.slice(2), 'hex');
      return wallet.signMessage(byteArrayMessage);
    }
  
    if (permissionsArr[org_id] && permissionsArr[org_id][walletAddress]) {
      if (permissionsArr[org_id][walletAddress].includes("add")) {
        try {
          const processedData = processData(data);
          const signature = await signData(processedData, prv_key);
  
          processedData.signature = signature;
  
          // const proccprocessedData = {
          //   name: hashedData.studentName || "HASH",
          //   category: data.type.name,
          //   signature: signature,
          // };
  
          const w3upClientModule = await import("@web3-storage/w3up-client");
          const create = w3upClientModule.create;
          // Now let's upload the processedData to IPFS
          const client = await create();
          // Here, adapt to your actual login mechanism
          await client.login("sanghouofficial@gmail.com");
          await client.setCurrentSpace("did:key:z6MksjaowzrWPwgaKKZrkKrhgzQxonE4fDiyxu687h3ffeoL");
  
          const files = [
            new File([JSON.stringify(processedData)], "data.json", {
              type: "application/json",
            }),
          ];
          const cid = await client.uploadDirectory(files);
  
          const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
          
          const signer = new ethers.Wallet('82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb', provider);
  
  
          const contract = new ethers.Contract('0x747F3459959f4D98e04d5165ac707Ce3444FA9ad', abi, signer);
  
          const tx = await contract.mintNFC('0xb33796b1a7914E25E533d8bB1e0a9EEDA5709Bf7', 'https://ipfs.io/ipfs/' + cid);
  
          console.log(tx);
  
          console.log(`Uploaded to IPFS with CID: ${cid}`);
  
          res.status(200).json({ success: true, cid: cid, ...processedData });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "Internal server error" });
        }
      } else {
        res.status(401).json({ success: false, error: "Permission denied" });
      }
    } else {
      res.status(401).json({ success: false, error: "Permission denied" });
    }
  });