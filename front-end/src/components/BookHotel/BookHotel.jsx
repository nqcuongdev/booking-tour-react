import React, { useContext, useState } from "react";
import "./BookHotel.scss";
import { IoIosClose } from "react-icons/io";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import CarouselSlide from "../CarouselSlide/CarouselSlide";
import BookingApi from "../../api/bookingApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../../contexts/auth";

const BookHotel = (props) => {
  //Get current date and next date to fill in label
  const today = new Date();
  const tomorrow = new Date(today + 1);
  tomorrow.setDate(today.getDate() + 1);

  const [activateTab, setActiveTab] = useState("hotels");

  const toggle = (tab) => {
    if (activateTab !== tab) setActiveTab(tab);
  };

  const [bookForm, setBookForm] = useState({});
  const history = useHistory();
  const user = useContext(AuthContext);

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let data = {
        room: props._id,
        checkin: bookForm.checkin,
        checkout: bookForm.checkout,
        user: user.user._id,
        option: {
          child: bookForm.child,
          adult: bookForm.adult,
        },
        number: bookForm.buffer_price,
      };
      const response = await BookingApi.book(data);
      if (response.success) {
        history.push("/hotel-cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={props.isOpen} toggle={props.toggle} size="xl">
        <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
          <span style={{ fontSize: "36px" }}>{props.title}</span>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col xl={6} lg={6} md={12} xs={12}>
                <CarouselSlide images={[props.images]} />
              </Col>
              <Col xl={6} lg={6} md={12} xs={12} className="pt-30">
                <TabContent activeTab={activateTab}>
                  <TabPane tabId="hotels">
                    <FormGroup style={{ width: "100%" }}>
                      <Row>
                        <Col xl={6} lg={6} md={12} xs={12}>
                          <div className="single__field">
                            <label htmlFor="selectDate">Check In</label>
                            <Input
                              type="date"
                              name="checkin"
                              onChange={onInputChange}
                            />
                          </div>
                        </Col>
                        <Col xl={6} lg={6} md={12} xs={12}>
                          <div className="single__field">
                            <label htmlFor="selectDate">Check Out</label>
                            <Input
                              type="date"
                              name="checkout"
                              onChange={onInputChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup>
                      <Row>
                        <Col xl={6} lg={6} md={6} sx={6}>
                          <div className="single__field">
                            <label htmlFor="selectDate">Adult</label>
                            <Input
                              type="number"
                              placeholder="Enter number adult"
                              name="adult"
                              onChange={onInputChange}
                            />
                          </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} sx={6}>
                          <div className="single__field">
                            <label htmlFor="selectDate">Children</label>
                            <Input
                              type="number"
                              placeholder="Enter number child"
                              name="child"
                              onChange={onInputChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup
                      style={{
                        width: "100%",
                        borderBottom: "2px solid #B0AEAE",
                        paddingBottom: "20px",
                      }}
                    >
                      <Row>
                        <Col xl={12} lg={12} md={12} xs={12}>
                          <div className="single__field">
                            <label htmlFor="selectDate">
                              Buffet (${props.options.buffer_price}/ person/
                              day)
                            </label>
                            <Input
                              type="number"
                              placeholder="Enter number people use buffer"
                              name="buffer_price"
                              onChange={onInputChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>

                    <div>
                      <p style={{ fontSize: "27px", fontWeight: "bold" }}>
                        Summary
                      </p>
                      <Row>
                        <Col xl={6}>
                          <div style={{ display: "flex" }}>
                            <span>Booking total:</span>
                            <span style={{ marginLeft: "auto" }}>
                              ${props.price}
                            </span>
                          </div>
                          <div style={{ display: "flex" }}>
                            <span>Buffet:</span>
                            <span style={{ marginLeft: "auto" }}>
                              ${" "}
                              {bookForm.buffer_price *
                                props.options.buffer_price}
                            </span>
                          </div>
                          <hr />
                          <div style={{ display: "flex" }}>
                            <span>Total:</span>
                            <span
                              style={{ marginLeft: "auto", color: "#FF7D3E" }}
                            >
                              $
                              {props.price +
                                bookForm.buffer_price *
                                  props.options.buffer_price}
                            </span>
                          </div>
                          <hr />
                          <Button
                            style={{
                              backgroundColor: "#FF7D3E",
                              border: "1px solid #FF7D3E",
                            }}
                            onClick={onSubmitForm}
                          >
                            Book now
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BookHotel;
