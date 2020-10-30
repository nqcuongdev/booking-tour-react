import React from 'react';
import './Footer.scss';
import FooterInfo from './FooterInfo/FooterInfo';
import FooterSocial from './FooterSocial/FooterSocial';

const Footer = (props) => {
    return (
        <div className="global-footer">
            <footer>
                <FooterInfo />
                <FooterSocial />
            </footer>
        </div>
    )
}

export default Footer;