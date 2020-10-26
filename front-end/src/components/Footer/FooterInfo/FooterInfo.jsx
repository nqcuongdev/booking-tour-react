import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FaTwitter } from 'react-icons/fa';
import './FooterInfo.scss'

const FooterInfo = (props) => {
    return (
        <div className="footer-info">
            <Container>
                <Row>
                    <Col lg='8' md='8' xs='6' className="footer-info-left">
                        <ul>
                            <li>
                                <ul>
                                    <li className="li-bold">CONTACT INFORMATION</li>
                                    <li>Nam Ky Khoi Nghia, Da Nang</li>
                                    <li>contact@bookingcore.com</li>
                                    <li>19001000</li>
                                    <li className="website-address"><a href="#">www.bookingcore.com</a></li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li className="li-bold">ABOUT</li>
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">Before you go</a></li>
                                    <li><a href="#">Online check in</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li className="li-bold">QUICK LINKS</li>
                                    <li><a href="#">Reviews</a></li>
                                    <li><a href="#">Feedback</a></li>
                                    <li><a href="#">Goals</a></li>
                                    <li><a href="#">Check-ins</a></li>
                                </ul>
                            </li>
                        </ul>
                    </Col>
                    <Col lg='4' md='4' xs='6' className='footer-info-right'>
                        <div className="text-box make">
                            <span className="text">Tớ là <span className="text-orange">Chou Deptrai</span>, không ai có thể chối cãi điều đó, vì nó là sự thật :v</span>
                        </div>
                        <Row className="twitter-icon">
                            <FaTwitter size={20} color={'#005aff'} className="icon" />
                            <div className="twitter-name">
                                <span>Chou Deptrai</span>
                                <p>/ CEO</p>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FooterInfo;