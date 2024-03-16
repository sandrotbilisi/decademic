
document.addEventListener('DOMContentLoaded', function () {
    // Check if an encrypted JWT is stored and adjust UI accordingly
    chrome.storage.local.get(['encryptedJwtToken', 'iv'], function (result) {
        if (result.encryptedJwtToken && result.iv) {
            document.getElementById('oneTimeKeySection').style.display = 'none';
            document.getElementById('passwordSection').style.display = 'block';
        }
    });

    document.getElementById('submitKey').addEventListener('click', function () {
        const oneTimeKey = document.getElementById('oneTimeKey').value;
        chrome.runtime.sendMessage({ action: "verifyOneTimeKey", oneTimeKey }, function (response) {
            if (response.success) {
                const password = prompt('Enter a new password to secure your session:');
                if (password) {
                    chrome.runtime.sendMessage({
                        action: "encryptAndStoreToken",
                        token: response.token,
                        password: password
                    }, function (encryptResponse) {
                        if (encryptResponse.success) {
                            alert('Session secured. Use your password to log in next time.');
                            document.getElementById('oneTimeKeySection').style.display = 'none';
                            document.getElementById('passwordSection').style.display = 'block';
                        } else {
                            alert('Failed to secure session.');
                        }
                    });
                }
            } else {
                alert('Login failed: ' + response.message);
            }
        });
    });

    document.getElementById('submitPassword').addEventListener('click', function () {
        const password = document.getElementById('password').value;
        chrome.runtime.sendMessage({ action: "decryptAndUseToken", password }, function (response) {
            if (response.success) {
                console.log('Token decrypted and used successfully.');
                // Assuming the response includes the walletAddress
                document.getElementById('walletAddressDisplay').textContent = response.walletAddress;
                // Adjust UI visibility
                document.getElementById('passwordSection').style.display = 'none'; // Hide password section
                document.getElementById('loginSuccessSection').style.display = 'block'; // Show success section
            } else {
                console.error('Failed to decrypt token. error is : ', response.message);
                // Optionally, inform the user the password was incorrect and possibly allow re-entry
            }
        });
    });

});


// Select all the blocks
const blocks = document.querySelectorAll('.collections .block');

// Add hover event listeners to each block
blocks.forEach(block => {
    block.addEventListener('mouseenter', () => {
        // Apply lighter color and shake-rotate animation to other blocks
        blocks.forEach(otherBlock => {
            if (otherBlock !== block) {

                otherBlock.style.backgroundColor = '#38567d'; // Lighter color
                otherBlock.style.scale = '0.95';
                // otherBlock.classList.add('shake-rotate'); // Apply shake and rotate
            }
        });
    });

    block.addEventListener('mouseleave', () => {
        // Reset color and remove shake-rotate animation from other blocks
        blocks.forEach(otherBlock => {
            if (otherBlock !== block) {
                otherBlock.style.backgroundColor = '#1F4068'; // Original color
                otherBlock.style.scale = '1';
                // otherBlock.classList.remove('shake-rotate'); // Remove shake and rotate
            }
        });
    });
});


function generateRandomGradientAvatar() {
    const canvas = document.getElementById('avatarCanvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        // Adjust the gradient to fit the smaller canvas size
        var gradient = ctx.createRadialGradient(15, 15, 3, 15, 15, 15); // Smaller and centered
        // Random colors for the gradient
        var startColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        var endColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);

        // Apply the gradient and adjust the circle size
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(15, 15, 12, 0, Math.PI * 2, true); // Adjusted for smaller canvas
        ctx.fill();
    }
}

// content-script.js

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

document.getElementById('text-welcome').textContent = getGreeting() + '!';




// Call the function to generate the avatar
generateRandomGradientAvatar();
