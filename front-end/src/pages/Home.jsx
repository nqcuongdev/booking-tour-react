import React from "react";
import MainLayout from "../layouts/MainLayout";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PopularTours from "../components/PopularTours/PopularTours";
import AdsBanner from "../components/AdsBanner/AdsBanner";
import TopDestination from "../components/TopDestination/TopDestination";
import Testimonial from "../components/Testimonial/Testimonial";
import HomePost from "../components/HomePost/HomePost";
import Subscribe from "../components/Subscribe/Subscribe";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import HomeContact from "../components/HomeContact/HomeContact";

const Home = (props) => {
  return (
    <MainLayout>
      <HeroBanner />
      <PopularTours />
      <WhyChooseUs />
      <AdsBanner />
      <TopDestination />
      <Testimonial />
      <HomePost />
      <Subscribe />
      <HomeContact />
    </MainLayout>
  );
};

export default Home;
