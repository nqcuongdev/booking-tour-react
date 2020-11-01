import React from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import Testimonial from "../components/Testimonial/Testimonial";
import OurMember from "../components/OurMember/OurMember";
import Feature from "../components/Feature/Feature";
import ContactForm from "../components/ContactForm/ContactForm";
import Subscribe from "../components/Subscribe/Subscribe";
import bannerBackground from "../assets/images/background-1.jpg";
import contactFormBackground from "../assets/images/backgrounds/cloud-background.png";
import { Col, Container, Row } from "reactstrap";

const About = (props) => {
    return (
        <MainLayout>
            <BreadcrumbBanner pageName="About us" backgroundImage={bannerBackground} />
            <OurMember />
            <Feature />
            <Testimonial />

            <div className="contact-form-about-page mt-50 pt-50" style={{ backgroundImage: `url(${contactFormBackground})` }}>
                <Container>
                    <Row>
                        <Col lg={5} md={5} xs={12} style={{ marginTop: '40px' }}>
                            <p style={{ fontSize: '35px'}}>Contact</p>
                            <p style={{ maxWidth: '90%', color: '#a8a7a7' }}>
                                If you’d like to chat about working on a project together, or learn mỏe about working with us, 
                                If you’d like to chat about working on a project together, or learn mỏe about working with us,
                                <span style={{ color: '#ff7d3e' }}> get in touch</span>
                            </p>
                        </Col>
                        <Col lg={7} md={7} xs={12}>
                            <ContactForm />
                        </Col>
                    </Row>
                </Container>
            </div>

            <Subscribe />
        </MainLayout>
    );
}

export default About;