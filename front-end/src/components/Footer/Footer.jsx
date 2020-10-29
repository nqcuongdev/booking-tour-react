import React from 'react';
import './Footer.scss';
import FooterInfo from './FooterInfo/FooterInfo';
import FooterSocial from './FooterSocial/FooterSocial';
import FooterContact from './FooterContact/FooterContact';

const Footer = (props) => {
    return (
        <div className="global-footer">
            <footer>
                <FooterContact />
                <FooterInfo />
                <FooterSocial />
            </footer>
        </div>
    )
}

export default Footer;