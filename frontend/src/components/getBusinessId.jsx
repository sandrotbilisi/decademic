import React, { useState } from 'react';

function BusinessIdGenerator() {
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

    return (
        <div>
            <input
                type="text"
                value={privateKey}
                onChange={handlePrivateKeyChange}
                placeholder="Private Key"
            />
            <button onClick={generateBusinessId}>Generate ID for Business</button>
            {businessId && <p>Generated ID: {businessId}</p>}
        </div>
    );
}

export default BusinessIdGenerator;
