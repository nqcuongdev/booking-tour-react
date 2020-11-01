import React from "react";
import "./SearchForm.scss";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";

const SearchForm = (props) => {
  return (
    <div className="search__form mt-20 mb-20">
      <Container>
        <Row>
          <Col sm={6} md={3}>
            <FormGroup>
              <div className="single__field">
                <label htmlFor="selectForm" className="ml-3">
                  Keyword ?
                </label>
                <Input type="select" name="hotels" id="selectForm">
                  <option>Hawaii</option>
                  <option value="1">Vietnam</option>
                </Input>
              </div>
            </FormGroup>
          </Col>
          <Col sm={6} md={3}>
            <FormGroup>
              <div className="single__field">
                <label htmlFor="selectForm" className="ml-3">
                  Where ?
                </label>
                <Input type="select" name="hotels" id="selectForm">
                  <option>Hawaii</option>
                  <option value="1">Vietnam</option>
                </Input>
              </div>
            </FormGroup>
          </Col>
          <Col sm={6} md={3}>
            <FormGroup>
              <div className="single__field">
                <label htmlFor="selectForm" className="ml-3">
                  Start date
                </label>
                <Input type="date" />
              </div>
            </FormGroup>
          </Col>
          <Col sm={6} md={2} className="mt-2">
            <FormGroup>
              <Button color="orange">SEARCH</Button>
            </FormGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchForm;
