import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import Subscribe from "../components/Subscribe/Subscribe";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { MdClose } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import BookingApi from "../api/bookingApi";
import moment from "moment";
import { useHistory } from "react-router-dom";

const TourCart = (props) => {
  const [carts, setCarts] = useState();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await BookingApi.getCarts();
        if (response.success) {
          setCarts(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);
  const history = useHistory();

  const calculationTotalItem = (
    adult,
    children,
    priceOfAdult,
    priceOfChildren
  ) => {
    const total = adult * priceOfAdult + children * priceOfChildren;

    return total;
  };

  const removeItemInCart = async (item, index) => {
    let newCart = carts.splice(0, index);

    try {
      const response = await BookingApi.deleteItemInCart(item._id);
      if (response.success) {
        setCarts(newCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="tour-cart">
        <div className="cart-link">
          <Container>
            <span>
              <span>
                <Link to="/">Home</Link> / <Link to="/Tours">Tours</Link> /
              </span>{" "}
              Cart
            </span>
          </Container>
        </div>

        <Container className="cart-content mt-50 mb-50">
          <Form>
            <div className="cart-col">
              <Row>
                <Col xl={6} lg={6}>
                  <span>Product</span>
                </Col>
                <Col xl={2} lg={2}>
                  <span>Adult</span>
                </Col>
                <Col xl={2} lg={2}>
                  <span>Children</span>
                </Col>
                <Col xl={2} lg={2}>
                  <span>Total</span>
                </Col>
              </Row>
            </div>

            <div className="cart-list">
              {carts &&
                carts.map((item, index) => {
                  return (
                    <div className="cart-item">
                      <Row
                        xl={12}
                        lg={12}
                        md={12}
                        xs={12}
                        className="cart-title"
                      >
                        {item.title}
                      </Row>
                      <Row className="cart-content">
                        <Col xl={3} lg={3} md={6} xs={12} className="image">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${item.code.tour.image}`}
                            alt={item.code.title}
                          />
                        </Col>
                        <Col xl={3} lg={3} md={6} xs={12} className="info">
                          <div>
                            <p>
                              Checkin:{" "}
                              {moment(item.checkin).format("YYYY-MM-DD")}
                            </p>
                            <p>
                              Checkout:{" "}
                              {moment(item.checkout).format("YYYY-MM-DD")}
                            </p>
                          </div>
                        </Col>
                        <Col xl={2} lg={2} md={4} xs={4} className="adult">
                          <div>
                            <span className="show-hide-scale">Adult</span>
                            <Input type="number" value={item.option.adult} />
                            <p>x ${item.code.tour.price.adult}</p>
                          </div>
                        </Col>
                        <Col xl={2} lg={2} md={4} xs={4} className="children">
                          <div>
                            <span className="show-hide-scale">Children</span>
                            <Input type="number" value={item.option.child} />
                            <p>x ${item.code.tour.price.child}</p>
                          </div>
                        </Col>
                        <Col xl={2} lg={2} md={4} xs={4} className="total">
                          <div className="price">
                            <span className="show-hide-scale">Total</span>
                            <span classnames="scale-total">
                              ${" "}
                              {calculationTotalItem(
                                item.option.adult,
                                item.option.child,
                                item.code.tour.price.adult,
                                item.code.tour.price.child
                              )}
                            </span>
                          </div>
                          <div className="btn-delete">
                            <Link onClick={() => removeItemInCart(item, index)}>
                              <MdClose className="icon" />
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
            </div>

            <Row className="total-pay">
              {/* <Col xl={6} lg={6} md={6} xs={12} className="input-gift">
                                <Input placeholder="Enter your coupon code"/><FaGift className="icon"/>
                            </Col> */}
              <Col xl={6} lg={6} md={6} xs={12} className="total-to-pay">
                <p>
                  Total:{" "}
                  {carts && (
                    <span>
                      ${" "}
                      {carts.map((item) => {
                        let total = 0;
                        return (total +=
                          item.option.adult * item.code.tour.price.adult +
                          item.option.child * item.code.tour.price.child);
                      })}
                    </span>
                  )}
                </p>
              </Col>
            </Row>
            <hr className="mt-50 mb-50" />
            <div className="btn-update-checkout mb-50">
              {/* <Button className="btn-update-cart">Update cart</Button> */}
              <Button
                className="btn-checkout"
                onClick={() => history.push("/checkout")}
              >
                Proceed to checkout
              </Button>
            </div>
          </Form>
        </Container>

        <Subscribe />
      </div>
    </MainLayout>
  );
};

export default TourCart;
