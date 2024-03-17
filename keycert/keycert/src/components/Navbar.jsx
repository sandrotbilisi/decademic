import React from "react";
import "../App.css";
import SVGSERACH from "../assets/svg-search-icon.svg";

function Navbar() {
  // Add a state to handle the search input
  const [searchQuery, setSearchQuery] = React.useState("");
  // Function to handle search submission
  const handleSearch = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log(searchQuery);
  };

  return (
    <div className="navbar">
      <a href="#" className="hover bold">
        Keycert Docs
      </a>
      <a href="#" className="hover">
        📚 Documentation
      </a>
      <a href="#" className="hover">
        🛜 API
      </a>

      <div className="margin-left js-center">
      <a href="#" className="hover">
        💻 GitHub
      </a>
      <a href="#" className="hover">
        📚 Decademic
      </a>
        <form className="search-container" onSubmit={handleSearch}>
          <button type="submit" className="search-button">
            <img width={20} src={SVGSERACH} alt="" />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default Navbar;