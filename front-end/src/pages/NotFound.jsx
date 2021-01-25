import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import MainLayout from "../layouts/MainLayout";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const NotFound = (props) => {
    return (
        <React.Fragment>
            <MainLayout>
                <Container>
                    <div className="not-found">
                        <p className="title">404</p>
                        <p className="sub-title">OOPS! NOTHING WAS NOT FOUND</p>
                        <p className="description">The page you are looking for might been removed had its name changed</p>
                        <p className="description">or is temporarily unavailable <Link to="/" className="link">Go to home page</Link></p>
                        
                        <div className="social">
                            <ul>
                                <li><a href=""><FaTwitter size={14} className="icon" /></a></li>
                                <li><a href=""><FaFacebook size={14} className="icon" /></a></li>
                                <li><a href=""><FaInstagram size={14} className="icon" /></a></li>
                                <li><a href=""><FaYoutube size={14} className="icon" /></a></li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </MainLayout>
        </React.Fragment>
    )
}

export default NotFound;