import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';
import AuthContext from '../context/AuthContext';

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
        <h1 className="logo">DHVSU Archives</h1>
        
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
        <Link to="/library" className="nav-link">
          Library
        </Link>
        <Link to="/admin" className="nav-link">
          Admin
        </Link>
        {user && <p onClick={logoutUser} className="nav-link logout-link hover:cursor-pointer">Logout</p>}
      </nav>
    </header>
  );
};

export default Header;
