import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import Subscribe from "../components/Subscribe/Subscribe";
import hotelRoom1 from "../assets/images/hotels/hotel-1/hotel-room-1.jpg";
import hotelRoom2 from "../assets/images/hotels/hotel-1/hotel-room-2.jpg";
import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { MdClose } from "react-icons/md";
import BookingApi from "../api/bookingApi";
import moment from "moment";

const cartData = [
  {
    image: hotelRoom1,
    title: "Normal room - 28m2 - Suarsena House",
    checkInDate: "09/09/2020",
    checkOutDate: "11/09/2020",
    price: 99,
    adult: 2,
    children: 0,
    buffet: 2,
    priceOfBuffet: 32,
  },
  {
    image: hotelRoom2,
    title: "Family room - 48m2 - Suarsena House",
    checkInDate: "20/11/2020",
    checkOutDate: "23/11/2020",
    price: 299,
    adult: 2,
    children: 2,
    buffet: 6,
    priceOfBuffet: 32,
  },
];

const calculationTotalItem = (price, buffet, priceOfBuffet) => {
  const total = price + buffet * priceOfBuffet;
  return total;
};

const HotelCart = (props) => {
  const [carts, setCarts] = useState([]);

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
      <div className="hotel-cart">
        <div className="cart-link">
          <Container>
            <span>
              <span>
                <Link to="/">Home</Link> / <Link to="/Hotels">Hotels</Link> /
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
                  <span>Hotel</span>
                </Col>
                <Col xl={6} lg={6}>
                  <Row>
                    <Col xl={3} lg={3}>
                      <span>Price</span>
                    </Col>
                    <Col xl={3} lg={3}>
                      <span>Quantity</span>
                    </Col>
                    <Col xl={3} lg={3}>
                      <span>Buffet</span>
                    </Col>
                    <Col xl={3} lg={3}>
                      <span>Total</span>
                    </Col>
                  </Row>
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
                        {item.room.hotel.title}
                      </Row>
                      <Row className="cart-content">
                        <Col xl={3} lg={3} md={6} xs={12} className="image">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${item.room.hotel.image}`}
                            alt=""
                          />
                        </Col>
                        <Col xl={3} lg={3} md={6} xs={12} className="info">
                          <div>
                            <p>
                              Check in date:{" "}
                              {moment(item.checkin).format("YYYY-MM-DD")}
                            </p>
                            <p>
                              Check out date:{" "}
                              {moment(item.checkout).format("YYYY-MM-DD")}
                            </p>
                            <p>Adult: {item.option.adult}</p>
                            <p>Children: {item.option.child}</p>
                          </div>
                        </Col>
                        <Col xl={6}>
                          <Row className="row-full-height">
                            <Col xl={3} lg={3} md={3} xs={6} className="price">
                              <span className="show-hide-scale">Price</span>
                              <span>$ {item.room.price}</span>
                            </Col>
                            <Col
                              xl={3}
                              lg={3}
                              md={3}
                              xs={6}
                              className="quantity"
                            >
                              <div>
                                <span className="show-hide-scale">
                                  Quantity
                                </span>
                                <Input
                                  type="number"
                                  value={item.option.adult + item.option.child}
                                />
                              </div>
                            </Col>
                            <Col xl={3} lg={3} md={3} xs={6} className="buffet">
                              <div>
                                <span className="show-hide-scale">Buffet</span>
                                <Input type="number" value={item.number} />
                                <p>x ${item.room.options.buffer_price}</p>
                              </div>
                            </Col>
                            <Col xl={3} lg={3} md={3} xs={6} className="total">
                              <div className="price-pay">
                                <span className="show-hide-scale">Total</span>
                                <span className="scale-total">
                                  ${" "}
                                  {calculationTotalItem(
                                    item.room.price,
                                    item.number,
                                    item.room.options.buffer_price
                                  )}
                                </span>
                              </div>
                              <div className="btn-delete">
                                <Link
                                  onClick={() => removeItemInCart(item, index)}
                                >
                                  <MdClose className="icon" />
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
            </div>

            <Row className="total-pay">
              <Col xl={6} lg={6} md={6} xs={12} className="total-to-pay">
                <p>
                  Total:{" "}
                  <span>
                    ${" "}
                    {carts.map((item) => {
                      let total = 0;
                      return (total +=
                        item.room.price +
                        item.number * item.room.options.buffer_price);
                    })}
                  </span>
                </p>
              </Col>
            </Row>
            <hr className="mt-50 mb-50" />
            <div className="btn-update-checkout mb-50">
              <Button
                className="btn-checkout"
                onClick={() => props.history.push("/checkout")}
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

export default HotelCart;
