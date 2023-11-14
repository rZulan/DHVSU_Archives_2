import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../css/header.css';
import '../assets/logo.png';

const Header = () => {
  let {user, logoutUser} = useContext(AuthContext)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const closeMobileMenu = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeMobileMenu);
    return () => {
      window.removeEventListener('resize', closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`header ${isMobileMenuOpen ? 'open' : ''} ${visible ? 'visible' : 'hidden'}`}
    >
      <div className="header-content">
        <div className="logo-container">
          <img src="../assets/logo.png" alt="DHVSU Archives Logo" className="logo-image" />
          <span className="logo-text">Archives</span>
        </div>
        
        {user && <p className='ml-8'>Welcome <u>{user.username}</u></p>}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </button>
      </div>
      <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/submit" className="nav-link">
          Upload
        </Link>
        <Link to="/library" className="nav-link">
          Browse
        </Link>
        <Link to="/admin" className="nav-link">
          Profile
        </Link>
        {user && <p onClick={logoutUser} className="nav-link logout-link hover:cursor-pointer">Logout</p>}
      </nav>
    </header>
  );
};

export default Header;
