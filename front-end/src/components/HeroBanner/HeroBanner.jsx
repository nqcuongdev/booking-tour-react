import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import "./HeroBanner.scss";
import banner from "../../assets/images/japan.jpg";
import Button from "reactstrap/lib/Button";
import { FaCalendarCheck, FaHotel, FaTicketAlt } from "react-icons/fa";

const HeroBanner = () => {
  //Get current date and next date to fill in label
  const today = new Date();
  const tomorrow = new Date(today + 1);
  tomorrow.setDate(today.getDate() + 1);

  const [activateTab, setActiveTab] = useState("hotels");

  const toggle = (tab) => {
    if (activateTab !== tab) setActiveTab(tab);
  };

  return (
    <div style={{ backgroundImage: `url(${banner})` }}>
      <Container>
        <Row>
          <Col md={12} style={{ minHeight: "439px" }}>
            <div className="hero__caption text-center">
              <h1>Everyday</h1>
              <h4>a new adventure</h4>
            </div>
            <div className="hero__form-search">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activateTab === "hotels" ? "active" : ""}
                    onClick={() => {
                      toggle("hotels");
                    }}
                  >
                    <FaHotel size={18} className="mr-2" />
                    Hotels
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activateTab === "tours" ? "active" : ""}
                    onClick={() => {
                      toggle("tours");
                    }}
                  >
                    <FaTicketAlt size={18} className="mr-2" />
                    Tours
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activateTab === "events" ? "active" : ""}
                    onClick={() => {
                      toggle("events");
                    }}
                  >
                    <FaCalendarCheck size={18} className="mr-2" />
                    Events
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activateTab}>
                <TabPane tabId="hotels">
                  <Form className="main__form">
                    <div className="field__search">
                      <Row>
                        <FormGroup className="col-sm-6 col-md-3">
                          <label htmlFor="selectForm">Hotels</label>
                          <Input type="select" name="hotels" id="selectForm">
                            <option>Where ?</option>
                            <option value="1">Vietnam</option>
                          </Input>
                        </FormGroup>
                        <FormGroup className="col-sm-6 col-md-5">
                          <Row>
                            <Col xs={6}>
                              <label htmlFor="selectDate">Check In</label>
                              <Input type="date" />
                            </Col>
                            <Col xs={6}>
                              <label htmlFor="selectDate">Check Out</label>
                              <Input type="date" />
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup className="col-sm-6 col-md-2">
                          <Row>
                            <Col xs={6}>
                              <label htmlFor="selectDate">Adult</label>
                              <Input type="number" value="1" />
                            </Col>
                            <Col xs={6}>
                              <label htmlFor="selectDate">Children</label>
                              <Input type="number" value="1" />
                            </Col>
                          </Row>
                        </FormGroup>
                        <FormGroup className="col-sm-6 col-md-2 fix__height">
                          <Button color="orange">SEARCH</Button>
                        </FormGroup>
                      </Row>
                    </div>
                  </Form>
                </TabPane>
                <TabPane tabId="tours">
                  <Form>
                    <div className="field__content">
                      <Row></Row>
                    </div>
                  </Form>
                </TabPane>
                <TabPane tabId="events">
                  <Form>
                    <h1>Tab 3</h1>
                  </Form>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
