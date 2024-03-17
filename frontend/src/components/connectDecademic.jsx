import React from "react";
import { useContext } from "react";
import { decademicLoggedInContext } from "../App";

// get context

export default function connectDecademic() {
  // const decademicLoggedIn = useContext(decademicLoggedInContext);

  console.log("co :", decademicLoggedInContext);

  const { decademicLoggedIn, setDecademicLoggedIn } = useContext(
    decademicLoggedInContext
  );

  const connect = async () => {
    console.log("decademicLoggedIn :>> ", decademicLoggedIn);
    if (window.decademic) {
      console.log("try #1");
      const idk = window.decademic.hello({
        name: "sandro",
        org_id: "RNDM_ID_RCRYN2CIR9",
      });
      // console.log('idk :>> ', idk);
      await window.decademic.request({
        method: "requestPermissions",
        permissions: ["hello"],
        org_id: "RNDM_ID_RCRYN2CIR9",
      });
      console.log('s')
        setTimeout(() => {
            console.log('try #3')
            setDecademicLoggedIn(true)
        }, 1000)

      console.log("try #2");
      const idk2 = window.decademic.hello({
        name: "sandro",
        org_id: "RNDM_ID_RCRYN2CIR9",
      });
    } else {
      console.log("window.decademic is not available");
    }
  };

  const afterResponse = () => {
    console.log("try #2 bis");
  };
  return <button onClick={() => connect()}>Connect Decademic</button>;
}
