// CreateFlowForm.js
import React, { useState } from "react";


const CreateFlowForm = ({ createFlow, btnText, givenClass }) => {
  const [superTokenAddress, setSuperTokenAddress] = useState("");
  const [senderAddress, setSenderAddress] = useState("0xb33796b1a7914E25E533d8bB1e0a9EEDA5709Bf7");
  const [receiverAddress, setReceiverAddress] = useState("0x738D6A0eA22490A170deBa9402D71Ef3A0C47DA9");
  const [flowRate, setFlowRate] = useState(1000);

  const handleSubmit = () => {
    // e.preventDefault();
    createFlow(superTokenAddress, senderAddress, receiverAddress, flowRate);
  };

  return (
    <button onClick={() => handleSubmit()} type="submit" className={givenClass}>
      {" "}
      {btnText}{" "}
    </button>
  );
};

export default CreateFlowForm;
