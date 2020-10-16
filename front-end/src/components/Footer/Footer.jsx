import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './Footer.scss'
import { FaTwitter } from 'react-icons/fa';

import FooterInfo from './FooterInfo/FooterInfo';
import FooterSocial from './FooterSocial/FooterSocial';

const Footer = (props) => {
    return (
        <div className="global-footer">
            <Container>
                <footer>
                    <FooterInfo />
                    <hr className="global-footer-separator" />
                    <FooterSocial />
                </footer>
            </Container>
        </div>
    )
}

export default Footer;