import React, { useState, useContext } from "react";
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
import { Link, useRouteMatch } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // lấy đường dẫn hiện tại
  const { url } = useRouteMatch();
  //console.log("url: "+url);

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
              <NavLink 
                href="/"
                className={ url == '/' ? 'active' : ''}
              >
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/tours"
                className={ url.search('/tours') == 0 ? 'active' : ''}
              >
                Tours
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                href="/destinations" 
                className={ url.search('/destinations') == 0 ? 'active' : ''} 
              >
                Destinations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                href="/hotels"
                className={ url.search('/hotels') == 0 ? 'active' : ''}
              >
                Hotels
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/blogs"
                className={ url.search('/blogs') == 0 ? 'active' : ''}
              >
                Blogs
              </NavLink>
              {/* <ul className="children-menu menu-dropdown">
                <li className="sub-item">
                  <Link>Detail</Link>
                </li>
                <li className="sub-item">
                  <Link>Detail</Link>
                </li>
              </ul> */}
            </NavItem>
            <NavItem>
              <NavLink
                href="/events"
                className={ url.search('/events') == 0 ? 'active' : ''}
              >
                Events
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                href="/contact-us"
                className={ url.search('/contact-us') == 0 ? 'active' : ''}
              >
                Contact
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </nav>
  );
};

export default Header;
