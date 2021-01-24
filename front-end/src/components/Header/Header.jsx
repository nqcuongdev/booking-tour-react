import React, { useState } from "react";
import {
  Collapse,
  Container,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../../assets/images/logo.svg";
import "./Header.scss";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-expand-lg">
      <Container>
        <NavbarBrand href="/">
          <img src={logo} alt="Logo Booking" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle}>
          <FaBars size={30} />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink href="/"> {/* className="active" */}
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tours">Tours</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/destinations">Destinations</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/hotels">Hotels</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/blogs">Blogs</NavLink>
              {/* <ul className="children-menu menu-dropdown">
                <li className="sub-item">
                  <Link>Detail</Link>
                </li>
                <li className="sub-item">
                  <Link>Detail</Link>
                </li>
              </ul> */}
            </NavItem>
            {/* <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                News
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/contact-us">Contact</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </nav>
  );
};

export default Header;
