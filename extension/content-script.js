console.log("Content script running");

// Listen for custom event from the injected script
window.addEventListener('DecademicRequest', function(e) {
    console.log("Received request from page:", e.detail);
    if(e.detail.method === "requestPermissions") {
        console.log('content-script.js: requestPermissions', e.detail.permissions, e.detail.org_id)
        chrome.runtime.sendMessage({ action: "requestPermissions", permissions: e.detail.permissions, org_id: e.detail.org_id }, function(response) {
            console.log("Response from background:", response);

            
            
            // Optionally, send a response back to the web page
        });
    }
});

// Inject the decademic-inject.js script
const s = document.createElement('script');
s.src = chrome.runtime.getURL('decademic-inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
