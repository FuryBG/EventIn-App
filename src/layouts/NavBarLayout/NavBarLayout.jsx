import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { StyledNavBar } from './NavBarLayout.styled';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';

export default function NavBarLayout() {
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated } = useAuthContext();
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
          <Link to={"/events"}>Events</Link>
        </div>
        { isAuthenticated ?
                <div className='user-menu'>
                <Link onClick={onLogout}>Logout</Link>
              </div>
              :
              <div className='user-menu'>
              <Link to={"/auth/login"}>Login</Link>
              <Link to={"/auth/register"}>Register</Link>
            </div>
        }
        <div className={isActive ? 'mobile-menu mobile-active' : 'mobile-menu'}>
          <div onClick={() => toggleMenu(false)} className='exit-container'>
            <span className='exit-menu'></span>
          </div>
          <div className='mobile-menu-container'>
            <div className='link-container'>
              <Link to={"/events"}>Events</Link>
            </div>
            <div className='link-container'>
              <Link to={"/auth/login"}>Login</Link>
            </div>
            <div className='link-container'>
              <Link to={"/auth/register"}>Register</Link>
            </div>
            <div className='link-container'>
              <Link to={"/auth/logout"}>Logout</Link>
            </div>
            <div className='footer'>
              <span>Facebook</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </StyledNavBar>
      <Outlet />
    </>
  )
}
