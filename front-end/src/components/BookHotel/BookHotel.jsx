import React, { useState } from 'react';
import './BookHotel.scss';
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import {
    Button,
    Col,
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
import CarouselSlide from '../CarouselSlide/CarouselSlide';

const BookHotel = props => {
    //Get current date and next date to fill in label
    const today = new Date();
    const tomorrow = new Date(today + 1);
    tomorrow.setDate(today.getDate() + 1);

    const [activateTab, setActiveTab] = useState("hotels");

    const toggle = (tab) => {
        if (activateTab !== tab) setActiveTab(tab);
    };
    
    return (
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} size="xl">
                <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
                    <span style={{ fontSize: '36px' }}>{props.title}</span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xl={6} lg={6} md={12} xs={12}>
                            <CarouselSlide images={props.images} />
                        </Col>
                        <Col xl={6} lg={6} md={12} xs={12} className="pt-30">
                            <TabContent activeTab={activateTab}>
                                <TabPane tabId="hotels">
                                    <FormGroup style={{ width: '100%' }}>
                                        <Row>
                                            <Col xl={6} lg={6} md={12} xs={12}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">
                                                        Check In
                                                    </label>
                                                    <Input type="date" />
                                                </div>
                                            </Col>
                                            <Col xl={6} lg={6} md={12} xs={12}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">
                                                        Check Out
                                                    </label>
                                                    <Input type="date" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    
                                    <FormGroup>
                                        <Row>
                                            <Col xl={4} lg={4} md={4} sx={6}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">Select rooms</label>
                                                    <Input type="number" value="2" />
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sx={6}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">Adult</label>
                                                    <Input type="number" value="1" />
                                                </div>
                                            </Col>
                                            <Col xl={4} lg={4} md={4} sx={6}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">Children</label>
                                                    <Input type="number" value="1" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    
                                    <FormGroup style={{ width: '100%', borderBottom: '2px solid #B0AEAE', paddingBottom: '20px' }}>
                                        <Row>
                                            <Col xl={6} lg={6} md={12} xs={12}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">Choose bed</label>
                                                    <Input type="select" name="hotels" id="selectForm">
                                                        <option>02 single beds</option>
                                                        <option value="1">04 single beds</option>
                                                    </Input>
                                                </div>
                                            </Col>
                                            <Col xl={6} lg={6} md={12} xs={12}>
                                                <div className="single__field">
                                                    <label htmlFor="selectDate">Buffet ($32/ person/ day)</label>
                                                    <Input type="number" value="4" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <div>
                                        <p style={{ fontSize: '27px', fontWeight: 'bold'}}>Summary</p>
                                        <Row>
                                            <Col xl={6}>
                                                <div style={{ display: 'flex'}}>
                                                    <span>Booking total:</span>
                                                    <span style={{ marginLeft: 'auto' }}>$198</span>
                                                </div>
                                                <div style={{ display: 'flex'}}>
                                                    <span>Buffet:</span>
                                                    <span style={{ marginLeft: 'auto' }}>$128</span>
                                                </div><hr/>
                                                <div style={{ display: 'flex'}}>
                                                    <span>Total:</span>
                                                    <span style={{ marginLeft: 'auto', color: '#FF7D3E' }}>$326</span>
                                                </div><hr/>
                                                <Button style={{ backgroundColor: '#FF7D3E', border: '1px solid #FF7D3E'}}>Book now</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
}

export default BookHotel;