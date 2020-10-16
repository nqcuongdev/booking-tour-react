import React from 'react';
import './FooterSocial.scss';
import { Row, Col } from 'reactstrap';
import { GiIsland } from 'react-icons/gi';

const FooterSocial = () => {
    return (
        <div className="footer-info">
            <Row>
                <Col lg='6' md='6' className="footer-info-left">
                    <GiIsland size={40} color={'#FF7D3E'} /><span className="">© 2020 Booking Core.</span>
                </Col>
                <Col lg='6' md='6' className="footer-info-right">
                    
                </Col>
            </Row>
        </div>
    );
}

export default FooterSocial;