import React, { useEffect, useState } from "react";
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
import SearchPopularDestination from "../components/SearchPopularDestination/SearchPopularDestination";
import { Container, Row, Col } from "reactstrap";
import TourItem from "../components/TourItem/TourItem";

import testimonialBackground from "../assets/images/backgrounds/cloud-background.png";
import DestinationApi from "../api/destinationsApi";
import ToursApi from "../api/toursApi";

const Home = (props) => {
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const listDestination = await DestinationApi.getAll();
        if (listDestination.success) {
          setDestinations(listDestination.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTours = async () => {
      try {
        const listTour = await ToursApi.getAll();
        if (listTour.success) {
          setTours(listTour.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestination();
    fetchTours();
  }, []);

  return (
    <React.Fragment>
      <MainLayout>
        <HeroBanner />
        {destinations && <PopularTours data={destinations} />}
        <WhyChooseUs />
        <SearchPopularDestination />
        <AdsBanner />
        <div className="promotion__tours mt-50">
          <Container>
            <div className="promotion__tours-title text-center">
              <h1>Our best promotion tours</h1>
              <p>Most popular destinations</p>
            </div>
            <div className="promotion__tours-list-item">
              <Row>
                {tours.slice(0, 6).map((item) => {
                  return (
                    <Col lg={4} md={6} className="mb-30" key={item._id}>
                      <TourItem {...item} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Container>
        </div>
        <TopDestination />
        <Testimonial backgroundImage={testimonialBackground} />
        <HomePost />
        <Subscribe />
        <HomeContact />
      </MainLayout>
    </React.Fragment>
  );
};

export default Home;
