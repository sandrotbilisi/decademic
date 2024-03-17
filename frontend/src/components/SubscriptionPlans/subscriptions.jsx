import React, { useState, useEffect, useContext } from "react";
import "./SubscriptionPlans.css"; // Make sure to create this CSS file
import CreateFlowForm from "../CreateFlowForm";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import axios from "axios";
import { decademicLoggedInContext } from "../../App";

const SubscriptionPlans = () => {
  const { decademicLoggedIn, setDecademicLoggedIn } = useContext(
    decademicLoggedInContext
  );

  const [generatedId, setGeneratedId] = useState("idfmsf");
  const [subscription, setSubscription] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: "$10/month",
      certificates: "100 certificates",
      verifications: "1,000 verification checks",
      description: "Ideal for individual educators and freelancers.",
    },
    {
      name: "Professional",
      price: "$50/month",
      certificates: "750 certificates",
      verifications: "5,000 verification checks",
      description:
        "Perfect for growing educational institutions and small teams.",
    },
    {
      name: "Enterprise",
      price: "Contact us",
      certificates: "Unlimited certificates",
      verifications: "Unlimited verification checks",
      description: "Custom solutions for large organizations and universities.",
    },
  ];
  const [sff, setSff] = useState(null);
  const [providers, setProvider] = useState(null);

  const [privateKey, setPrivateKey] = useState('');
  const [businessId, setBusinessId] = useState('');

  const handlePrivateKeyChange = (event) => {
      setPrivateKey(event.target.value);
  };

  const generateBusinessId = () => {
      // Generate a random ID
      const randomId = 'RNDM_ID_' + Math.random().toString(36).substr(2, 16).toUpperCase();
      setBusinessId(randomId);

      // Here you would send the private key to your server for processing
      // NEVER expose your private key in client-side code
      console.log('Send this private key to the server securely:', privateKey);
      fetch('http://localhost:3000/store-id', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: randomId, private_key: privateKey }),
      })
          .then((response) => response.json())
          .then((data) => {
              if (data.success) {
                  console.log('ID stored successfully');
              } else {
                  console.error('Error storing ID:', data.error);
              }
          })
          .catch((error) => {
              console.error('Error storing ID:', error);
          });
      // Reset the private key
      setPrivateKey('');
  };


  useEffect(() => {
    console.log('cameeee')
    const initializeSuperfluid = async () => {
      console.log('shevida')
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('aqaris')

      const sfInstance = await Framework.create({
        chainId: 42161,
        provider: provider,
      });
      console.log('fds')
      console.log(sfInstance)
      setSff(sfInstance);
      console.log('sf   ', sff)

      setProvider(provider);
    };

    initializeSuperfluid();
  }, []);

  const addSubscriptionToDB = async () => {
    // Add subscription to database
    console.log("Adding subscription to database...");

    const response = await axios.post("http://localhost:3000/addSubscription", {
      subscription: "Starter",
      // get wallet address from metamask
    });
  };

  const createFlow = async (
    superTokenAddress,
    senderAddress,
    receiverAddress,
    flowRate
  ) => {

    try {
      console.log(sff);
      // await sf.initialize();
      // const signer = sf.createSigner({
      //     privateKey: "82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb",
      //     provider: providers,
      // });

      // console.log(signer)

      // request metamaks to connect

      const createFlowOperation = sff.cfaV1.createFlow({
        sender: '0x962dA48fEF1184492C91cf9f2Ae48307C1f81Cda',
        receiver: '0xa6365428ce9a7becac3d36ffe52a8ced6f268d42',
        flowRate: 4000000000,
        superToken: "0xe6C8d111337D0052b9D88BF5d7D55B7f8385ACd3",
        providerOrSigner: providers,
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Request Metamask to connect
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();

      console.log("Creating flow...");
      const txnResponse = await createFlowOperation.exec(signer);
      const txnReceipt = await txnResponse.wait();

      generateBusinessId();

      

      // addSubscriptionToDB();

      console.log("Flow created. Transaction: ", txnReceipt.transactionHash);

      setDecademicLoggedIn(true);
      setSubscription(true)
      

      //ask for metamask to sign the transaction

      // const signer = providers.getSigner();

      // console.log("Creating flow...");
      // const txnResponse = await createFlowOperation.exec(signer);
      // const txnReceipt = await txnResponse.wait();
      // console.log("Flow created. Transaction: ", txnReceipt.transactionHash);
    } catch (error) {
      console.error("Failed to create the flow:", error);
    }
  };

  return (
    <>
      {!subscription ? (
         <>
         <br />
         <h1 className="text-center mb-10 mt-10">Subscription Plans</h1>
         <p className="text-center mb-10">
           Choose the plan that best fits your needs.
         </p>
         <br /> <br />
         <div className="plans-container">
           {plans.map((plan, index) => (
             <div className="plan" key={index}>
               <h2>{plan.name}</h2>
               <p className="price">{plan.price}</p>
               <ul>
                 <li>{plan.certificates}</li>
                 <li>{plan.verifications}</li>
               </ul>
               <p>{plan.description}</p>
               <CreateFlowForm createFlow={createFlow} btnText={"Choose"} />
             </div>
           ))}
         </div>
       </>
      ) : null}
       
 

      <br />
      {subscription ? (
      <div className="main-container">
        <div className="content-area">
          <div className="id-generation-card">
            <h1>Generate Your Organization ID Here!</h1>
            <p className="description">
              Easily create a unique identifier for your organization to use
              across our platform.
            </p>
            <div className="id-display-area">
              {/* Conditionally render this div only if an ID is generated */}
              {businessId && <div className="generated-id">{businessId}</div>}
            </div>
            <div><br />
              <input className="input" placeholder="Enter Private Key..." /><br />
              <button onClick={() => generateBusinessId()} className="generate-id-button">Generate ID</button>
            </div>
            <a href="#" className="learn-more-link">
              Learn more about Organization IDs
            </a>
          </div>
        </div>
        <footer className="site-footer"></footer>
      </div>
      ) : null}
    </>
  );
};

export default SubscriptionPlans;
