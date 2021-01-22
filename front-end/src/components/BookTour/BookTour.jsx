import React, { useState } from 'react';
import './BookTour.scss';
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
    Table,
} from "reactstrap";

const BookTour = props => {
    //Get current date and next date to fill in label
    const today = new Date();
    const tomorrow = new Date(today + 1);
    tomorrow.setDate(today.getDate() + 1);

    const [activateTab, setActiveTab] = useState("tour");

    const toggle = (tab) => {
        if (activateTab !== tab) setActiveTab(tab);
    };
    
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} size="xl">
            <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
                <span style={{ fontSize: '36px' }}>{props.title}</span>
                <ul>
                    {props.optionsTags.map((option, index) => {
                        if (index === 0) {
                            return (
                                <li>{option}</li>
                            )
                        } else {
                            return (
                                <li><span>•</span>{option}</li>
                            )
                        }
                    })}
                </ul>
            </ModalHeader>
            <ModalBody>
                <p className="table-title">The tour price will change according to bellow schedule</p>
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
                        <tr className="table-content">
                            <th scope="row">AL1</th>
                            <td>2020 - 09 - 02</td>
                            <td>2020 - 09 - 02</td>
                            <td>3 days 2 nights</td>
                            <td>16 / 30</td>
                            <td>2020 - 09 - 02</td>
                            <td>$99</td>
                        </tr>
                        <tr className="table-content">
                            <th scope="row">AL2</th>
                            <td>2020 - 09 - 02</td>
                            <td>2020 - 09 - 02</td>
                            <td>3 days 2 nights</td>
                            <td>16 / 30</td>
                            <td>2020 - 09 - 02</td>
                            <td>$99</td>
                        </tr>
                        <tr className="table-content">
                            <th scope="row">AL3</th>
                            <td>2020 - 09 - 02</td>
                            <td>2020 - 09 - 02</td>
                            <td>3 days 2 nights</td>
                            <td>16 / 30</td>
                            <td>2020 - 09 - 02</td>
                            <td>$99</td>
                        </tr>
                        <tr className="table-content">
                            <th scope="row">AL4</th>
                            <td>2020 - 09 - 02</td>
                            <td>2020 - 09 - 02</td>
                            <td>3 days 2 nights</td>
                            <td>16 / 30</td>
                            <td>2020 - 09 - 02</td>
                            <td>$99</td>
                        </tr>
                    </tbody>
                </Table>

                <p className="book-tour mt-50 mb-20">Book tour</p>
                
                <FormGroup>
                    <Row>
                        <Col xl={2} lg={2} md={3} xs={12}>
                            <div className="single__field">
                                <label htmlFor="selectDate">Code</label>
                                <Input type="select" name="hotels" id="selectForm">
                                    <option>AL1</option>
                                    <option value="1">AL2</option>
                                    <option value="1">AL3</option>
                                    <option value="1">AL4</option>
                                </Input>
                            </div>
                        </Col>
                        <Col xl={2} lg={2} md={3} sx={6}>
                            <div className="single__field">
                                <label htmlFor="selectDate">Adult</label>
                                <Input type="number" value="2" />
                            </div>
                        </Col>
                        <Col xl={2} lg={2} md={3} sx={6}>
                            <div className="single__field">
                                <label htmlFor="selectDate">Children</label>
                                <Input type="number" value="1" />
                            </div>
                        </Col>
                        <Col xl={2} lg={2} md={3} sx={6}>
                            <div className="single__field">
                                <label htmlFor="selectDate">Infant</label>
                                <Input type="number" value="1" />
                            </div>
                        </Col>
                        <Col xl={4} lg={4} md={12} sx={12} 
                            style={{ backgroundColor: '#F8F8F8', padding: '30px 20px 40px 20px'}}>
                            <div>
                                <p style={{ fontSize: '27px', fontWeight: 'bold'}}>Summary</p>
                                <Row>
                                    <Col xl={12}>
                                        <div style={{ display: 'flex'}}>
                                            <span>Adults</span>
                                            <span style={{ marginLeft: 'auto' }}>2 x $299</span>
                                        </div>
                                        <div style={{ display: 'flex'}}>
                                            <span>Childrent</span>
                                            <span style={{ marginLeft: 'auto' }}>$199</span>
                                        </div><hr/>
                                        <div style={{ display: 'flex'}}>
                                            <span>Total:</span>
                                            <span style={{ marginLeft: 'auto', color: '#FF7D3E' }}>$797</span>
                                        </div><br />
                                        <Button style={{ backgroundColor: '#FF7D3E', border: '1px solid #FF7D3E'}}>
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
}

export default BookTour;