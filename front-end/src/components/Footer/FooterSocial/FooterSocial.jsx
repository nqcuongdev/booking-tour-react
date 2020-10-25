import React from 'react';
import './FooterSocial.scss';
import { Row, Col } from 'reactstrap';
import { GiIsland } from 'react-icons/gi';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterSocial = () => {
    return (
        <div className="footer-info">
            <Col lg='6' md='6' className="footer-info-left">
                <div className="">
                    <GiIsland size={40} color={'#FF7D3E'} /><span className="copy-right"> © 2020 Booking Core. All Rights Reserved.</span>
                </div>
            </Col>
            <Col lg='6' md='6' className="footer-info-right">
                <ul>
                    <li><a href=""><FaTwitter size={17} className="icon" /> Twitter</a></li>
                    <li><a href=""><FaFacebook size={17} className="icon" /> Facebook</a></li>
                    <li><a href=""><FaInstagram size={17} className="icon" /> Instagram</a></li>
                    <li><a href=""><FaYoutube size={17} className="icon" /> YouTube</a></li>
                </ul>
            </Col>
        </div>
    );
}

export default FooterSocial;