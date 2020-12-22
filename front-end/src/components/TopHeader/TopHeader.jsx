import React, { useContext } from "react";
import { Container } from "reactstrap";
import "./TopHeader.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import AuthContext from "../../contexts/auth";

const TopHeader = (props) => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const toggleSignIn = () => setSignIn(!signIn);
  const toggleSignUp = () => setSignUp(!signUp);

  return (
    <div className="navbar__top d-none d-lg-block">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link>Welcome to Booking core</Link>
          </div>
          <div className="d-flex align-items-center">
            <ul className="nav">
              {console.log(props.user)}
              {props.user ? (
                <li className="nav-item">
                  <Link className="nav-link">Logout</Link>
                </li>
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
