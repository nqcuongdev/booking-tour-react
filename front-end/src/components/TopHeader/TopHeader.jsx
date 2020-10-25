import React from "react";
import { Container } from "reactstrap";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./TopHeader.scss";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className="navbar__top d-none d-lg-block">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link>Welcome to Booking core</Link>
          </div>
          <div className="d-flex align-items-center">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link">
                  <FaPhoneAlt size={18} className="mr-2" /> 033 731 7788
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  <FaMapMarkerAlt size={18} className="mr-2" />
                  Nam Ky Khoi Nghia, Da Nang
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopHeader;
