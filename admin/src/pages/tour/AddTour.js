import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import Select from 'react-select';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import * as FeatherIcon from 'react-feather';
import default_image from '../../assets/images/default_upload_image.png';

const BasicInputElements = () => {
    const [itinerary, setItinerary] = useState([1]);
    return (
        <Row>
            <Col lg={9}>
                <Card>
                    <CardBody>
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
                                                <Col md={5}>
                                                    <FormGroup>
                                                        <Input
                                                            type="textarea"
                                                            name={`iti_description[${item}][content]`}
                                                            rows="5"
                                                            placeholder="Content..."
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={1}>
                                                    <Button color="danger" size="sm">
                                                        <FeatherIcon.Trash2 size={16} />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Banner</Label>
                            <div>
                                <img src={default_image} className="mb-5" alt="Default Image" />
                                <Input type="file" name="image" id="image" />
                            </div>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>

            <Col lg={3}>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="status">Publish</Label>
                            <div>
                                <CustomInput type="radio" id="publish" name="status" label="Publish" />
                                <CustomInput type="radio" id="draft" name="status" label="Draft" />
                            </div>
                        </FormGroup>
                        <FormGroup className="float-right">
                            <Button color="primary">Save</Button>
                        </FormGroup>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="isFeatured">Tour Featured</Label>
                            <CustomInput type="switch" id="isFeatured" name="isFeatured" label="Enable featured" />
                        </FormGroup>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="attribute">Attribute: Travel Styles</Label>
                            <div>
                                <CustomInput
                                    type="checkbox"
                                    className="mb-3 mt-3"
                                    id="attribute1"
                                    name="attribute[]"
                                    label="Cultural"
                                />
                                <CustomInput
                                    type="checkbox"
                                    className="mb-3"
                                    id="attribute2"
                                    name="attribute[]"
                                    label="Nature Adventure"
                                />
                                <CustomInput
                                    type="checkbox"
                                    className="mb-3"
                                    id="attribute3"
                                    name="attribute[]"
                                    label="Marine"
                                />
                                <CustomInput
                                    type="checkbox"
                                    className="mb-3"
                                    id="attribute4"
                                    name="attribute[]"
                                    label="Independent"
                                />
                                <CustomInput
                                    type="checkbox"
                                    className="mb-3"
                                    id="attribute5"
                                    name="attribute[]"
                                    label="Activities"
                                />
                            </div>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        </Row>
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
