import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './Footer.scss'

const Footer = (props) => {
    return (
        <div className="global-footer">
            <Container>
                <footer>
                    <div className="footer-wide">
                        <div className="footer-info">
                            <Row>
                                <Col lg='9' className="footer-info-left">
                                    <ul>
                                        <li>
                                            <ul>
                                                <li className="li-title">CONTACT INFORMATION</li>
                                                <li>87 Nguyễn Đình Hiến, Đà Nẵng</li>
                                                <li>contact@bookingcore.com</li>
                                                <li>09000000000</li>
                                                <li className="website-address">www.bookingcore.com</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="li-title">ABOUT</li>
                                                <li>About us</li>
                                                <li>Before you go</li>
                                                <li>Online check in</li>
                                                <li>FAQ</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="li-title">QUICK LINKS</li>
                                                <li>Reviews</li>
                                                <li>Feedback</li>
                                                <li>Goals</li>
                                                <li>Check-ins</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg='3' className='footer-info-right'>
                                    <div className="text-box make">
                                        <span className="text">Tớ là Chou đẹp trai, không ai có thể chối cãi điều đó :v</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="footer-social">
                            
                        </div>
                    </div>
                </footer>
            </Container>
        </div>
    )
}

export default Footer;