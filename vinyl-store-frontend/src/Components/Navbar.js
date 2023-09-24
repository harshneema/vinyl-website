import React from 'react';
import './Styles/Navbar.css'; // Import your CSS file
import mainLogo from './Assets/vinyl.png'
import userLogo from './Assets/icons8-user-48.png'
import searchLogo from './Assets/icons8-search-48.png'
import cartLogo from './Assets/icons8-shopping-cart-48.png'

// Define your click handlers in your component
function handleSearchClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    // Add your logic for the search icon click here
  }
  
  function handleCartClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    // Add your logic for the cart icon click here
  }
  
  function handleUserClick(event) {
    event.preventDefault(); // Prevent the default link behavior
    // Add your logic for the user icon click here
  }
  
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={mainLogo} alt="Vinyl Records Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/">Store</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
      </ul>
      <div className="user-actions">
            <a href="#search" onClick={handleSearchClick}>
                <img src={searchLogo} alt="Search Icon" className="nicon" />
            </a>
            <a href="#cart" onClick={handleCartClick}>
                <img src={cartLogo} alt="Shopping Cart Icon" className="nicon" />
            </a>
            <a href="#user" onClick={handleUserClick}>
                <img src={userLogo} alt="User Icon" className="nicon" />
            </a>
      </div>
    </nav>
  );
}

export default Navbar;
