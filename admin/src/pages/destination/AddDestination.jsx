import React, { useState } from 'react';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import default_image from '../../assets/images/default_upload_image.png';

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
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };

    const handleAddressChange = (address) => {
        setFormInput({ ...formInput, address: address });
    };

    const handleSelectAddress = (address) => {
        console.log(address);
        setFormInput({ ...formInput, address: address });

        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                setFormInput({ ...formInput, lat: latLng.lat });
                setFormInput({ ...formInput, lng: latLng.lng });
            })
            .catch((error) => console.error('Error', error));

        console.log(formInput);
    };

    return (
        <Form>
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
                                    name="description"
                                    id="description"
                                    onEditorContentChange={inputChangeHandler}
                                    defaultValue={formInput.description}
                                />
                            </FormGroup>

                            <FormGroup className="mb-5">
                                <Label for="address">Real tour address</Label>
                                <GoogleMapAutoComplete
                                    id="address"
                                    name="address"
                                    address={formInput.address}
                                    lat={formInput.lat}
                                    lng={formInput.lng}
                                    handleAddressChange={handleAddressChange}
                                    handleSelectAddress={handleSelectAddress}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="image">Banner</Label>
                                <div>
                                    <img src={default_image} className="mb-5" alt="Default Image" />
                                    <Input type="file" multiple name="image" id="image" />
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
                                <CustomInput type="switch" id="isFeatured" name="isFeatured" label="Enable featured" />
                            </FormGroup>
                        </CardBody>
                    </Card>
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
                        title={'Form Elements'}
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
export default AddDestination;
