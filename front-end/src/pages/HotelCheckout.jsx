import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe/Subscribe';
import { Container, Row, Col, Form, Label, Input, FormGroup, Table, CustomInput } from 'reactstrap';
import Button from 'reactstrap/lib/Button';

const HotelCheckout = props => {
    return (
        <MainLayout>
            <div className="hotel-checkout">
                <div Container className="checkout-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/Hotels">Hotels</Link> /</span> Checkout</span>
                    </Container>
                </div>

                <div className="checkout-content">
                    <Container className="content-top mt-50 mb-30">
                        <p>Returning customer? <Link to="#" className="login link">Click here to login.</Link></p>
                        <p>Have a coupon? <Link  to="#" className="code link">Click here to enter your code.</Link></p>
                    </Container>

                    <Container className="content-main mb-50">
                        <Form>
                            <Row>
                                <Col xl={8} lg={8} md={12} xs={12} className="content-form">
                                    <p className="title">Billing detail</p>
                                    <div className="content">
                                        <Row>
                                            <Col xl={6} lg={6} md={6} xs={12}>
                                                <FormGroup>
                                                    <Label for="firstName">First name <span className="required" required>*</span></Label>
                                                    <Input type="text" name="firstName" id="firstName" />
                                                </FormGroup>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} xs={12}>
                                                <FormGroup>
                                                    <Label for="lastName">Last name <span className="required" required>*</span></Label>
                                                    <Input type="text" name="lastName" id="lastName" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xl={6} lg={6} md={6} xs={12}>
                                                <FormGroup>
                                                    <Label for="emailAddress">Email address <span className="required" required>*</span></Label>
                                                    <Input type="text" name="emailAddress" id="emailAddress" />
                                                </FormGroup>
                                            </Col>
                                            <Col xl={6} lg={6} md={6} xs={12}>
                                                <FormGroup>
                                                    <Label for="phoneNumber">Phone number <span className="required" required>*</span></Label>
                                                    <Input type="text" name="phoneNumber" id="phoneNumber" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup>
                                            <Label for="country">Country <span className="required" required>*</span></Label>
                                            <Input type="text" name="country" id="country" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="address">Address <span className="required" required>*</span></Label>
                                            <Input type="text" name="address" id="address" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="zipPostcode">Zip/Postcode <span className="required" required>*</span></Label>
                                            <Input type="text" name="zipPostcode" id="zipPostcode" />
                                        </FormGroup>

                                        <FormGroup check className="mt-20">
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" /> I’m not staying here. I’m making this booking for someone else.
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>

                                        <FormGroup className="mt-30">
                                            <Label for="specialRequest">Special request</Label>
                                            <Input type="textarea" name="specialRequest" id="specialRequest" />
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col xl={4} lg={4} md={12} xs={12} className="content-bill">
                                    <div className="bill">
                                        <p className="title">Your reservation</p>
                                        <div className="content">
                                            <Table borderless>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="gray-text">Hotel:</td>
                                                        <td>Suarsena House</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Room:</td>
                                                        <td>Normal room</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Check in:</td>
                                                        <td>06/07/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Check out:</td>
                                                        <td>08/07/2019</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Guests:</td>
                                                        <td>
                                                            <ul>
                                                                <li>4 Adults</li>
                                                                <li>0 Children</li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Price/day:</td>
                                                        <td>$99</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="gray-text">Buffet:</td>
                                                        <td>4 x $32</td>
                                                    </tr>

                                                    <tr className="total">
                                                        <td>Total:</td>
                                                        <td className="orange-text">$326</td>
                                                    </tr>
                                                </tbody>
                                            </Table>

                                            <div className="pay">
                                                <FormGroup check>
                                                    <Label check className="radio-custom">
                                                        <Input type="radio" name="payMethod" checked/> Cheque Payment
                                                        <span class="checkmark"></span>
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check className="radio-custom">
                                                        <Input type="radio" name="payMethod" /> Visa Card
                                                        <span class="checkmark"></span>
                                                    </Label>
                                                </FormGroup>
                                            </div>

                                            <div className="order">
                                                <Button className="btn-order">Place order</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </div>

                <Subscribe />
            </div>
        </MainLayout>
    )
}

export default HotelCheckout;