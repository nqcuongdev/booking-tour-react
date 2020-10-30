import React from "react";
import MainLayout from "../layouts/MainLayout";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import PopularTours from "../components/PopularTours/PopularTours";
import Testimonial from "../components/Testimonial/Testimonial";
import HomePost from "../components/HomePost/HomePost";
import Subscribe from "../components/Subscribe/Subscribe";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import SearchPopularDestination from "../components/SearchPopularDestination/SearchPopularDestination";

const Home = (props) => {
  return (
    <MainLayout>
      <HeroBanner />
      <PopularTours />
      <WhyChooseUs />
      <SearchPopularDestination />
      <Testimonial />
      <HomePost />
      <Subscribe />
    </MainLayout>
  );
};

export default Home;
