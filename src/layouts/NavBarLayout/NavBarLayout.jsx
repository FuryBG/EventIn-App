import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { StyledNavBar } from './NavBarLayout.styled';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';

export default function NavBarLayout() {
  const [isActive, setIsActive] = useState(null);
  const { isAuthenticated, isLoading } = useAuthContext();

  if(isLoading) return null;

  function toggleMenu(v) {
    setIsActive(v);
  };

  function onLogout() {
    logout().then(r => {
      location.replace("/");
    }).catch(r => {
      console.log("wtf?");
    })
  }
  return (
    <>
      <StyledNavBar>
        <div onClick={() => toggleMenu(true)} className='hamburger-container'>
          <span className='hamburger-menu'></span>
        </div>
        <div>
          <Link to={"/"}>
            <img src='/src/assets/logo.png'></img>
          </Link>
        </div>
        <div className='main-menu'>
          <Link to={"/analytics"}>Analytics</Link>
        </div>
        {/* THERE SHOULD BE USER CIRCLE MAYBE */}
        <div className={isActive ? 'mobile-menu mobile-active' : 'mobile-menu'}>
          <div onClick={() => toggleMenu(false)} className='exit-container'>
            <span className='exit-menu'></span>
          </div>
          <div className='mobile-menu-container'>
            <div className='link-container'>
              <Link to={"/analytics"}>Analytics</Link>
            </div>
        {/* THERE SHOULD BE USER CIRCLE MAYBE */}
            <div className='footer'>
              <span className='facebook'></span>
            </div>
          </div>
        </div>
      </StyledNavBar>
      <Outlet />
    </>
  )
}
