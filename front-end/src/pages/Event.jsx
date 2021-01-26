import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import { Container, Card, CardImg, CardText, CardBody, Row, CardTitle,
        CardSubtitle, Button, CardImgOverlay, Col, FormGroup, Label, Input,
        Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { RiStarSFill } from 'react-icons/ri';
import { MdLocationOn } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';
import { server_url } from "../helpers/url";
import { Link } from "react-router-dom";
import { FaEvernote } from "react-icons/fa";
import InputRange from 'react-input-range';
import { FaStar } from "react-icons/fa";
import EventItem from "../components/EventItem/EventItem"; 

let eventsData = [
    {
        discount: '86',
        location: 'San Francisco',
        title: 'Event of Washington D.C Hightlights',
        excellent: '4.7',
        startTime: '17:00',
        date: '12 Jun 2020',
        image: 'uploads/destinations/1606788178646.jpg',
        time: '2',
        price: '399'
    },
    {
        discount: '50',
        location: 'Paris',
        title: 'Event of Paris Hightlights',
        excellent: '4.5',
        startTime: '17:00',
        date: '12 Jun 2020',
        image: 'uploads/destinations/1606788178646.jpg',
        time: '2',
        price: '399'
    },
    {
        discount: '65',
        location: 'Los Angeles',
        title: 'Event of Los Angeles Hightlights',
        excellent: '5',
        startTime: '17:00',
        date: '12 Jun 2020',
        image: 'uploads/destinations/1606788178646.jpg',
        time: '2',
        price: '399'
    }
]

const Event = (props) => {
    // filter range price
    const [rangeFilter, setRangeFilter] = useState({
        value: 100,
        value1: {
            min: 100,
            max: 550,
        }
    })
    //console.log(rangeFilter)

    //dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <React.Fragment>
            <MainLayout>
                <HeroBanner />
                <div className="events mt-50 mb-50">
                    <Container>
                        <Row>
                            <Col lg={3} className="filter-bar">
                                <div className="filter-form">
                                    <p className="title">FILTER BY</p> <hr/>
                                    <p className="sub-title">Filter Price</p> <br/>
                                    <div>
                                        <InputRange
                                            maxValue={1000}
                                            minValue={0}
                                            formatLabel={value => `${value} $`}
                                            value={rangeFilter.value1}
                                            onChange={value => setRangeFilter({ value1: value })}
                                            onChangeComplete={value => console.log(value)} 
                                        />
                                    </div> <br/> <hr/>

                                    <p className="sub-title">Review Score</p>
                                    <div className="review-score">
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" />
                                                <span>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                </span>
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" />
                                                <span>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                </span>
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" />
                                                <span>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                </span>
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" />
                                                <span>
                                                    <FaStar className="icon"/>
                                                    <FaStar className="icon"/>
                                                </span>
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" />
                                                <span>
                                                    <FaStar className="icon"/>
                                                </span>
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                    </div> <hr/>

                                    <p className="sub-title">Event Type</p>
                                    <div className="event-type">
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" /> Field Day
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" /> Glastonbury
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" /> Green Man
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check className="checkbox-custom">
                                                <Input type="checkbox" /> Latitude
                                                <span class="checkmark"></span>
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={9} className="vents-content">
                                <Row className="mb-10">
                                    <Col lg={6}>
                                        <p>We found <span style={{color: 'orange'}}>13</span> tours available for you</p>
                                    </Col>
                                    <Col lg={6} className="dropdown-filter text-right">
                                        <span>Sort by</span>
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret>
                                                Recommended
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header>Something</DropdownItem>
                                                <DropdownItem>Something</DropdownItem>
                                                <DropdownItem text>Something Text</DropdownItem>
                                                <DropdownItem disabled>Something disabled</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>Something Action</DropdownItem>
                                                <DropdownItem>Something Action</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    {eventsData.map( event => {
                                        return (
                                            <Col lg={4}>
                                                <EventItem 
                                                    discount={event.discount}
                                                    location={event.location}
                                                    title={event.title}
                                                    excellent={event.excellent}
                                                    startTime={event.startTime}
                                                    date={event.date}
                                                    image={event.image}
                                                    time={event.time}
                                                    price={event.price}
                                                />
                                            </Col>  
                                        );
                                    })}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MainLayout>
        </React.Fragment>
    );
};

export default Event;
