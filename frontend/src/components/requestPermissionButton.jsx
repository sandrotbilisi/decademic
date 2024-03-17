import React from "react";

export default function requestPermissionButton() {
  const reuqestPermission = async () => {
    if (window.decademic) {
      await window.decademic.request({
        method: "requestPermissions",
        permissions: ["add"],
        org_id: "RNDM_ID_ZEZ2AUZX45E",
      });
    } else {
      console.log("window.decademic is not available");
    }
  };

  return (
    <div>
      <button onClick={() => reuqestPermission()}>Request Permission</button>
    </div>
  );
}
