

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['permissions'], function(result) {
        function formatPermissions(permissions) {
            // Capitalize each permission and format them as requested
            const formattedPermissions = permissions.map(permission => 
                permission.charAt(0).toUpperCase() + permission.slice(1).toLowerCase()
            );
            
            // Join them with commas and " & " before the last permission
            if (formattedPermissions.length > 1) {
                return formattedPermissions.slice(0, -1).join(", ") + " & " + formattedPermissions.slice(-1);
            } else {
                return formattedPermissions.join("");
            }
        }
        document.getElementById('permissionText').innerHTML = result.permissions ? formatPermissions(JSON.parse(result.permissions)) : 'No permissions';
        console.log('Permissions retrieved from storage:', result.permissions);
        
        // Now you can use `result.permissions` as needed in your page
        
        // Optionally, clear the permissions from storage after retrieving them
        chrome.storage.local.remove(['permissions'], function() {
            console.log('Permissions removed from storage');
        });
    });
    chrome.storage.local.get(['requestingTabUrl'], function(result) {

        const fullUrl = new URL(result.requestingTabUrl);
        const protocol = fullUrl.protocol; // "http:" or "https:"
        const domain = fullUrl.hostname; // "127.0.0.1"
        const port = fullUrl.port; // "8000"
        
        // Combine them to get the full base URL
        const baseUrl = `${protocol}//${domain}${port ? ':' + port : ''}`;

        document.getElementById('request-url').innerHTML = baseUrl || 'No requesting tab URL';
        console.log('Requesting tab URL retrieved from storage:', result.requestingTabUrl);
        
        // Now you can use `result.requestingTabUrl` as needed in your page
        
        // Optionally, clear the requesting tab URL from storage after retrieving it
        chrome.storage.local.remove(['requestingTabUrl'], function() {
            console.log('Requesting tab URL removed from storage');
        });
    }
    );
});

document.getElementById('acceptButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "userResponse", response: "accepted"}, function() {
        window.close();
    });
    
});

document.getElementById('rejectButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "userResponse", response: "rejected"}, function() {
        window.close();
    });
});