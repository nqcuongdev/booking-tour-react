import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import Select from 'react-select';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';

const BasicInputElements = () => {
    const [itinerary, setItinerary] = useState([1]);
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col lg={9}>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input type="text" name="title" id="title" placeholder="Tour title" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Description</Label>
                                <RichTextEditor name="description" id="description" onEditorContentChange={() => {}} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Select
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="category"
                                    id="category"
                                    options={[
                                        { value: 'chocolate', label: 'Chocolate' },
                                        { value: 'strawberry', label: 'Strawberry' },
                                        { value: 'vanilla', label: 'Vanilla' },
                                    ]}></Select>
                            </FormGroup>

                            <FormGroup>
                                <Label for="duration">Duration</Label>
                                <Input type="number" name="duration" id="duration" placeholder="Duration" />
                            </FormGroup>

                            <Row>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label for="min_people">Tour Min People</Label>
                                        <Input
                                            type="number"
                                            name="min_people"
                                            id="min_people"
                                            placeholder="Tour Min People"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={6}>
                                    <FormGroup>
                                        <Label for="max_people">Tour Max People</Label>
                                        <Input
                                            type="number"
                                            name="max_people"
                                            id="max_people"
                                            placeholder="Tour Max People"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="itinerary">Itinerary</Label>
                                <div className="header">
                                    <Row>
                                        <Col md={2}>Image</Col>
                                        <Col md={4}>Title - Desc</Col>
                                        <Col md={5}>Content</Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </div>
                                <div className="items mt-3">
                                    {itinerary.map((item) => {
                                        return (
                                            <div key={item} className="item">
                                                <Row>
                                                    <Col md={2}>
                                                        <FormGroup>
                                                            <Label for="iti_image">Image</Label>
                                                            <Input
                                                                type="file"
                                                                name={`iti_image[${item}][image]`}
                                                                id={`iti_image[${item}][image]`}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input
                                                            type="text"
                                                            name={`iti_title[${item}][title]`}
                                                            placeholder="Title: Day 1"
                                                        />
                                                        <Input
                                                            type="text"
                                                            className="mt-2"
                                                            name={`iti_description[${item}][description]`}
                                                            placeholder="Desc: Da Nang"
                                                        />
                                                    </Col>
                                                    <Col md={5}>Content</Col>
                                                    <Col md={1}></Col>
                                                </Row>
                                            </div>
                                        );
                                    })}
                                </div>
                            </FormGroup>
                        </Form>
                    </Col>

                    <Col lg={3}>
                        <Form>
                            <FormGroup>
                                <Label for="exampleSelect">Select</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelectMulti">Select Multiple</Label>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleFile">Default file input</Label>
                                <Input type="file" name="file" id="exampleFile" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleDate">Date</Label>
                                <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleMonth">Month</Label>
                                <Input type="month" name="month" id="exampleMonth" placeholder="date month" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleTime">Time</Label>
                                <Input type="time" name="time" id="exampleTime" placeholder="date Time" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleWeek">Week</Label>
                                <Input type="week" name="week" id="exampleWeek" placeholder="date week" />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleColor">Color</Label>
                                <Input
                                    type="color"
                                    name="color"
                                    id="exampleColor"
                                    placeholder="color placeholder"
                                    defaultValue="#727cf5"
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleRange">Range</Label>
                                <input
                                    className="custom-range"
                                    type="range"
                                    name="range"
                                    id="exampleRange"
                                    placeholder="range placeholder"
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

const TourLocation = () => {
    return (
        <React.Fragment>
            <h4 className="header-title mt-0">Tour Locations</h4>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input type="select" name="select" id="destination" name="category" className="custom-select mt-3">
                    <option>-- Please Select --</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup className="mb-5">
                <Label for="address">Real tour address</Label>
                <GoogleMapAutoComplete id="address" />
            </FormGroup>
        </React.Fragment>
    );
};

const Pricing = () => {
    return (
        <React.Fragment>
            <h4 className="header-title mt-0">Pricing</h4>
            <FormGroup>
                <h4 className="header-title mt-0">Tour Price</h4>
                <Row>
                    <Col lg={6}>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="number" name="price" id="price" placeholder="Tour Price" />
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup>
                            <Label for="sale_price">Sale Price</Label>
                            <Input type="number" name="sale_price" id="sale_price" placeholder="Tour Sale Price" />
                        </FormGroup>
                    </Col>
                </Row>
            </FormGroup>
        </React.Fragment>
    );
};

const Switches = () => {
    return (
        <React.Fragment>
            <h4 className="header-title mt-4">Switches</h4>
            <p className="text-muted">
                A switch has the markup of a custom checkbox but uses the <code>.custom-switch</code> class to render a
                toggle switch. Switches also support the <code>disabled</code> attribute.
            </p>

            <div>
                <CustomInput
                    type="switch"
                    id="exampleCustomSwitch"
                    name="customSwitch"
                    label="Turn on this custom switch"
                />
                <CustomInput
                    type="switch"
                    id="exampleCustomSwitch4"
                    label="Can't click this label to turn on!"
                    htmlFor="exampleCustomSwitch4_X"
                    disabled
                />
            </div>
        </React.Fragment>
    );
};

const AddTour = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tour', path: '/tour' },
                            { label: 'Add Tour', path: '/tour/add-tour', active: true },
                        ]}
                        title={'Add Tour'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <BasicInputElements />
                </Col>
            </Row>

            <Row>
                <Col lg={9}>
                    <Card>
                        <CardBody>
                            <TourLocation />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={9}>
                    <Card>
                        <CardBody>
                            <Pricing />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps)(AddTour);
