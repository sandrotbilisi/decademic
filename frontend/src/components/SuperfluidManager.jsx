// SuperfluidManager.js
import React, { useState, useEffect } from 'react';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import CreateFlowForm from './CreateFlowForm'; // We will create this component next

const SuperfluidManager = () => {
    const [sf, setSf] = useState(null);
    const [providers, setProvider] = useState(null);

    useEffect(() => {
        const initializeSuperfluid = async () => {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const sfInstance = await Framework.create({
                chainId: 42161,
                provider: provider,
            });


            setSf(sfInstance);

            setProvider(provider);

        };


        initializeSuperfluid();
    }, []);

    const createFlow = async (superTokenAddress, senderAddress, receiverAddress, flowRate) => {
        if (!sf) {
            console.error('Superfluid is not initialized.');
            return;
        }

        try {
            console.log(sf)
            // await sf.initialize();
            // const signer = sf.createSigner({
            //     privateKey: "82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb",
            //     provider: providers,
            // });

            // console.log(signer)

            // request metamaks to connect


            

            
            const createFlowOperation = sf.cfaV1.createFlow({
                sender: '0x962dA48fEF1184492C91cf9f2Ae48307C1f81Cda',
                receiver: '0xa6365428ce9a7becac3d36ffe52a8ced6f268d42',
                flowRate: 4000000000,
                superToken: "0xe6C8d111337D0052b9D88BF5d7D55B7f8385ACd3",
                providerOrSigner: providers,
              });

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Request Metamask to connect
            await provider.send('eth_requestAccounts', []);

            const signer = provider.getSigner();

            console.log("Creating flow...");
            const txnResponse = await createFlowOperation.exec(signer);
            const txnReceipt = await txnResponse.wait();
            console.log("Flow created. Transaction: ", txnReceipt.transactionHash);




            //ask for metamask to sign the transaction

            // const signer = providers.getSigner();

            // console.log("Creating flow...");
            // const txnResponse = await createFlowOperation.exec(signer);
            // const txnReceipt = await txnResponse.wait();
            // console.log("Flow created. Transaction: ", txnReceipt.transactionHash);






        } catch (error) {
            console.error('Failed to create the flow:', error);
        }
    };

    return (
        <div>
            <h1>Superfluid Integration</h1>
            {sf && <CreateFlowForm name={"sa"} createFlow={createFlow} />}
        </div>
    );
};

export default SuperfluidManager;
