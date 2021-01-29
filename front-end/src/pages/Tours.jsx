import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import SearchForm from "../components/SearchForm/SearchForm";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Paginate from "../components/Paginate/Paginate";
import adImage from "../assets/images/ad.png";
import AdItem from "../components/AdItem/AdItem";
import SingleListItem from "../components/SingleListItem/SingleListItem";
import ToursApi from "../api/toursApi";
import { useRouteMatch } from "react-router-dom";
import Pagination from "react-js-pagination";

const popularItem = {
  text1: "Summer Stay",
  text2: "for single couple",
  image: adImage,
};

const Tours = (props) => {
  //phân trang
  const [pagination, setPagination] = useState();
  //console.log(pagination)

  const [toursList, setToursList] = useState([]);
  const [oldTours, setOldTours] = useState([]);

  let [totalPages, setTotalPages] = useState();
  let [totalDocs, setTotalDocs] = useState();

  useEffect(() => {
    const fetchToursList = async () => {
      try {
        // const response = await ToursApi.getAll();
        const response = await ToursApi.getPaginate(pagination);
        console.log(response);
        if (response.success) {
          setToursList(response.data.docs);
          setOldTours(response.data.docs);

          setTotalPages(response.data.totalPages)
          setTotalDocs(response.data.totalDocs);
        }
      } catch (error) {
        console.log("Failed to fetch Tours list: ", error);
      }
    };

    fetchToursList();
  }, [pagination]);

  // lấy đường dẫn hiện tại
  const { url } = useRouteMatch();

  const onSearchForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "title") {
      let searchTour = toursList.filter((tour) => {
        return tour.title.includes(value);
      });
      setToursList(searchTour);
    } else if (name === "destination") {
      let searchTour = toursList.filter((tour) => {
        return tour.destination.title.includes(value);
      });
      setToursList(searchTour);
    } else {
      setToursList(oldTours);
    }

    if (value === "") {
      setToursList(oldTours);
    }
  };

  console.log(toursList)

  return (
    <MainLayout>
      <BreadcrumbBanner pageName="Tours" backgroundImage={background} />
      {/* <SearchForm /> */}
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
                      <Input
                        type="text"
                        placeholder="Search keyword"
                        name="title"
                        onChange={onSearchForm}
                      />
                      <InputGroupText addonType="append">
                        <FaSearch className="mr-1" />
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label>Where?</label>
                    <InputGroup>
                      <Input
                        type="text"
                        placeholder="Location"
                        name="destination"
                        onChange={onSearchForm}
                      />
                      <InputGroupText addonType="append">
                        <FaMapMarkerAlt className="mr-1" />
                      </InputGroupText>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label>Start date</label>
                    <Input type="date" name="checkin" onChange={onSearchForm} />
                  </FormGroup>
                </Form>
              </div>
              <AdItem {...popularItem} />
            </Col>
            <Col md={6} lg={9}>
              <div className="list__tour-text">
                We found{" "}
                <span style={{ color: "#ff7d3e" }}>
                  {toursList ? totalDocs : 0}
                </span>{" "}
                tours available for you
              </div>

              {toursList.map((item) => {
                return <SingleListItem {...item} url={url} />;
              })}
            </Col>
          </Row>
          <div className="mb-50">
            {/* <Paginate /> */}
            <div className="pagination-bar text-center">
              {totalDocs > 0 &&
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  activePage={pagination}
                  itemsCountPerPage={10}
                  totalItemsCount={totalDocs}
                  pageRangeDisplayed={totalPages}
                  onChange={(page) => setPagination(page)}
                />
              }
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Tours;
