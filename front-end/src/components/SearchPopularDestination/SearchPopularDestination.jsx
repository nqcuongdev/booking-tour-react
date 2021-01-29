import React, { useState } from "react";
import "./SearchPopularDestination.scss";
import {
  Button,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import hawaii from "../../assets/images/thumbnails/hawaii.jpg";
import tahi from "../../assets/images/thumbnails/tahi.jpg";
import vn from "../../assets/images/thumbnails/vn.jpg";
import ThumbnailImage from "../ThumbnailImage/ThumbnailImage";
import { FaSearch } from "react-icons/fa";
import Select from 'react-select';

const data = [
  {
    title: "Paris",
    image: hawaii,
  },
  {
    title: "Viet Nam",
    image: vn,
  },
  {
    title: "ThaiLand",
    image: tahi,
  },
  {
    title: "Hawaii",
    image: vn,
  },
  {
    title: "Tokyo",
    image: tahi,
  },
  {
    title: "",
    image: hawaii,
  }
];

const options = [
  { value: 'vietnam', label: 'Vietnam' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'korea', label: 'Korea' },
  { value: 'japan', label: 'Japan' },
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'USA' },
];

const SearchPopularDestination = (props) => {
  const [selected, setSelected] = useState({ selectedOption: null })
  
  const handleChange = selectedOption => {
    setSelected({ selectedOption });
    console.log({selectedOption});
  };

  return (
    <div className="search__popular mt-50">
      <Container>
        <Row>
          <Col md={6} lg={6}>
            <h1 className="title-text">Search our most popular destinations</h1>
            <p className="description-text">
              Vivavivu is a Multipurpose Sketch temp with 06 homepages. This
              template allows you to easily and effectively create your very own
              travel booking website to offer hotel, tours, car and cruise
              bookings in minutes...
            </p>
            <InputGroup className="mb-5" style={{ width: "65%" }}>
              {/* <Input type="text" name="search" placeHolder="Search..." /> */}
              <Select
                // defaultValue={options[0]}
                // value={selected}
                onChange={handleChange}
                options={options}
                placeholder="Search..."
                isSearchable={true}
              />
              <InputGroupAddon addonType="append">
                <Button>
                  <Link to="/destinations">
                    <FaSearch size={13} />
                  </Link>
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <div className="mb-5">
              <Link className="btn-read-more" to="/destinations">
                <span className="read-more-text">
                  View all places <BsArrowRightShort />
                </span>
              </Link>
            </div>
          </Col>
          <Col md={6} lg={6}>
            <Row>
              {data.map((item) => {
                return (
                  <Col xs={6} md={6} lg={4}>
                    <ThumbnailImage {...item} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPopularDestination;
