import React from "react";
import "./App.css"; // Assuming you have an App.css with your styles
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="content" style={{ flex: 1, padding: "20px" }}>
          {/* Comprehensive Overview of DAVS Functions */}

          <h1 id="introduction">DAVS Library Comprehensive Guide</h1>
          <p>
            DAVS is your go-to library for digital asset verification and
            blockchain interactions. Here's how you can leverage its powerful
            features:
          </p>

          {/* Hexlify */}
          <h2 id="hexlify">hexlify(input)</h2>
          <p>
            Converts input into a hexadecimal string. Accepts either a number or
            a string.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>input</strong>: <code>number</code> or <code>string</code>
          </p>
          <h3>Output:</h3>
          <p>
            <code>string</code> (hexadecimal representation)
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
// Example: Numeric input
console.log(DAVS.hexlify(123)); // Output: "0x7b"
// Example: String input
console.log(DAVS.hexlify("Hello")); // Output: "0x48656c6c6f"
`}</pre>

          {/* Arrayify */}
          <h2 id="arrayify">arrayify(hexString)</h2>
          <p>
            Turns a hex string into an array of bytes. Useful for byte-level
            operations.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>hexString</strong>: <code>string</code> (hexadecimal)
          </p>
          <h3>Output:</h3>
          <p>
            <code>Array</code> (array of bytes)
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
console.log(DAVS.arrayify("0x48656c6c6f")); // Output: [72, 101, 108, 108, 111]
`}</pre>

{/* { getProfile } */}

<h2 id="computeHash">getProfile(address address)</h2>
          <p>
            returns all the profile data of the user
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>address</strong>: <code>string</code>
          </p>
          <h3>Output:</h3>
          <p>
            <code>array</code> 
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
DAVS.getProfile("0xkjsdahfdbasbkdfja").then(hash => console.log(hash));
// Output: [435435,453454,534534543,53453]
`}</pre>




          {/* ComputeHash */}
          <h2 id="computeHash">computeHash(data)</h2>
          <p>
            Computes the SHA-256 hash of the input data. Returns a promise that
            resolves to the hash.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>data</strong>: <code>string</code>
          </p>
          <h3>Output:</h3>
          <p>
            <code>string</code> (SHA-256 hash of the input)
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
DAVS.computeHash("Hello, DAVS").then(hash => console.log(hash));
// Output: SHA-256 hash of "Hello, DAVS"
`}</pre>

          {/* EncodeParameters */}
          <h2 id="encodeParameters">encodeParameters(types, values)</h2>
          <p>
            Encodes parameters for smart contract interaction based on specified
            types and values.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>types</strong>: Array of types
          </p>
          <p>
            <strong>values</strong>: Array of corresponding values
          </p>
          <h3>Output:</h3>
          <p>
            <code>string</code> (ABI-encoded string)
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
const types = ["address", "uint256"];
const values = ["0x1234567890abcdef1234567890abcdef12345678", 1000];
console.log(DAVS.encodeParameters(types, values));
// Output: ABI-encoded string
`}</pre>

          {/* GenerateRSA */}
          <h2 id="generateRSA">generateRSA(keySize)</h2>
          <p>
            Generates an RSA key pair of a given size. Returns an object with
            publicKey and privateKey.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>keySize</strong>: <code>number</code> (key size in bits)
          </p>
          <h3>Output:</h3>
          <p>
            <code>Object</code> containing <code>publicKey</code> and{" "}
            <code>privateKey</code>
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
DAVS.generateRSA(2048).then(keys => {
  console.log("Public Key:", keys.publicKey);
  console.log("Private Key:", keys.privateKey);
});
// Output: RSA public and private keys
`}</pre>
          <div className="content" style={{ flex: 1, padding: "20px" }}>
            {/* Additional DAVS Functions */}

            <h2 id="addCertificate">Add Certificate</h2>
            <p>
              Adds a certificate data to a backend system or blockchain. It
              requires organization ID, private key, data, and wallet address.
            </p>
            <pre className="code-block">{`
// Adding a certificate
DAVS.addCertificate({
  org_id: "123456789",
  prv_key: "private_key_here",
  data: "certificate_data_here",
  walletAddress: "0xABC123..."
}).then(response => {
  console.log("Certificate added:", response);
});
// Expected output: Confirmation of certificate addition
`}</pre>

            <h2 id="checkPermissions">Check Permissions</h2>
            <p>
              Checks if a given wallet address has specific permissions within
              an organization.
            </p>
            <pre className="code-block">{`
// Checking permissions
DAVS.checkPermissions("0xABC123...", "123456789", "read").then(permission => {
  console.log("Permission status:", permission);
});
// Expected output: Boolean indicating permission status
`}</pre>

            <h2 id="approveCertificate">Approve Certificate</h2>
            <p>
              Approves a certificate by verifying its data against a signature
              and expected signer address.
            </p>
            <pre className="code-block">{`
// Approving a certificate
DAVS.approveCertificate({
  data: "certificate_data_here",
  signature: "signature_here",
  expectedAddress: "0xABC123..."
}).then(isApproved => {
  console.log("Certificate approved:", isApproved);
});
// Expected output: Boolean indicating approval status
`}</pre>

            <p>
              These methods extend the functionality of DAVS, allowing for
              intricate management of certificates and permissions alongside
              cryptographic operations and blockchain interactions. Ensure you
              have appropriate backend support for handling these operations,
              especially for functions that interact with external systems like
              `addCertificate` and `checkPermissions`.
            </p>
          </div>

          {/* SignData */}
          <h2 id="signData">signData(data, privateKey)</h2>
          <p>
            Signs data using a specified private key. Useful for proving
            ownership or authorship.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>data</strong>: Data to be signed
          </p>
          <p>
            <strong>privateKey</strong>: Private key for signing
          </p>
          <h3>Output:</h3>
          <p>
            <code>string</code> (signature)
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
const data = "Message to sign";
const privateKey = "your_private_key_here";
DAVS.signData(data, privateKey).then(signature => {
  console.log("Signature:", signature);
});
// Output: Signature
`}</pre>

          {/* VerifyData */}
          <h2 id="verifyData">verifyData(data, signature, expectedAddress)</h2>
          <p>
            Verifies the authenticity of a signature given the original data and
            the signer's expected address.
          </p>
          <h3>Inputs:</h3>
          <p>
            <strong>data</strong>: Original data that was signed
          </p>
          <p>
            <strong>signature</strong>: Signature to verify
          </p>
          <p>
            <strong>expectedAddress</strong>: Address expected to have signed
            the data
          </p>
          <h3>Output:</h3>
          <p>
            <code>boolean</code> indicating whether the signature is valid and
            matches the expected address
          </p>
          <h3>Example:</h3>
          <pre className="code-block">{`
const data = "Message to sign";
const signature = "signature_here";
const expectedAddress = "0x123...";
DAVS.verifyData(data, signature, expectedAddress).then(isValid => {
  console.log(isValid ? "Signature is valid" : "Signature is invalid");
});
// Output: Validation result
`}</pre>

          <p>
            This guide provides a solid foundation for utilizing the DAVS
            library to interact with the blockchain and manage digital assets
            securely. For more information or advanced usage, refer to the full
            documentation and API reference.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
