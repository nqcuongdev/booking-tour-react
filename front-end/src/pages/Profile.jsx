import React, { useState, useContext } from 'react';
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import { Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import classnames from 'classnames';
import AuthContext from "../contexts/auth";
import { dateToYMD } from "../helpers/format";
import {
    FaMapMarkerAlt,
    FaStarHalfAlt, 
    FaStar, 
    FaRegStar
} from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";

const Profile = (props) => {
    const context = useContext(AuthContext)
    const user = context.user
    const books = context.books

    var date = dateToYMD(new Date(user.created_at))

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    // chưa login thì chuyển về trang chủ
    if (user.full_name === undefined) {
        return <Redirect to='/'/>;
    }

    return (
        <MainLayout>
            <div className="profile">
                <BreadcrumbBanner pageName="Your Profile" backgroundImage={bannerBackground} />
                <Container className="mt-20">
                    <Row>
                        <p className="mt-50 title text-uppercase">Your Information</p>
                    </Row>
                    <Row className="user-info pt-30 pb-30">
                        <Col lg={3} md={3} xs={12} className="avatar">
                            <img src={`${process.env.REACT_APP_API_URL}/${user.image}`} />
                        </Col>

                        <Col lg={9} md={9} xs={12} className="information">
                            <p className="name">{user.full_name}</p> <br/>
                            {/* <p className="member">Member since {date}</p> */}

                            <div className="row">
                                <Col xl={6} lg={12} md={12} xs={12}>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li className="li-bold">Email:</li>
                                                <li className="li-bold">Phone:</li>
                                                <li className="li-bold">Paypal Email:</li>
                                                <li className="li-bold">Home Airport:</li>
                                                <li className="li-bold">Address:</li>
                                                <li className="li-bold">Website:</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li>{user.email}</li>
                                                <li>{user.phone}</li>
                                                <li>{user.email ? user.email : `Null`}</li>
                                                <li>{user.address ? user.address : `Null`}</li>
                                                <li>{user.address ? user.address : `Null`}</li>
                                                <li>{user.website ? user.website : `Null`}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Col>

                                <Col xl={6} lg={12} md={12} xs={12}>
                                    <ul>
                                        <li>
                                            <ul>
                                                <li className="li-bold">Verifications</li>
                                                <li className="li-bold">Phone</li>
                                                <li className="li-bold">Email</li>
                                                <li className="li-bold">ID Card</li>
                                                <li className="li-bold">Travel Certificate</li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul>
                                                <li className="li-bold"></li>
                                                <li className="verified">verified</li>
                                                <li className="verified">verified</li>
                                                <li className="verified">verified</li>
                                                <li className="not-verified">Not verified</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container className="mt-20">
                    <Row>
                        <p className="mt-50 title text-uppercase">Booking History</p>
                    </Row>

                    <Row className="user-booking pt-20 pb-50">
                        <Col lg={12} md={12} xs={12} className="avatar">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Tours
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Hotels
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={activeTab} className="booking-list">
                                    <TabPane tabId="1">
                                        {books.map(book => {
                                            return (
                                                book.code &&
                                                    <Row className="booking-item mt-30">
                                                        <Col lg={4} md={4} xs={12} 
                                                            style={{ 
                                                                backgroundImage: `url(${process.env.REACT_APP_API_URL}/${book.code.tour.image[0]})`, 
                                                                backgroundSize: `cover`,
                                                                height: `230px`}}
                                                            className="booking-item-image"
                                                        >
                                                            {/* <img src={process.env.REACT_APP_API_URL + `/uploads/destinations/1606788178646.jpg`} /> */}
                                                        </Col>
                                                        <Col lg={8} md={8} xs={12} className="booking-item-content">
                                                            <ul>
                                                                <li className="li-bold">{book.code.tour.title}</li>
                                                                <li>{book.code.tour.address}</li>
                                                                {/* <li>
                                                                    <span>Tour star </span>
                                                                    <span className="stars-icon">
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" />
                                                                    </span>
                                                                    <span> 5 of 5 (3 comments)</span>
                                                                </li> */}
                                                                <li>Duration: {book.code.tour.duration}</li>
                                                                <li>Checkin: {dateToYMD(new Date(book.checkin))}</li>
                                                                <li>Checkout: {dateToYMD(new Date(book.checkout))}</li>
                                                                <li>Option: {book.option.adult} adult and {book.option.child} child</li>
                                                                <li>Total price: <span className="price"> ${book.total_price}</span></li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                            )
                                        })}
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {books.map(book => {
                                            return (
                                                book.room &&
                                                    <Row className="booking-item mt-30">
                                                        <Col lg={4} md={4} xs={12} 
                                                            style={{ 
                                                                backgroundImage: `url(${process.env.REACT_APP_API_URL}/${book.room.hotel.image[0]})`, 
                                                                backgroundSize: `cover`,
                                                                height: `230px`}}
                                                            className="booking-item-image"
                                                        >
                                                            {/* <img src={process.env.REACT_APP_API_URL + `/uploads/destinations/1606788178646.jpg`} /> */}
                                                        </Col>
                                                        <Col lg={8} md={8} xs={12} className="booking-item-content">
                                                            <ul>
                                                                <li className="li-bold">{book.room.hotel.title}</li>
                                                                <li>{book.room.hotel.address}</li>
                                                                {/* <li>
                                                                    <span>Hotel star </span>
                                                                    <span className="stars-icon">
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" /> 
                                                                        <FaStar className="icon" />
                                                                    </span>
                                                                    <span> 5 of 5 (3 comments)</span>
                                                                </li> */}
                                                                <li className="li-group">
                                                                    <ul>
                                                                        <li>Room: {book.room.title}</li>
                                                                        <li>Adults: {book.option.adult}</li>
                                                                        <li>Childrents: {book.option.child}</li>
                                                                    </ul>
                                                                </li>
                                                                <li>Check-in: {dateToYMD(new Date(book.checkin))}</li>
                                                                <li>Check-out: {dateToYMD(new Date(book.checkout))}</li>
                                                                {/* <li>Buffets: $128</li> */}
                                                                <li>Price: <span className="price"> ${book.total_price}</span></li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                            )
                                        })}
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>

                        {/* <Col lg={3} md={12} xs={12} className="form-contact">
                            <Card body>
                                <CardTitle><h5>Contact</h5></CardTitle> <hr/>
                                <Form>
                                    <FormGroup>
                                        <Label for="name">Your name</Label>
                                        <Input type="text" name="name" id="name" placeholder="Enter name" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Your email</Label>
                                        <Input type="email" name="email" id="email" placeholder="Enter email" required/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Message">Message</Label>
                                        <Input type="textarea" name="Message" id="Message" required />
                                    </FormGroup>
                                    <FormGroup className="text-center"><br/>
                                        <Button className="btn-orange">Send Message</Button>
                                    </FormGroup>
                                </Form>
                            </Card>
                        </Col> */}
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Profile;