import React from "react";
import MainLayout from "../layouts/MainLayout";
import background from "../assets/images/background-1.jpg";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import SearchForm from "../components/SearchForm/SearchForm";
import { Button, Container, FormGroup, Input, Row } from "reactstrap";
import { FaList, FaTh } from "react-icons/fa";

const Tours = (props) => {
  return (
    <MainLayout>
      <BreadcrumbBanner pageName="Tours" backgroundImage={background} />
      <SearchForm />
      <div className="filter__section">
        <Container>
          <Row>
            <div className="filter__section-text float-left">
              We found <span style={{ color: "#ff7d3e" }}>54</span> tours
              available for you
            </div>
            <div className="filter__section-form d-flex flex-row float-right">
              <FormGroup className="mr-2">
                <Input type="select" name="sort_by">
                  <option>Sort By</option>
                  <option value="1">Vietnam</option>
                </Input>
              </FormGroup>
              <div className="filter__section-tab-button">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Button>
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
            </div>
          </Row>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Tours;
