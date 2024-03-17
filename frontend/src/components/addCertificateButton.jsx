import React from 'react'


export default function addCertificateButton () {

    const addCertificate = async () => {
        if (window.decademic) {
              await window.decademic.add({ org_id: 'RNDM_ID_N3YS55VI34', prv_key: "69d875fe9a63a011317341726bf3f73f6232504963fa77a2ac11205ccabe2bc8", data: { type: { name: "university", hash : false }, name: { name: "harvard", hash: false } , studentName: {name:  "Aleksandre", hash: true} , studentId: { name: "22AB94843C", hash: true } } })
          } else {
              console.log("window.decademic is not available");
          }
    }
    https://worldcoin.org/verify?t=wld&i=1e978582-105f-4ee3-a304-f412606aaa69&k=9OcBiwyqgvyhlGYCWTp%2BnGzOt3Ervf2099K1J4ONCWA%3D
  return (
    <div>
      <button onClick={() => addCertificate()}>Add Certificate</button>
    </div>
  )
}