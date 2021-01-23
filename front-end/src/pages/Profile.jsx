import React, { useState, useContext } from 'react';
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import { Row, Col, Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import classnames from 'classnames';
import { server_url } from "../helpers/url";
import AuthContext from "../contexts/auth";
import { dateToYMD } from "../helpers/format";

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
                    <p className="mt-50 title text-uppercase">Your Information</p>

                    <Row className="user-info pt-20 pb-50">
                        <Col lg={3} md={3} xs={6} className="avatar">
                            <img src={server_url + user.image} />
                        </Col>

                        <Col lg={9} md={9} xs={6} className="information">
                            <p className="name">{user.full_name}</p>
                            <p className="member">Member since {date}</p>

                            <div className="row">
                                <Col lg={6} md={6} xs={12}>
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

                                <Col lg={6} md={6} xs={12}>
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
                    <p className="mt-50 title text-uppercase">Booking History</p>

                    <Row className="user-booking pt-20 pb-50">
                        <Col lg={9} md={9} xs={6} className="avatar">
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
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12"><br/>
                                                <Card body>
                                                    <CardTitle>Tours</CardTitle>
                                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                    <Button>Go somewhere</Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12"><br/>
                                                <Card body>
                                                    <CardTitle>Hotels</CardTitle>
                                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                    <Button>Go somewhere</Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>

                        <Col lg={3} md={3} xs={6} className="form-contact">
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