import React, { useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./TopHeader.scss";
import { Link, Redirect } from "react-router-dom";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import AuthContext from "../../contexts/auth";
import { BsFillPersonFill } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';

const TopHeader = (props) => {
  const { user, setUser } = props
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)

  const toggleSignIn = () => setSignIn(!signIn);
  const toggleSignUp = () => setSignUp(!signUp);

  // dropdown menu after login
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const [redirect, setRedirect] = useState(false)
  if (redirect) {
    // chuyển về trang chủ
    return <Redirect to='/'/>;
  }

  const logout = async () => {
    localStorage.removeItem('jwtKey')
    setUser({})

    toast.info(`Logged out!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setRedirect(true)
  }

  // console.log({user})
  return (
    <div className="navbar__top d-none d-lg-block">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="top-title">Welcome to Booking core</Link>
          </div>
          <div className="d-flex align-items-center">
            <ul className="nav">
              {user.full_name ? (
                <React.Fragment>
                  <li className="nav-item">
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                      {user.full_name}<i class="arrow"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link className="nav-link" to="Profile"><BsFillPersonFill className="icon"/> Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="nav-link"><MdSettings className="icon"/> Settings</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="nav-link" onClick={logout}><RiLogoutBoxLine className="icon"/> Logout</Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={() => {
                        setSignIn(true);
                      }}
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      onClick={() => {
                        setSignUp(true);
                      }}
                    >
                      Sign Up
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </Container>
      <SignInForm isOpen={signIn} toggle={toggleSignIn} setUser={setUser} />
      <SignUpForm isOpen={signUp} toggle={toggleSignUp} setUser={setUser} />
    </div>
  );
};

export default TopHeader;
