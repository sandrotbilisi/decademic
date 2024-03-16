window.decademic = {
    hello: function ({ name, org_id }) {
      fetch("http://localhost:3000/check-permission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission: "hello",
          org_id,
          walletAddress: "0xtest",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Hello from decademic! " + name + "!");
            return "Hello " + name + "!";
          } else {
            console.log("Permission denied");
            return "Permission denied";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          return "Error: " + error;
        });
    },
    request: function ({ method, permissions, org_id }) {
      return new Promise((resolve, reject) => {
        // Debugging: Confirm event listener is being added
        console.log("Adding event listener for DecademicResponse...");
  
        window.addEventListener(
          "DecademicResponse",
          function (e) {
            console.log("DecademicResponse event received", e.detail); // Debugging
            if (e.detail.response === "accepted") {
              console.log('Permission granted.ssssss')
              resolve("Permission granted.");
            } else {
              reject("Permission denied.");
            }
          },
          { once: true }
        );
  
        // Debugging: Confirm that the request event is being dispatched
        console.log("Dispatching DecademicRequest event...");
        window.dispatchEvent(
          new CustomEvent("DecademicRequest", {
            detail: { method, permissions, org_id },
          })
        );
      });
    },
  
    add: function ({ org_id, prv_key, data }) {
      console.log("came");
      fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ org_id, prv_key, data, walletAddress: "0xtest" }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data : ", data);
          if (data.success) {
            return "Data added successfully";
          } else {
            console.log("Error adding data:", data.error);
            return "Error adding data: " + data.error;
          }
        });
      console.log("womp womp");
    },
  };
  console.log("window.decademic added:", window.decademic);
  