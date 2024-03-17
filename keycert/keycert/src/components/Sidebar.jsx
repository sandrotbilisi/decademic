import React from 'react';
import { Link } from 'react-scroll';
import "../App.css";

function Sidebar() {
  return (
    <aside className="sidebar sticky">
      <h2 className='text-black'>DAVS Guide</h2>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <Link to="introduction" smooth={true} duration={500} className="nav-link">Introduction</Link>
        </li>
        <li className="nav-item">
          <Link to="hexlify" smooth={true} duration={500} className="nav-link">Hexlify</Link>
        </li>
        <li className="nav-item">
          <Link to="arrayify" smooth={true} duration={500} className="nav-link">Arrayify</Link>
        </li>
        <li className="nav-item">
          <Link to="computeHash" smooth={true} duration={500} className="nav-link">Compute Hash</Link>
        </li>
        <li className="nav-item">
          <Link to="encodeParameters" smooth={true} duration={500} className="nav-link">Encode Parameters</Link>
        </li>
        <li className="nav-item">
          <Link to="generateRSA" smooth={true} duration={500} className="nav-link">Generate RSA</Link>
        </li>
        <li className="nav-item">
          <Link to="signData" smooth={true} duration={500} className="nav-link">Sign Data</Link>
        </li>
        <li className="nav-item">
          <Link to="verifyData" smooth={true} duration={500} className="nav-link">Verify Data</Link>
        </li>
        <li className="nav-item">
          <Link to="addCertificate" smooth={true} duration={500} className="nav-link">Add Certificate</Link>
        </li>
        <li className="nav-item">
          <Link to="checkPermissions" smooth={true} duration={500} className="nav-link">Check Permissions</Link>
        </li>
        <li className="nav-item">
          <Link to="approveCertificate" smooth={true} duration={500} className="nav-link">Approve Certificate</Link>
        </li>
        {/* Additional topics can be added here */}
      </ul>
    </aside>
  );
}

export default Sidebar;
