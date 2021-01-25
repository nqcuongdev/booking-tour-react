import React, { useContext, useEffect, useState } from "react";
import "./BookTour.scss";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import ToursApi from "../../api/toursApi";
import moment from "moment";
import AuthContext from "../../contexts/auth";
import BookingApi from "../../api/bookingApi";
import { useHistory } from "react-router-dom";

const BookTour = (props) => {
  //Get current date and next date to fill in label
  const today = new Date();
  const tomorrow = new Date(today + 1);
  tomorrow.setDate(today.getDate() + 1);

  const [activateTab, setActiveTab] = useState("tour");

  const toggle = (tab) => {
    if (activateTab !== tab) setActiveTab(tab);
  };

  const [schedules, setSchedules] = useState([]);
  const [bookForm, setBookForm] = useState({});
  const { user } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const listSchedules = await ToursApi.getSchedule(props._id);
        if (listSchedules.success) {
          setSchedules(listSchedules.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSchedule();
  }, []);

  const onBookFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "code") {
      let price = schedules.filter((schedule) => schedule._id === value);

      setBookForm({
        ...bookForm,
        [name]: value,
        price: price[0],
      });
    } else {
      setBookForm({ ...bookForm, [name]: value });
    }
  };

  const onBooking = async () => {
    let data = {
      code: bookForm.code,
      checkin: bookForm.price.start,
      checkout: bookForm.price.end,
      user: user._id,
      option: {
        child: bookForm.child,
        adult: bookForm.adult,
      },
    };

    try {
      const response = await BookingApi.book(data);
      if (response.success) {
        history.push("/tour-cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} size="xl">
      <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
        <span style={{ fontSize: "36px" }}>{props.title}</span>
        <div>
          <ul>
            {props.attributes.map((option, index) => {
              if (index === 0) {
                return <li>{option.title}</li>;
              } else {
                return (
                  <li>
                    <span>•</span>
                    {option.title}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </ModalHeader>
      <ModalBody>
        <p className="table-title">
          The tour price will change according to bellow schedule
        </p>
        <Table bordered>
          <thead>
            <tr className="table-title">
              <th>Code</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Duration</th>
              <th>Available seats</th>
              <th>Price per Adult</th>
              <th>Price per Child</th>
            </tr>
          </thead>
          <tbody>
            {schedules &&
              schedules.map((schedule) => {
                return (
                  <tr className="table-content" key={schedule._id}>
                    <th scope="row">{schedule.title}</th>
                    <td>{moment(schedule.start).format("YYYY-MM-DD")}</td>
                    <td>{moment(schedule.end).format("YYYY-MM-DD")}</td>
                    <td>{schedule.tour.duration}</td>
                    <td>{schedule.available}</td>
                    <td>${schedule.tour.price.adult}</td>
                    <td>${schedule.tour.price.child}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <p className="book-tour mt-50 mb-20">Book tour</p>

        <FormGroup>
          <Row>
            <Col xl={3} lg={4} md={4} xs={12}>
              <div className="single__field">
                <label htmlFor="code">Code</label>
                <Input
                  className="code-select"
                  type="select"
                  name="code"
                  id="code"
                  onChange={onBookFormChange}
                  required
                >
                  <option>Select One</option>
                  {schedules &&
                    schedules.map((schedule) => {
                      return (
                        <option
                          key={schedule._id} 
                          value={schedule._id}
                        >
                          {schedule.title}
                        </option>
                      );
                    })}
                </Input>
              </div>
            </Col>
            <Col xl={2} lg={3} md={4} sx={6}>
              <div className="single__field">
                <label htmlFor="adult">Adult</label>
                <Input
                  type="number"
                  placeholder="Enter number adult"
                  name="adult"
                  id="adult"
                  required
                  onChange={onBookFormChange}
                />
              </div>
            </Col>
            <Col xl={2} lg={3} md={4} sx={6}>
              <div className="single__field">
                <label htmlFor="child">Children</label>
                <Input
                  type="number"
                  placeholder="Enter number children"
                  name="child"
                  id="child"
                  required
                  onChange={onBookFormChange}
                />
              </div>
            </Col>
            <Col
              xl={4}
              lg={4}
              md={12}
              sx={12}
              style={{
                backgroundColor: "#F8F8F8",
                padding: "30px 20px 40px 20px",
              }}
            >
              <div>
                <p style={{ fontSize: "27px", fontWeight: "bold" }}>Summary</p>
                <Row>
                  <Col xl={12}>
                    <div style={{ display: "flex" }}>
                      <span>Adults</span>
                      {bookForm && bookForm.price && (
                        <span style={{ marginLeft: "auto" }}>
                          {bookForm.adult} x ${bookForm.price.tour.price.adult}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex" }}>
                      <span>Children</span>
                      {bookForm && bookForm.price && (
                        <span style={{ marginLeft: "auto" }}>
                          {bookForm.child} x ${bookForm.price.tour.price.child}
                        </span>
                      )}
                    </div>
                    <hr />
                    <div style={{ display: "flex" }}>
                      <span>Total:</span>
                      {bookForm && bookForm.price && (
                        <span style={{ marginLeft: "auto", color: "#FF7D3E" }}>
                          $
                          {bookForm.adult * bookForm.price.tour.price.adult +
                            bookForm.child * bookForm.price.tour.price.child}
                        </span>
                      )}
                    </div>
                    <br />
                    <Button
                      style={{
                        backgroundColor: "#FF7D3E",
                        border: "1px solid #FF7D3E",
                      }}
                      onClick={onBooking}
                    >
                      Book now
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </FormGroup>
      </ModalBody>
    </Modal>
  );
};

export default BookTour;
