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

