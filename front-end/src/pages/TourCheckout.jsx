import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link, useHistory } from "react-router-dom";
import Subscribe from "../components/Subscribe/Subscribe";
import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Table,
} from "reactstrap";
import Button from "reactstrap/lib/Button";
import AuthContext from "../contexts/auth";
import BookingApi from "../api/bookingApi";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import StripeApi from "../api/stripeApi";

const TourCheckout = (props) => {
  const user = useContext(AuthContext);
  const history = useHistory();
  const [carts, setCarts] = useState();
  const [checkoutForm, setCheckoutForm] = useState({ payment: "" });
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await BookingApi.getCarts();
        if (response.success) {
          if (response.data.length > 0) {
            setCarts(response.data);
          } else {
            history.push("/");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const makePayment = async (token) => {
    let product = {
      price: carts.map((item) => {
        if (item.code.tour) {
          let total = 0;
          return (total +=
            item.option.adult * item.code.tour.price.adult +
            item.option.child * item.code.tour.price.child);
        }
      }),
    };
    const payload = {
      token,
      product,
    };

    try {
      const response = await StripeApi.payment(payload);
      if (response.success) {
        carts.map(async (cart) => {
          let data = {
            booking_id: cart._id,
            transaction_id: response.data.id,
          };
          await BookingApi.paymentSuccess(data, cart._id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="hotel-checkout">
        <div Container className="checkout-link">
          <Container>
            <span>
              <span>
                <Link to="/">Home</Link> /
              </span>{" "}
              Checkout
            </span>
          </Container>
        </div>

        <div className="checkout-content">
          <Container className="content-top mt-50 mb-30">
            {!user && (
              <p>
                Returning customer?{" "}
                <Link to="#" className="login link">
                  Click here to login.
                </Link>
              </p>
            )}
            {/* <p>Have a coupon? <Link  to="#" className="code link">Click here to enter your code.</Link></p> */}
          </Container>

          <Container className="content-main mb-50">
            <div>
              <Row>
                <Col xl={8} lg={8} md={12} xs={12} className="content-form">
                  <p className="title">Billing detail</p>
                  {user && (
                    <div className="content">
                      <Row>
                        <Col xl={6} lg={6} md={6} xs={12}>
                          <FormGroup>
                            <Label for="firstName">
                              First name{" "}
                              <span className="required" required>
                                *
                              </span>
                            </Label>
                            <Input
                              type="text"
                              name="firstName"
                              id="firstName"
                              value={user.first_name}
                              onChange={onInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={12}>
                          <FormGroup>
                            <Label for="lastName">
                              Last name{" "}
                              <span className="required" required>
                                *
                              </span>
                            </Label>
                            <Input
                              type="text"
                              name="lastName"
                              id="lastName"
                              value={user.last_name}
                              onChange={onInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xl={6} lg={6} md={6} xs={12}>
                          <FormGroup>
                            <Label for="emailAddress">
                              Email address{" "}
                              <span className="required" required>
                                *
                              </span>
                            </Label>
                            <Input
                              type="text"
                              name="emailAddress"
                              id="emailAddress"
                              value={user.email}
                              onChange={onInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={12}>
                          <FormGroup>
                            <Label for="phoneNumber">
                              Phone number{" "}
                              <span className="required" required>
                                *
                              </span>
                            </Label>
                            <Input
                              type="text"
                              name="phoneNumber"
                              id="phoneNumber"
                              value={user.phone}
                              onChange={onInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Label for="country">
                          Country{" "}
                          <span className="required" required>
                            *
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="country"
                          id="country"
                          placeholder="Enter country"
                          onChange={onInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="address">
                          Address{" "}
                          <span className="required" required>
                            *
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter address"
                          onChange={onInputChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="zipPostcode">
                          Zip/Postcode{" "}
                          <span className="required" required>
                            *
                          </span>
                        </Label>
                        <Input
                          type="text"
                          name="zipPostcode"
                          id="zipPostcode"
                          placeholder="Enter zip code"
                          onChange={onInputChange}
                        />
                      </FormGroup>

                      <FormGroup check className="mt-20">
                        <Label check className="checkbox-custom">
                          <Input type="checkbox" /> I’m not staying here. I’m
                          making this booking for someone else.
                          <span class="checkmark"></span>
                        </Label>
                      </FormGroup>

                      <FormGroup className="mt-30">
                        <Label for="specialRequest">Special request</Label>
                        <Input
                          type="textarea"
                          name="specialRequest"
                          id="specialRequest"
                          placeholder="Enter special request"
                          onChange={onInputChange}
                        />
                      </FormGroup>
                    </div>
                  )}
                </Col>
                <Col xl={4} lg={4} md={12} xs={12} className="content-bill">
                  <div className="bill">
                    <p className="title">Your reservation</p>
                    <div className="content">
                      <Table borderless>
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="gray-text">Tour:</td>
                            <td>
                              {carts &&
                                carts.map((cart, index) => {
                                  if (cart.code.tour) {
                                    if (index === 0) {
                                      return cart.code.tour.title;
                                    } else {
                                      return `${cart.code.tour.title} /`;
                                    }
                                  }
                                })}
                            </td>
                          </tr>
                          <tr>
                            <td className="gray-text">Check in:</td>
                            <td>
                              {carts &&
                                carts.map((cart, index) => {
                                  if (cart.code.tour) {
                                    if (index === 0) {
                                      return moment(cart.checkin).format(
                                        "YYYY-MM-DD"
                                      );
                                    } else {
                                      return `${moment(cart.checkin).format(
                                        "YYYY-MM-DD"
                                      )} /`;
                                    }
                                  }
                                })}
                            </td>
                          </tr>
                          <tr>
                            <td className="gray-text">Check out:</td>
                            <td>
                              {carts &&
                                carts.map((cart, index) => {
                                  if (cart.code.tour) {
                                    if (index === 0) {
                                      return moment(cart.checkout).format(
                                        "YYYY-MM-DD"
                                      );
                                    } else {
                                      return `${moment(cart.checkout).format(
                                        "YYYY-MM-DD"
                                      )} /`;
                                    }
                                  }
                                })}
                            </td>
                          </tr>
                          <tr>
                            <td className="gray-text">Guests:</td>
                            <td>
                              <ul>
                                <li>
                                  {carts &&
                                    carts.map((cart, index) => {
                                      if (cart.code.tour) {
                                        if (index === 0) {
                                          return cart.option.adult;
                                        } else {
                                          return `${cart.option.adult} /`;
                                        }
                                      }
                                    })}{" "}
                                  Adults
                                </li>
                                <li>
                                  {carts &&
                                    carts.map((cart, index) => {
                                      if (cart.code.tour) {
                                        if (index === 0) {
                                          return cart.option.child;
                                        } else {
                                          return `${cart.option.child} /`;
                                        }
                                      }
                                    })}{" "}
                                  Children
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr>
                            <td className="gray-text">Price:</td>
                            <td>
                              <ul>
                                <li>
                                  $
                                  {carts &&
                                    carts.map((cart, index) => {
                                      if (cart.code.tour) {
                                        if (index === 0) {
                                          return cart.code.tour.price.adult;
                                        } else {
                                          return `${cart.code.tour.price.adult} /`;
                                        }
                                      }
                                    })}{" "}
                                  /Adult
                                </li>
                                <li>
                                  $
                                  {carts &&
                                    carts.map((cart, index) => {
                                      if (cart.code.tour) {
                                        if (index === 0) {
                                          return cart.code.tour.price.child;
                                        } else {
                                          return `${cart.code.tour.price.child} /`;
                                        }
                                      }
                                    })}{" "}
                                  /Children
                                </li>
                              </ul>
                            </td>
                          </tr>

                          <tr className="total">
                            <td>Total:</td>
                            <td className="orange-text">
                              ${" "}
                              {carts &&
                                carts.map((item) => {
                                  if (item.code.tour) {
                                    let total = 0;
                                    return (total +=
                                      item.option.adult *
                                        item.code.tour.price.adult +
                                      item.option.child *
                                        item.code.tour.price.child);
                                  }
                                })}
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                      <div className="pay">
                        <FormGroup check>
                          <Label check className="radio-custom">
                            <Input
                              type="radio"
                              name="payment"
                              id="paypal"
                              value="paypal"
                              onChange={onInputChange}
                            />{" "}
                            Paypal
                            <span class="checkmark"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check className="radio-custom">
                            <Input
                              type="radio"
                              name="payment"
                              id="credit_card"
                              value="credit_card"
                              onChange={onInputChange}
                            />{" "}
                            Visa Card
                            <span class="checkmark"></span>
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check className="radio-custom">
                            <Input
                              type="radio"
                              name="payment"
                              id="offline"
                              value="offline"
                              onChange={onInputChange}
                            />{" "}
                            Office
                            <span class="checkmark"></span>
                          </Label>
                        </FormGroup>
                      </div>

                      <div className="order">
                        {checkoutForm &&
                          checkoutForm.payment === "credit_card" && (
                            <StripeCheckout
                              stripeKey="pk_test_eXsyg3ccOwNKYAkVHEB9gtoY004PZD9vvq"
                              token={makePayment}
                              amount={
                                carts &&
                                carts.map((item) => {
                                  if (item.code.tour) {
                                    let total = 0;
                                    return (
                                      (total +=
                                        item.option.adult *
                                          item.code.tour.price.adult +
                                        item.option.child *
                                          item.code.tour.price.child) * 100
                                    );
                                  }
                                })
                              }
                            >
                              <Button className="btn-order" color="primary">
                                Place order
                              </Button>
                            </StripeCheckout>
                          )}
                        {(checkoutForm && checkoutForm.payment === "offline") ||
                          (checkoutForm.payment === "" && (
                            <Button className="btn-order">Place order</Button>
                          ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <Subscribe />
      </div>
    </MainLayout>
  );
};

export default TourCheckout;
