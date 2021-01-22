import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import Subscribe from "../components/Subscribe/Subscribe";
import hotelRoom1 from "../assets/images/hotels/hotel-1/hotel-room-1.jpg";
import hotelRoom2 from "../assets/images/hotels/hotel-1/hotel-room-2.jpg";
import {
  Button,
  Col,
  Container,
  CustomInput,
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
import { MdClose } from "react-icons/md";
import { FaGift } from "react-icons/fa";

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
                  <span>Product</span>
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
              {cartData.map((item) => {
                return (
                  <div className="cart-item">
                    <Row xl={12} lg={12} md={12} xs={12} className="cart-title">
                      {item.title}
                    </Row>
                    <Row className="cart-content">
                      <Col xl={3} lg={3} md={6} xs={12} className="image">
                        <img src={item.image} alt="" />
                      </Col>
                      <Col xl={3} lg={3} md={6} xs={12} className="info">
                        <div>
                          <p>Check in date: {item.checkInDate}</p>
                          <p>Check out date: {item.checkOutDate}</p>
                          <p>Adult: {item.adult}</p>
                          <p>Children: {item.children}</p>
                        </div>
                      </Col>
                      <Col xl={6}>
                        <Row className="row-full-height">
                          <Col xl={3} lg={3} md={3} xs={6} className="price">
                            <span className="show-hide-scale">Price</span>
                            <span>$ {item.price}</span>
                          </Col>
                          <Col xl={3} lg={3} md={3} xs={6} className="quantity">
                            <div>
                              <span className="show-hide-scale">Quantity</span>
                              <Input
                                type="number"
                                value={item.adult + item.children}
                              />
                            </div>
                          </Col>
                          <Col xl={3} lg={3} md={3} xs={6} className="buffet">
                            <div>
                              <span className="show-hide-scale">Buffet</span>
                              <Input type="number" value={item.buffet} />
                              <p>x ${item.priceOfBuffet}</p>
                            </div>
                          </Col>
                          <Col xl={3} lg={3} md={3} xs={6} className="total">
                            <div className="price-pay">
                              <span className="show-hide-scale">Total</span>
                              <span className="scale-total">
                                ${" "}
                                {calculationTotalItem(
                                  item.price,
                                  item.buffet,
                                  item.priceOfBuffet
                                )}
                              </span>
                            </div>
                            <div className="btn-delete">
                              <Link>
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
              <Col xl={6} lg={6} md={6} xs={12} className="input-gift">
                <Input placeholder="Enter your coupon code" />
                <FaGift className="icon" />
              </Col>
              <Col xl={6} lg={6} md={6} xs={12} className="total-to-pay">
                <p>
                  Total: <span>$ 653</span>
                </p>
              </Col>
            </Row>
            <hr className="mt-50 mb-50" />
            <div className="btn-update-checkout mb-50">
              <Button className="btn-update-cart">Update cart</Button>
              <Button className="btn-checkout">Proceed to checkout</Button>
            </div>
          </Form>
        </Container>

        <Subscribe />
      </div>
    </MainLayout>
  );
};

export default HotelCart;
