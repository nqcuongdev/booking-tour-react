import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
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
import banner from "../../assets/images/background-1.jpg";
import Button from "reactstrap/lib/Button";
import { FaCalendarCheck, FaHotel, FaTicketAlt } from "react-icons/fa";
import DestinationApi from "../../api/destinationsApi";
import HotelApi from "../../api/hotelApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HeroBanner = (props) => {
  const [destinations, setDestinations] = useState([]);
  const history = useHistory();
  //Get current date and next date to fill in label
  const today = new Date();
  const tomorrow = new Date(today + 1);
  tomorrow.setDate(today.getDate() + 1);

  const [activateTab, setActiveTab] = useState("hotels");
  const [destination, setDestination] = useState();

  const toggle = (tab) => {
    if (activateTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await DestinationApi.getAll();
        if (response.success) {
          setDestinations(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDestinations();
  }, []);

  const onSearchHotel = async (url) => {
    history.push(url);
  };

  return (
    <div style={{ backgroundImage: `url(${banner})` }} className="hero__banner">
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
                  <Row>
                    <Col sm={6} md={3}>
                      <FormGroup>
                        <div className="single__field">
                          <label htmlFor="selectForm" className="ml-3 title">
                            Where
                          </label>
                          <Input
                            type="select"
                            name="hotels"
                            id="selectForm"
                            onChange={(e) =>
                              setDestination({ destination: e.target.value })
                            }
                          >
                            <option>Select place</option>
                            {destinations.map((destination) => {
                              return (
                                <option
                                  key={destination._id}
                                  value={destination._id}
                                >
                                  {destination.title}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={5}>
                      <FormGroup>
                        <Row>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3 title">
                                Check In
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3 title">
                                Check Out
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>

                    <Col sm={6} md={2}>
                      <FormGroup>
                        <Row>
                          <Col lg={6} md={12} xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="numberTitle1">Adult</label>
                              <Input type="number" value="1" />
                            </div>
                          </Col>
                          <Col lg={6} md={12} xs={6}>
                            <div className="single__field title">
                              <label htmlFor="selectDate" className="numberTitle2">Children</label>
                              <Input type="number" value="1" />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={2} className="mt-2">
                      <FormGroup onClick={() => onSearchHotel("hotels")}>
                        <Button color="orange">SEARCH</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="tours">
                  <Row>
                    <Col sm={6} md={5}>
                      <FormGroup>
                        <div className="single__field">
                          <label htmlFor="selectForm" className="ml-3">
                            Where
                          </label>
                          <Input type="select" name="hotels" id="selectForm">
                            <option>Select place</option>
                            {destinations.map((destination) => {
                              return (
                                <option
                                  key={destination._id}
                                  value={destination._id}
                                >
                                  {destination.title}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={5}>
                      <FormGroup>
                        <Row>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3">
                                From
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3">
                                To
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={2} className="mt-2">
                      <FormGroup onClick={() => onSearchHotel("tours")}>
                        <Button color="orange">SEARCH</Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="events">
                  <Row>
                    <Col sm={6} md={5}>
                      <FormGroup>
                        <div className="single__field">
                          <label htmlFor="selectForm" className="ml-3">
                            Where
                          </label>
                          <Input type="select" name="hotels" id="selectForm">
                            <option>Select place</option>
                            {destinations.map((destination) => {
                              return (
                                <option
                                  key={destination._id}
                                  value={destination._id}
                                >
                                  {destination.title}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={5}>
                      <FormGroup>
                        <Row>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3">
                                From
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                          <Col xs={6}>
                            <div className="single__field">
                              <label htmlFor="selectDate" className="ml-3">
                                To
                              </label>
                              <Input type="date" />
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm={6} md={2} className="mt-2">
                      <FormGroup onClick={() => onSearchHotel("events")}>
                        <Button color="orange">SEARCH</Button>
                      </FormGroup>
                    </Col>
                  </Row>
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
