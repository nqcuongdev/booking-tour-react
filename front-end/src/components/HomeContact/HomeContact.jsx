import React from 'react';
import './HomeContact.scss';
import { Container, Row, Col } from 'reactstrap';
import { AiFillPhone } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import airbnb_logo from '../../assets/images/our-partners/airbnb-logo.png';
import travelloka_logo from '../../assets/images/our-partners/travelloka-logo.png';
import vietravel_logo from '../../assets/images/our-partners/vietravel-logo.png';
import saigontourist_logo from '../../assets/images/our-partners/saigontourist-logo.png';

const HomeContact = () => {
    return (
        <div className="footer-contact">
            <Container>
                <Row>
                    <Col lg='4' md='4' className="footer-contact-left">
                        <p className="title-item">Book by Phone</p>
                        <div className="phone">
                            <AiFillPhone size={19} />
                            <div className="phone-info">
                                <span>0900000090</span>
                                <p>Booking time: 08:00 - 22:00</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg='4' md='4' className="footer-contact-mid">
                        <p className="title-item">Give your Feedback</p>
                        <div className="mail">
                            <FiMail size={19} />
                            <div className="mail-info">
                                <span>support@bookingcore.com</span>
                                <p>Let leave your travel plan to travel experts!</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg='4' md='4' className="footer-contact-right">
                        <p className="title-item">Our Partners</p>
                        <ul className="our-partners">
                            <li><a href=""><img src={airbnb_logo}></img></a></li>
                            <li><a href=""><img src={travelloka_logo}></img></a></li>
                            <li><a href=""><img src={vietravel_logo}></img></a></li>
                            <li><a href=""><img src={saigontourist_logo}></img></a></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeContact;