import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Styles/Navbar.css';
import mainLogo from './Assets/vinyl.png';
import userLogo from './Assets/icons8-user-48.png';
import searchLogo from './Assets/icons8-search-48.png';
import cartLogo from './Assets/icons8-shopping-cart-48.png';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearchClick(event) {
    event.preventDefault();
  }

  function handleCartClick(event) {
    event.preventDefault();
    // Check if the user is logged in
    const uid = localStorage.getItem('uid');
    if (!uid) {
      // If not logged in, display a pop-up or redirect to the login page
      alert('Please log in to access your cart.');
 
    } else {

      navigate('/cart'); 
    }
  }

  function handleUserClick(event) {
    event.preventDefault();
  }

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarClasses = ['navbar', scrolled ? 'scrolled' : ''];

  return (
    <nav className={navbarClasses.join(' ')}>
      <div className="logo">
        <img src={mainLogo} alt="Vinyl Records Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
        </li>
        <li>
          <Link to="/store" className={location.pathname === '/store' ? 'active' : ''}>
            Store
          </Link>
        </li>
        <li>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </li>
      </ul>
      <div className="user-actions">
        <a href="#search" onClick={handleSearchClick}>
          <img src={searchLogo} alt="Search Icon" className="nicon" />
        </a>
        <div onClick={handleCartClick}>
          <img src={cartLogo} alt="Shopping Cart Icon" className="nicon" />
        </div>
        <div onClick={handleUserClick}>
          <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
            <img src={userLogo} alt="User Icon" className="nicon" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
