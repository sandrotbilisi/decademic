import DAVS from "./main.js";

const main = async () => {
  const davs = new DAVS("arbitrum");

  const certificates = await davs.getProfile(
    "0xb33796b1a7914E25E533d8bB1e0a9EEDA5709Bf7"
  );


  const permissiion = await davs.checkPermissions(
    "0xtest",
    "RNDM_ID_RCRYN2CIR9",
    "hello"
  );

  for(let i = 0; i < certificates.length; i++) {
    const approved = davs.approveCertificate(certificates[i]);
  }

  // org_id, prv_key, data, walletAddress
//   const certificate = await davs.addCertificate({
//     org_id: "RNDM_ID_ZEZ2AUZX45E",
//     prv_key: "82c5c2a3867b3b1cc41fece1188d341a65c09094f16d18d6de3fab0392854bfb",
//     data: {
//       type: { name: "university", hash: false },
//       name: { name: "harvard", hash: false },
//       studentName: { name: "Aleksandre", hash: true },
//       studentId: { name: "22AB94843C", hash: true },
//     },
//     walletAddress: "0xtest",
//   });

//   const aprove = await davs.approveCertificate(

//   console.log(idk);
};

main();
