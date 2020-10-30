import React from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import Testimonial from "../components/Testimonial/Testimonial";
import OurMember from "../components/OurMember/OurMember";
import Feature from "../components/Feature/Feature";

import background from "../assets/images/background-1.jpg";

const About = (props) => {
    return (
        <MainLayout>
            <BreadcrumbBanner pageName="About us" backgroundImage={background} />
            <OurMember />
            <Feature />
            <Testimonial />
        </MainLayout>
    );
}

export default About;