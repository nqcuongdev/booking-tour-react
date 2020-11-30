import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import default_image from '../../assets/images/default_upload_image.png';
import { connect } from 'react-redux';
import { createDestination } from '../../redux/actions';

const BasicInputElements = () => {
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        address: '',
        isFeatured: '',
        lat: '',
        lng: '',
    });

    const inputChangeHandler = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormInput({ ...formInput, [name]: files });
        } else {
            setFormInput({ ...formInput, [name]: value });
        }
    };

    const onInputDescription = (description) => {
        setFormInput({ ...formInput, description: description });
    };

    const onUpdateAddress = (address) => {
        console.log('onUpdateAddress', address);
        setFormInput({ ...formInput, address: address });
    };

    const onUpdateLatLng = (lat, lng) => {
        setFormInput({ ...formInput, lat: lat, lng: lng });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log('formInput after submit', formInput);
    };

    return (
        <Form onSubmit={onSubmitForm}>
            <Row>
                <Col lg={9}>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Destination title"
                                    onChange={inputChangeHandler}
                                    defaultValue={formInput.title}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Description</Label>
                                <RichTextEditor
                                    id="description"
                                    onEditorContentChange={onInputDescription}
                                    defaultValue={formInput.description}
                                />
                            </FormGroup>

                            <FormGroup className="mb-5">
                                <Label>Real tour address</Label>
                                <GoogleMapAutoComplete
                                    onUpdateAddress={onUpdateAddress}
                                    onUpdateLatLng={onUpdateLatLng}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="image">Banner</Label>
                                <div>
                                    <img src={default_image} className="mb-5" alt="Default Image" />
                                    <Input type="file" multiple name="image" id="image" onChange={inputChangeHandler} />
                                </div>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="isFeatured">Tour Featured</Label>
                                <CustomInput
                                    type="switch"
                                    id="isFeatured"
                                    name="isFeatured"
                                    label="Enable featured"
                                    onChange={inputChangeHandler}
                                />
                            </FormGroup>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <FormGroup>
                                <Label for="status">Publish</Label>
                                <div>
                                    <CustomInput
                                        type="radio"
                                        id="publish"
                                        name="status"
                                        label="Publish"
                                        onChange={inputChangeHandler}
                                    />
                                    <CustomInput
                                        type="radio"
                                        id="draft"
                                        name="status"
                                        label="Draft"
                                        onChange={inputChangeHandler}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup className="float-right">
                                <Button color="primary">Save</Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

const AddDestination = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Destination', path: '/destination' },
                            { label: 'Add Destination', path: '/destination/add-destination', active: true },
                        ]}
                        title={'Add Destination'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <BasicInputElements />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { loading, error } = state.Destination;
    return { loading, error };
};

export default connect(mapStateToProps, { createDestination })(AddDestination);
