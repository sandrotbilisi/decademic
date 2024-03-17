import React from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './App.css'; // Adjust the path to where your CSS file is located
// import { create } from "@r-storage/w3up-client";


export default function ConnectMetamask() {
  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const message = `hello from Digital Currency!`;
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, account],
        });
        console.log(signature);

        const response = await axios.post(
          "http://localhost:3000/generate-key",
          {
            walletAddress: account,
            message,
            signature,
          }
        );

        const oneTimeKey = response.data.oneTimeKey;
        console.log("One-time key:", oneTimeKey);

        // Show success toast
        toast.success("Account successfully created!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        // Optionally, show error toast
        toast.error("Error connecting to MetaMask!");
      }
    } else {
      console.log("MetaMask is not installed!");
    //   Optionally, show warning toast
      toast.warn("MetaMask is not installed!");
    }
  };
  
  // const addData = async (signedMessage) => {
  //   const client = await create();
  
  //   const myAccount = await client.login("sanghouofficial@gmail.com");
  
  //   const spaces = await client.setCurrentSpace("did:key:z6MksjaowzrWPwgaKKZrkKrhgzQxonE4fDiyxu687h3ffeoL");
  
  //   const files = [new File(["hello"], "readme.md")];
  //   const directoryCid = await client.uploadDirectory(files);
  //   console.log(`Directory CID: ${directoryCid}`);
  // };
  
  return (
    <>
      <IDKitWidget
        app_id="app_staging_4cb2b89ca7eafcca4cd65853a7c406ef" // obtained from the Developer Portal
        onSuccess={connect} // callback when the modal is closed
        // handleVerify={handleVerify} // optional callback when the proof is received
        verification_level={VerificationLevel.Device}
      >
        {({ open }) => <button onClick={open}>Create Decademic Profile</button>}
      </IDKitWidget>
      <ToastContainer />
    </>
  );
}