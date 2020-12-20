import React, { useContext } from "react";
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./TopHeader.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import AuthContext from "../../contexts/auth";
import { BsFillPersonFill } from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';

const TopHeader = (props) => {
  const [signIn, setSignIn] = useState(false)
  const [signUp, setSignUp] = useState(false)

  const toggleSignIn = () => setSignIn(!signIn)
  const toggleSignUp = () => setSignUp(!signUp)

  // dropdown menu when login
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState)

  const checkLogin = () => {
    if (localStorage.getItem('jwtKey')) {
      return true
    } else {
      return false
    }
  }

  // console.log('User: ', props.user)
  const logout = async () => {
    localStorage.removeItem('jwtKey')
  }

  return (
    <div className="navbar__top d-none d-lg-block">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link>Welcome to Booking core</Link>
          </div>
          <div className="d-flex align-items-center">
            <ul className="nav">
              {checkLogin() ? (
                <React.Fragment>
                  <li className="nav-item">
                  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    {console.log(props.user)}
                    <DropdownToggle caret>
                      {props.user.full_name}<i class="arrow"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link className="nav-link"><BsFillPersonFill/> Profile</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="nav-link"><MdSettings/> Settings</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link className="nav-link" onClick={logout}><RiLogoutBoxLine/> Logout</Link>
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
      <SignInForm isOpen={signIn} toggle={toggleSignIn} />
      <SignUpForm isOpen={signUp} toggle={toggleSignUp} />
    </div>
  );
};

export default TopHeader;
