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
import { FaClock, FaMapMarkedAlt, FaMapMarker } from "react-icons/fa";
import banner from "../../assets/images/japan.jpg";
import "react-dates/initialize";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const HeroBanner = () => {
  const [activateTab, setActiveTab] = useState("hotels");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "check-in-out",
    },
  ]);

  const toggle = (tab) => {
    if (activateTab !== tab) setActiveTab(tab);
  };

  return (
    <div style={{ backgroundImage: `url(${banner})` }}>
      <Container>
        <Row>
          <Col md={12} style={{ minHeight: "439px" }}>
            <div className="hero__caption text-center">
              <h4>Everyday</h4>
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
                    Events
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activateTab}>
                <TabPane tabId="hotels">
                  <Form className="hotels__form">
                    <div className="field__search">
                      <Row>
                        <Col md={4} className="border-right">
                          <FormGroup>
                            <FaMapMarkedAlt size={18} />
                            <div className="form__content">
                              <label htmlFor="selectForm">Hotels</label>
                              <Input
                                type="select"
                                name="hotels"
                                id="selectForm"
                              >
                                <option>Where are you going ?</option>
                                <option value="1">
                                  <FaMapMarker size={18} /> 1
                                </option>
                                <option value="1">
                                  <FaMapMarker size={18} /> 1
                                </option>
                                <option value="1">
                                  <FaMapMarker size={18} /> 1
                                </option>
                                <option value="1">
                                  <FaMapMarker size={18} /> 1
                                </option>
                              </Input>
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={4} className="border-right">
                          <FormGroup>
                            <FaClock size={18} />
                            <div className="form__content">
                              <div className="form__date-search">
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) =>
                                    setDateRange([item.selection])
                                  }
                                  moveRangeOnFirstSelection={true}
                                  ranges={dateRange}
                                />
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
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
