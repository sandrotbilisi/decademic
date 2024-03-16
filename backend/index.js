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
  
  