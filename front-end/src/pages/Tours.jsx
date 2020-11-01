import React from "react";
import MainLayout from "../layouts/MainLayout";
import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import SearchForm from "../components/SearchForm/SearchForm";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";
import { FaList, FaTh } from "react-icons/fa";
import image from "../assets/images/hawaii-secret-beach.jpg";
import ThumbnailTourItem from "../components/ThumbnailTourItem/ThumbnailTourItem";
import Paginate from "../components/Paginate/Paginate";

const data = [
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
    sale: 25,
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
    saleToday: 25,
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    image: image,
    option: {
      during: 2,
      place: "Port Canaveral",
    },
  },
];

const Tours = (props) => {
  return (
    <MainLayout>
      <BreadcrumbBanner pageName="Tours" backgroundImage={background} />
      <SearchForm />
      <div className="list__tours">
        <Container>
          <div className="filter__section pt-20 pb-30">
            <div className="filter__section-text float-left">
              We found <span style={{ color: "#ff7d3e" }}>54</span> tours
              available for you
            </div>
            <div className="filter__section-form mr-3 float-right">
              <Row>
                <FormGroup className="mr-2">
                  <Input type="select" name="sort_by">
                    <option>Sort By</option>
                    <option value="1">Vietnam</option>
                  </Input>
                </FormGroup>
                <div className="filter__section-tab-button">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <Button color="orange">
                        <FaTh />
                      </Button>
                    </li>
                    <li className="list-inline-item">
                      <Button>
                        <FaList />
                      </Button>
                    </li>
                  </ul>
                </div>
              </Row>
            </div>
          </div>
          <div className="list__tours-list pt-50 pb-60">
            <Row>
              {data.map((item) => {
                return (
                  <Col lg={4} md={6} className="mb-30">
                    <ThumbnailTourItem {...item} />
                  </Col>
                );
              })}
            </Row>
          </div>
          <Paginate />
        </Container>
      </div>
    </MainLayout>
  );
};

export default Tours;
