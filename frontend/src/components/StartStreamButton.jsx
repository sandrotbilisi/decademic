import React from 'react';

const StartStreamButton = ({ sf, sender, recipient, monthlyAmount }) => {
    const startStream = async () => {
        if (!sf || !sender || !recipient || !monthlyAmount) {
            console.error('Missing required information to start the stream.');
            return;
        }

        const secondsInMonth = 30 * 24 * 60 * 60; // Approximate seconds in a month
        const flowRate = String(Math.floor((monthlyAmount / secondsInMonth) * 1e18));

        try {
            const user = sf.user({
                address: sender,
                token: sf.tokens.fDAIx.address
            });
            
            await user.flow({
                recipient: recipient,
                flowRate: flowRate
            });
            
            console.log('Stream started successfully');
        } catch (error) {
            console.error('Failed to start the stream:', error);
        }
    };

    return <button onClick={startStream}>Start Money Stream</button>;
};

export default StartStreamButton;