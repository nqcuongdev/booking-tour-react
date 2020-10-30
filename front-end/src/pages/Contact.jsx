import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaRegEnvelope,
  FaTwitter,
} from "react-icons/fa";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import Input from "reactstrap/lib/Input";
import Maps from "../components/Maps/Maps";
import Subscribe from "../components/Subscribe/Subscribe";
import MainLayout from "../layouts/MainLayout";

import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";

const location = {
  center: {
    lat: 15.9750157,
    lng: 108.2510487,
  },
  zoom: 17,
  address: "VKU",
};

const Contact = () => {
  return (
    <MainLayout>
      <BreadcrumbBanner pageName="About us" backgroundImage={background} />
      <div className="contact__section mt-50">
        <Container>
          <Row>
            <Col md={12} lg={4}>
              <div className="contact__section-left">
                <div className="contact__section-address mb-5">
                  <Row>
                    <div className="address-icon mr-3">
                      <FaMapMarkedAlt size={40} color="#ff7d3e" />
                    </div>
                    <div className="address-text">
                      <p>Email</p>
                    </div>
                  </Row>
                  <div className="address-block mt-1">
                    <ul>
                      <li>contact: bookingcore@gmail.com</li>
                      <li>support: bookingcore@gmail.com</li>
                    </ul>
                  </div>
                </div>
                <div className="contact__section-address mb-5">
                  <Row>
                    <div className="address-icon mr-3">
                      <FaMobileAlt size={40} color="#ff7d3e" />
                    </div>
                    <div className="address-text">
                      <p>Email</p>
                    </div>
                  </Row>
                  <div className="address-block mt-1">
                    <ul>
                      <li>contact: bookingcore@gmail.com</li>
                      <li>support: bookingcore@gmail.com</li>
                    </ul>
                  </div>
                </div>
                <div className="contact__section-address">
                  <Row>
                    <div className="address-icon mr-3">
                      <FaRegEnvelope size={40} color="#ff7d3e" />
                    </div>
                    <div className="address-text">
                      <p>Email</p>
                    </div>
                  </Row>
                  <div className="address-block mt-1">
                    <ul>
                      <li>contact: bookingcore@gmail.com</li>
                      <li>support: bookingcore@gmail.com</li>
                    </ul>
                    <hr />
                    <div className="social-icon">
                      <ul className="list-inline">
                        <li className="list-inline-item mr-3">
                          <FaFacebookF />
                        </li>
                        <li className="list-inline-item mr-3">
                          <FaTwitter />
                        </li>
                        <li className="list-inline-item mr-3">
                          <FaGithub />
                        </li>
                        <li className="list-inline-item mr-3">
                          <FaInstagram />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} lg={8}>
              <div className="contact__section-right">
                <h1 className="mb-5">Get in touch</h1>
                <div className="contact__section-contact-form">
                  <Form>
                    <FormGroup className="mb-4">
                      <Row>
                        <Col md={12} lg={6}>
                          <Input type="text" name="name" placeholder="Name" />
                        </Col>
                        <Col md={12} lg={6}>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input type="text" name="subject" placeholder="Subject" />
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input
                        type="textarea"
                        name="message"
                        rows={5}
                        placeholder="Message"
                      />
                    </FormGroup>
                    <FormGroup className="mb-5">
                      <Button color="orange">Submit</Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div
        className="google-map mt-50"
        style={{ height: "372px", width: "100%" }}
      >
        <Maps {...location} />
      </div>
      <Subscribe />
    </MainLayout>
  );
};

export default Contact;
