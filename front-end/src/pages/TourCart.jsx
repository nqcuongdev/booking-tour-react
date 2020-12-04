import React from 'react';
import MainLayout from "../layouts/MainLayout";
import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe/Subscribe';
import Korea from "../assets/images/populars/1.jpg";
import NY from "../assets/images/populars/newyork.jpg";
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
import { MdClose } from 'react-icons/md';
import { FaGift } from 'react-icons/fa';

const cartData = [
    {
        image: Korea,
        title: 'Alaska Adventure Tour',
        checkInDate: '09/09/2020',
        checkOutDate: '11/09/2020',
        adult: 2,
        priceOfAdult: 299,
        children: 1,
        priceOfChildren: 199
    },
    {
        image: NY,
        title: 'New York Adventure Tour',
        checkInDate: '20/11/2020',
        checkOutDate: '23/11/2020',
        adult: 4,
        priceOfAdult: 299,
        children: 2,
        priceOfChildren: 199
    }
];

const calculationTotalItem = (adult, children, priceOfAdult, priceOfChildren) => {
    const total = (adult * priceOfAdult) + (children * priceOfChildren);
    return total;
}

const TourCart = props => {
    return (
        <MainLayout>
            <div className="tour-cart">
                <div className="cart-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/Tours">Tours</Link> /</span> Cart</span>
                    </Container>
                </div>

                <Container className="cart-content mt-50 mb-50">
                    <Form>
                        <div class="scroll-cart">
                            <div className="cart-col">
                                <Row className="cart-col">
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
                                {cartData.map((item) => {
                                    return (
                                        <Row className="cart-item">
                                            <Col xl={12} className="cart-title">{item.title}</Col>
                                            <div className="cart-content">
                                                <Col xl={6} lg={6} className="image-info">
                                                    <Row>
                                                        <Col xl={6} lg={6}
                                                            className="image" 
                                                            // style={{ backgroundImage: `url(${item.image})`}}
                                                        >
                                                            <img src={item.image} alt=""/>
                                                        </Col>
                                                        <Col xl={6} lg={6}>
                                                            <p>Check in date: {item.checkInDate}</p>
                                                            <p>Check out date: {item.checkOutDate}</p>
                                                            <p>Adult: {item.adult}</p>
                                                            <p>Children: {item.children}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xl={2} className="adult">
                                                    <span>
                                                        <Input type="number" value={item.adult} />
                                                        <p style={{ color: '#a8a7a7'}}>x ${item.priceOfAdult}</p>
                                                    </span>
                                                </Col>
                                                <Col xl={2} className="children">
                                                    <span>
                                                        <Input type="number" value={item.children} />
                                                        <p style={{ color: '#a8a7a7'}}>x ${item.priceOfChildren}</p>
                                                    </span>
                                                </Col>
                                                <Col xl={2} className="total">
                                                    ${calculationTotalItem(
                                                        item.adult, item.children, item.priceOfAdult, item.priceOfChildren
                                                    )}
                                                    <div className="btn-delete">
                                                        <Link><MdClose className="icon" /></Link>
                                                    </div>
                                                </Col>
                                            </div>
                                        </Row>
                                    )
                                })}
                            </div>
                        </div>
                        <Row className="total-pay">
                            <Col xl={6} lg={6} md={6} xs={12} className="input-gift">
                                <Input placeholder="Enter your coupon code"/><FaGift className="icon"/>
                            </Col>
                            <Col xl={6} lg={6} md={6} xs={12} className="total-to-pay">
                                <p>Total: <span>$2391</span></p>
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
    )
}

export default TourCart;