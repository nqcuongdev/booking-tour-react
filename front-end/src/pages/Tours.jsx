import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import SearchForm from "../components/SearchForm/SearchForm";
import {
  Button,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { FaList, FaMapMarkerAlt, FaSearch, FaTh } from "react-icons/fa";
import image from "../assets/images/hawaii-secret-beach.jpg";
import ThumbnailTourItem from "../components/ThumbnailTourItem/ThumbnailTourItem";
import Paginate from "../components/Paginate/Paginate";
import adImage from "../assets/images/ad.png";
import AdItem from "../components/AdItem/AdItem";
import SingleListItem from "../components/SingleListItem/SingleListItem";
import ToursApi from "../api/toursApi";

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

const dummyData = [
  {
    title: "The Bahamas",
    price: 299,
    description:
      "Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively inutes...",
    image: image,
    option: {
      day: 4,
      night: 5,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    description:
      "Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively inutes...",
    image: image,
    option: {
      day: 4,
      night: 5,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    description:
      "Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively inutes...",
    image: image,
    option: {
      day: 4,
      night: 5,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    description:
      "Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively inutes...",
    image: image,
    option: {
      day: 4,
      night: 5,
      place: "Port Canaveral",
    },
  },
  {
    title: "The Bahamas",
    price: 299,
    description:
      "Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively inutes...",
    image: image,
    option: {
      day: 4,
      night: 5,
      place: "Port Canaveral",
    },
  },
];

const popularItem = {
  text1: "Summer Stay",
  text2: "for single couple",
  image: adImage,
};

const Tours = (props) => {
  const [toursList, setToursList] = useState([]);

  useEffect(() => {
    const fetchToursList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,

        };
        const response = await ToursApi.getAll(params);
        console.log(response);
        setToursList(response.data);
      } catch (error) {
        console.log('Failed to fetch Tours list: ', error);
      }
    }

    fetchToursList();
  }, []);

  return (
    <MainLayout>
      <BreadcrumbBanner pageName="Tours" backgroundImage={background} />
      <SearchForm />
      <div className="list__tours mt-50">
        <Container>
          {/* <div className="filter__section pt-20 pb-30">
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
          </div> */}
          <Row>
            <Col md={6} lg={3}>
              <div className="filter__section-search-form">
                <h4 className="title mb-4">Search tours</h4>
                <Form>
                  <FormGroup>
                    <InputGroup>
                      <Input type="text" placeholder="Search keyword" />
                      <InputGroupText addonType="append">
                        <FaSearch className="mr-1" />
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label>Where?</label>
                    <InputGroup>
                      <Input type="text" placeholder="Location" />
                      <InputGroupText addonType="append">
                        <FaMapMarkerAlt className="mr-1" />
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label>Start date</label>
                    <Input type="date" />
                  </FormGroup>
                  <FormGroup className="text-center">
                    <Button
                      color="orange"
                      className="mt-3"
                      style={{ width: "auto" }}
                    >
                      Search
                    </Button>
                  </FormGroup>
                </Form>
              </div>
              <div className="filter__section-category mt-50">
                <h4 className="title">Popular destinations</h4>
                <ul className="list-category mt-3">
                  <li>
                    <div className="cs-checkbox">
                      <label>
                        <input type="checkbox" id="cat_id" value="1" />
                        Check this custom checkbox
                        <span className="check__mark"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="cs-checkbox">
                      <label>
                        <input type="checkbox" id="cat_id" value="1" />
                        Check this custom checkbox
                        <span className="check__mark"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="cs-checkbox">
                      <label>
                        <input type="checkbox" id="cat_id" value="1" />
                        Check this custom checkbox
                        <span className="check__mark"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="cs-checkbox">
                      <label>
                        <input type="checkbox" id="cat_id" value="1" />
                        Check this custom checkbox
                        <span className="check__mark"></span>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="cs-checkbox">
                      <label>
                        <input type="checkbox" id="cat_id" value="1" />
                        Check this custom checkbox
                        <span className="check__mark"></span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <AdItem {...popularItem} />
            </Col>
            <Col md={6} lg={9}>
              <div className="list__tour-text">
                We found <span style={{ color: "#ff7d3e" }}>54</span> tours
                available for you
              </div>

              {dummyData.map((item) => {
                return <SingleListItem {...item} />;
              })}
            </Col>
          </Row>
          <div className="mb-50">
            <Paginate />
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Tours;
