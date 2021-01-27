import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import HomeContact from "../components/HomeContact/HomeContact";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import SearchForm from "../components/SearchForm/SearchForm";
import { Col, Container, FormGroup, Row, Input } from "reactstrap";
import Hotel from "../components/Hotel/Hotel";
import Paginate from "../components/Paginate/Paginate";
import HotelApi from "../api/hotelApi";
import { useRouteMatch } from "react-router-dom";
import Pagination from "react-js-pagination";

const Hotels = (props) => {
  //phân trang
  const [pagination, setPagination] = useState()
  //console.log(pagination)

  const [hotels, setHotels] = useState([]);

  let [totalPages, setTotalPages] = useState();
  let [totalDocs, setTotalDocs] = useState();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await HotelApi.getAll(pagination);

        //console.log(response)
        if (response.success) {
          setHotels(response.data.docs);

          setTotalPages(response.data.totalPages)
          setTotalDocs(response.data.totalDocs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotel();
  }, [pagination]);

  // lấy đường dẫn hiện tại
  const { url } = useRouteMatch();

  return (
    <MainLayout>
      <div className="hotels">
        <BreadcrumbBanner
          pageName="Hotels"
          backgroundImage={bannerBackground}
        />
        {/* <SearchForm /> */}
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
                      slug={hotel.slug}
                      url={url}
                    />
                  </Col>
                );
              })}
            </Row>
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
          </Container>
        </div>
        <HomeContact />
      </div>
    </MainLayout>
  );
};

export default Hotels;
