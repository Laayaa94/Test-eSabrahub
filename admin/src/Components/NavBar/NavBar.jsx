import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Ensure to create this CSS file for styling

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="open-btn" onClick={toggleSideNav}>
        &#9776; {/* This is the hamburger icon */}
      </button>
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSideNav}>
          &times;
        </button>
        <Link to="/accommodation" >Accommodation</Link>
        <Link to="/food-shop" >Food Shop</Link>
        <Link to="/transport" >Transport</Link>
        <Link to="/medical-centers" >Medical Centers</Link>
        <Link to="/attractive-places" >Attractive Places</Link>
        <Link to="/" >Create Post</Link>
      </div>
    </>
  );
};

export default NavBar;
