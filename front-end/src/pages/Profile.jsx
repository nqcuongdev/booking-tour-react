import React, { useState, useContext } from 'react';
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import { Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import classnames from 'classnames';
import { server_url } from "../helpers/url";
import AuthContext from "../contexts/auth";
import { dateToYMD } from "../helpers/format";
import {
    FaMapMarkerAlt,
    FaStarHalfAlt, 
    FaStar, 
    FaRegStar
} from "react-icons/fa";

const Profile = (props) => {
    const context = useContext(AuthContext)
    const user = context.user
    //console.log(user)
    var date = dateToYMD(new Date(user.created_at))

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
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
                            <img src={server_url + user.image} />
                        </Col>

                        <Col lg={9} md={9} xs={12} className="information">
                            <p className="name">{user.full_name}</p>
                            <p className="member">Member since {date}</p>

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
                        <Col lg={9} md={12} xs={12} className="avatar">
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
                                        <Row className="booking-item mt-30">
                                            <Col lg={4} md={4} xs={12}>
                                                <img src={server_url + user.image} />
                                            </Col>
                                            <Col lg={8} md={8} xs={12}>
                                                <ul>
                                                    <li className="li-bold">A Paris walk to Remember</li>
                                                    <li>124 E Huron St, New york</li>
                                                    <li>
                                                        Tour star <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 5 of 5 (3 comments)
                                                    </li>
                                                    <li>Travellers: 30 people</li>
                                                    <li>Date: 12 Jun 2020</li>
                                                    <li>Booking details: 29 user booker</li>
                                                    <li>Price: $299</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row className="booking-item mt-30">
                                            <Col lg={4} md={4} xs={12}>
                                                <img src={server_url + user.image} />
                                            </Col>
                                            <Col lg={8} md={8} xs={12}>
                                                <ul>
                                                    <li className="li-bold">A Paris walk to Remember</li>
                                                    <li>124 E Huron St, New york</li>
                                                    <li>
                                                        Tour star <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 
                                                        <FaStar /> 5 of 5 (3 comments)
                                                    </li>
                                                    <li>Travellers: 30 people</li>
                                                    <li>Date: 12 Jun 2020</li>
                                                    <li>Booking details: 29 user booker</li>
                                                    <li>Price: $299</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>

                        <Col lg={3} md={12} xs={12} className="form-contact">
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Profile;