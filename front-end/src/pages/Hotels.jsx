import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import HomeContact from "../components/HomeContact/HomeContact";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import SearchForm from "../components/SearchForm/SearchForm";
import { Col, Container, FormGroup, Row, Input } from "reactstrap";
import Hotel from "../components/Hotel/Hotel";
import Paginate from "../components/Paginate/Paginate";
import post_1 from "../assets/images/posts/post-2.jpg";
import post_2 from "../assets/images/posts/post-4.jpg";
import HotelApi from "../api/hotelApi";

const hotelListData = [
  {
    image: post_1,
    name: "Suaransena house",
    rateStars: 4.7,
    location: "279 Luna Alley Apt. 237",
    tags: ["Business", "Family", "Couple"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 299,
  },
  {
    image: post_2,
    name: "Penthouse",
    rateStars: 4.5,
    location: "90 Luna Alley Apt. 123",
    tags: ["Family", "Couple"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 199,
  },
  {
    image: post_1,
    name: "Suaransena house",
    rateStars: 4.7,
    location: "279 Luna Alley Apt. 237",
    tags: ["Business", "Family"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 299,
  },
  {
    image: post_2,
    name: "Penthouse",
    rateStars: 4.5,
    location: "90 Luna Alley Apt. 123",
    tags: ["Family", "Couple"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 199,
  },
  {
    image: post_1,
    name: "Suaransena house",
    rateStars: 4.7,
    location: "279 Luna Alley Apt. 237",
    tags: ["Business", "Family"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 299,
  },
  {
    image: post_2,
    name: "Penthouse",
    rateStars: 4.5,
    location: "90 Luna Alley Apt. 123",
    tags: ["Family", "Couple"],
    description:
      "Some quick example text to build on the card title and make up the bulk of the card content",
    price: 199,
  },
];

const Hotels = (props) => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await HotelApi.getAll();

        if (response.success) {
          setHotels(response.data.docs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotel();
  }, []);
  return (
    <MainLayout>
      <div className="hotels">
        <BreadcrumbBanner
          pageName="Hotels"
          backgroundImage={bannerBackground}
        />
        <SearchForm />
        <div className="hotels-list pt-30 pb-50">
          <Container>
            <Row className="hotels-list-top">
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                className="hotels-list-top-left"
              >
                <p>
                  We found <span>{hotels.length}</span> tours available for you
                </p>
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                xs={12}
                className="hotels-list-top-right"
              >
                <FormGroup className="hotels-list-top-right">
                  <Input
                    type="select"
                    name="hotels"
                    id="selectForm"
                    className="select-sort-by"
                  >
                    <option>Sort by</option>
                    <option value="1">Price</option>
                    <option value="2">Option</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-10">
              {hotels.map((hotel) => {
                return (
                  <Col
                    xl={4}
                    lg={4}
                    md={6}
                    xs={12}
                    className="mb-30"
                    key={hotel._id}
                  >
                    <Hotel
                      _id={hotel._id}
                      image={`${process.env.REACT_APP_API_URL}/${hotel.image}`}
                      name={hotel.title}
                      rateStars={hotel.star}
                      address={hotel.address}
                      tags={hotel.attributes}
                      description={hotel.description}
                      price={hotel.price.adult}
                    />
                  </Col>
                );
              })}
            </Row>
            <Paginate />
          </Container>
        </div>
        <HomeContact />
      </div>
    </MainLayout>
  );
};

export default Hotels;
