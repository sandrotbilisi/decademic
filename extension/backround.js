console.log("Background script running.");

// chrome.storage.local.clear(function () {
//   var error = chrome.runtime.lastError;
//   if (error) {
//     console.error(error);
//   } else {
//     console.log("Storage is cleared.");
//   }
// });

let walletAddress = "0xtest";

function bufferToBase64(buf) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)));
}

function base64ToBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received : ", message);
  // Handle the initial one-time key verification
  if (message.action === "verifyOneTimeKey") {
    verifyOneTimeKey(message.oneTimeKey, sendResponse);
  }
  // Encrypt and store the JWT using the user's password
  else if (message.action === "encryptAndStoreToken") {
    console.log("encryptAndStoreToken");
    encryptDataWithPassword(message.token, message.password)
      .then(({ encryptedData, iv }) => {
        const encryptedDataStr = bufferToBase64(encryptedData);
        const ivStr = bufferToBase64(iv);
        console.log("encryptedData : ", encryptedDataStr);
        // Now store the Base64 strings
        chrome.storage.local.set(
          { encryptedJwtToken: encryptedDataStr, iv: ivStr },
          () => sendResponse({ success: true })
        );
      })
      .catch((error) => {
        console.error("Encryption error:", error);
        sendResponse({ success: false, message: "Encryption failed" });
      });
  }

  // Decrypt the stored JWT with the user's password and use it
  else if (message.action === "decryptAndUseToken") {
    chrome.storage.local.get(["encryptedJwtToken"], function (result) {
      if (result.encryptedJwtToken) {
        decryptDataWithPassword(result.encryptedJwtToken, message.password)
          .then((decryptedToken) => {
            // Use the decrypted token as needed, e.g., to authenticate API requests
            sendResponse({ success: true, token: decryptedToken });
          })
          .catch((error) => sendResponse({ success: false, message: error }));
      } else {
        sendResponse({ success: false, message: "No encrypted token found." });
      }
    });
  }

  if (message.action === "userResponse") {
    console.log("came here");
    chrome.storage.local.get("permissions", (items) => {
      console.log("itemsdccc : ", items);
    });
    chrome.storage.local.get(null, function(items) {
      console.log("All items in storage:", items);
  });
  
    chrome.storage.local.get({ permissions: [], org_id: "" }, (items) => {
      console.log("items : ", items);
      const { permissions, org_id } = items;
      console.log(
        "background.js: userResponse",
        message.response,
        permissions,
        org_id
      );
      if (true) {
        const responseAction =
          message.response === "accepted"
            ? "PermissionGranted"
            : "PermissionDenied";

        // Update permissions based on the user's response
        if (responseAction === "PermissionGranted") {
          fetch("http://localhost:3000/add-permissions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "SUPER_SECRET_API_KEY",
            },
            body: JSON.stringify({
              id: org_id,
              permissions,
              walletAddress: walletAddress,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log("Permissions added successfully");
              } else {
                console.log("Error adding permissions:", data.error);
              }
            })
            .catch((error) => {
              console.error("Error adding permissions:", error);
            });
        } else {
          console.log("Permissions denied :( :>>; ");
        }

        // Optionally, send the decision back to the content script
        //   chrome.tabs.sendMessage(awaitingResponseTabId, {
        //     action: responseAction,
        //   });

        // Reset awaiting response flag
      }
    });

    sendResponse({ success: true, message: "User response processed" });
  }
  return true; // Indicates asynchronous response
});

// Example function to encrypt data using a password
async function encryptDataWithPassword(data, password) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("some-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(data)
  );

  return { encryptedData, iv };
}
// Example function to decrypt data using a password
async function decryptDataWithPassword(encryptedData, iv, password) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("some-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData
  );
  return dec.decode(decryptedData);
}

function verifyOneTimeKey(oneTimeKey, sendResponse) {
  fetch("http://localhost:3000/verify-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oneTimeKey }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success && data.token) {
        // Store the JWT for future use
        chrome.storage.local.set({ jwtToken: data.token }, () => {
          console.log("Token stored successfully.");
          sendResponse({
            success: true,
            message: "Key verified and token stored.",
          });
        });
      } else {
        sendResponse({
          success: false,
          message: data.error || "Key verification failed.",
        });
      }
    })
    .catch((error) => {
      console.error("Error verifying one-time key:", error);
      sendResponse({
        success: false,
        message: "Network or server error during key verification.",
      });
    });
}

function verifyToken(sendResponse) {
  console.log(chrome);
  chrome.storage.local.get(["jwtToken"], function (result) {
    if (result.jwtToken) {
      fetch("http://localhost:3000/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: result.jwtToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            sendResponse({ success: true, message: "Token verified." });
          } else {
            sendResponse({
              success: false,
              message: "Token invalid or expired.",
            });
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          sendResponse({
            success: false,
            message: "Network or server error during token verification.",
          });
        });
    } else {
      sendResponse({ success: false, message: "No token found." });
    }
  });
}

// background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "requestPermissions") {
    console.log("requests are : ", request.permissions);
    console.log("reqs are : ", request);

    const stringifiedPermissions = JSON.stringify(request.permissions);

    console.log("stringifiedPermissions : ", stringifiedPermissions);

    // Save the permissions to Chrome storage
    chrome.storage.local.set(
      {
        permissions: JSON.stringify(stringifiedPermissions),
        // prv_key: request.prv_key,
        org_id: request.org_id,
      },
      function () {
        console.log("Permissions saved to Chrome storage");
        chrome.storage.local.get("permissions", (items) => {
          console.log("itemsd : ", items);
        });
        chrome.system.display.getInfo(function (displays) {
          var primaryDisplay = displays.find((display) => display.isPrimary);
          if (primaryDisplay) {
            var screenWidth = primaryDisplay.bounds.width;
            var popupWidth = 430; // Width of your popup
            var popupHeight = 650; // Height of your popup
            var leftPosition = screenWidth - popupWidth;

            chrome.windows.create(
              {
                url: "request.html",
                type: "popup",
                width: popupWidth,
                height: popupHeight,
                left: leftPosition,
                top: 0,
              },
              function (window) {
                console.log("Popup window created on the right side:", window);
              }
            );
          }
        });
      }
    );
  }
});
