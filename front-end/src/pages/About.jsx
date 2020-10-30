import React from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import Testimonial from "../components/Testimonial/Testimonial";
import OurMember from "../components/OurMember/OurMember";
import Feature from "../components/Feature/Feature";

const About = (props) => {
    return (
        <MainLayout>
            <BreadcrumbBanner pageName="About us" />
            <OurMember />
            <Feature />
            <Testimonial />
        </MainLayout>
    );
}

export default About;