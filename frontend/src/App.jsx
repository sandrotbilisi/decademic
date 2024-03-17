// App.js

import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectDecademicButton from "./components/connectDecademic";
import ConnectMetamaskButton from "./components/connectMetamask";
import BusinessIdGenerator from "./components/getBusinessId";
import AddCertificateButton from "./components/addCertificateButton";
import RequestPermissionButton from "./components/requestPermissionButton";
import "./App.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import SubscriptionPlans from "./components/SubscriptionPlans/subscriptions";
import EncryptComponent from "./components/EncryptComponent";
import DecryptComponent from "./components/DecryptComponent";
import Navbar from "./components/Navbar";
import SuperfluidManager from "./components/SuperfluidManager";
import Home from "./components/Home";

// Creating and exporting the context
export const decademicLoggedInContext = createContext(false);

function App() {
  const [decademicLoggedIn, setDecademicLoggedIn] = useState(false);

  const [count, setCount] = useState(0);
  const [sf, setSf] = useState(null);
  const sender = "0xSenderAddressHere";
  const recipient = "0xRecipientAddressHere";
  const monthlyAmount = 1000; // Example monthly amount to stream

  return (
    <>
      <decademicLoggedInContext.Provider
        value={{ decademicLoggedIn, setDecademicLoggedIn }}
      >
        <Router>
          <div>
            <Navbar />
            <AddCertificateButton />
            <RequestPermissionButton />
            
            {/* <SuperfluidManager />

            <BusinessIdGenerator />
            <br />
            <br />


            <br />

            <EncryptComponent />
            <DecryptComponent /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business" element={<SubscriptionPlans />} />
            </Routes>
            
          </div>
        </Router>
      </decademicLoggedInContext.Provider>
    </>
  );
}

export default App;
