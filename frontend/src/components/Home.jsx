import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Make sure to create and import Home.css for styling

// Example technology icons - replace these with relevant icons for your project
import arbitrum from "../assets/arbitrum.png";
import Filecoin from "../assets/Filecoin.png";
import ens from "../assets/ens.png";
import worldcoin from "../assets/worldcoin.png";

import ConnectDecademicButton from "./connectDecademic";
import ConnectMetamaskButton from "./connectMetamask";


const TechCard = ({ icon, name }) => (
  <div className="tech-card">
    <img width={"200px"} src={icon} alt={name} className="tech-icon" />
    <h5 className="tech-name">{name}</h5>
  </div>
);

const FAQAccordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-accordion">
      <button onClick={() => setIsOpen(!isOpen)} className="faq-question">
        {question}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Welcome to Decademic</h1>
        <p className="hero-subtitle">
          Decentralizing Academic Credentials with Blockchain.
        </p>
        <div className="hero-actions g-3">
          {/* <Link to="/create-profile" className="btn btn-primary">
            Create Decademic Profile
          </Link>
          <Link to="/connect-profile" className="btn btn-secondary">
            Connect Decademic Profile
          </Link> */}

          <ConnectDecademicButton />
          <ConnectMetamaskButton />
        </div>
      </section>

      <section className="technologies">
        <h2>Technologies Behind Decademic</h2>
        <div className="tech-cards">
          <TechCard icon={arbitrum} name="Arbitrum" />
          <TechCard icon={Filecoin} name="Filecoin" />
          {/* <TechCard icon={ens} name="Ens" /> */}
          <TechCard icon={worldcoin} name="Worldcoin" />
          {/* Add more as needed */}
        </div>
      </section>

      <section className="faqs">
        <h2>Frequently Asked Questions</h2>
        <FAQAccordion
          question="How do I create a Decademic profile?"
          answer="To create a profile, go to the Create Profile page, and follow the instructions."
        />
        <FAQAccordion
          question="What technology does Decademic use?"
          answer="Decademic utilizes blockchain technology to secure and decentralize academic credentials."
        />
        {/* Add more FAQs as needed */}
      </section>

      <section className="cta">
        <h2>Start Managing Your Academic Credentials Today</h2>
        <Link to="/get-started" className="btn btn-primary">
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
