import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { Formik } from 'formik';
import * as yup from 'yup';
import RichTextEditor from '../../components/RichTextEditor';
import { connect, useDispatch } from 'react-redux';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import * as FeatherIcon from 'react-feather';
import { url } from '../../helpers/url';
import { toast } from 'react-toastify';
import default_image from '../../assets/images/default_upload_image.png';
import { getAttributeHotel } from '../../redux/hotel/actions';

const HandleForm = (props) => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        address: '',
        isFeatured: '',
        lat: '',
        lng: '',
        attributes: [],
        category: '',
        adult_price: '',
        child_price: '',
        adult_sale_price: '',
        child_sale_price: '',
        duration: '',
        min_people: '',
        max_people: '',
        destination: '',
        facility: [],
    });
    const [destinations, setDestinations] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [facilities, setFacilities] = useState([]);
    useEffect(() => {
        dispatch(getAttributeHotel());
    }, [dispatch]);

    const onUpdateLocation = (lat, lng, address) => {
        setFormInput({ ...formInput, lat: lat, lng: lng, address: address });
    };

    const inputChangeHandler = (e) => {
        const { name, value, files } = e.target;
        setFormInput({ ...formInput, [name]: value });
        if (files) {
            let images = formInput.image && formInput.image.length > 0 ? formInput.image : [];
            for (let i = 0; i < files.length; i++) {
                images.push(files[i]);
            }

            setFormInput({ ...formInput, [name]: value, image: images });
        }
    };

    const handleRemoveImage = (index) => {
        let images = [...formInput.image];
        images.splice(index, 1);
        setFormInput({ ...formInput, image: images });
    };

    // Handle select attribute checkbox
    const onSelectAttribute = (e) => {
        const { value, checked } = e.target;
        let attributes = [...formInput.attributes];
        if (checked) attributes.push(value);
        else attributes.splice(attributes.indexOf(value), 1);
        setFormInput({ ...formInput, attributes: attributes });
    };

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Hotel', path: '/hotel' },
                            { label: 'Add Hotel', path: '/tour/add-hotel', active: true },
                        ]}
                        title={'Add Hotel'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Formik>
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                        }) => (
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
                                                        placeholder="Enter title"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="description">Description</Label>
                                                    <RichTextEditor name="description" id="description" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <FormGroup>
                                                                <Label>Price</Label>
                                                                <Row>
                                                                    <Col lg={6}>
                                                                        <FormGroup>
                                                                            <Input
                                                                                type="number"
                                                                                name="adult_price"
                                                                                placeholder="Adult Price"
                                                                                onChange={inputChangeHandler}
                                                                                defaultValue={
                                                                                    formInput.adult_price ||
                                                                                    (formInput.price &&
                                                                                        formInput.price.adult)
                                                                                }
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <Input
                                                                            type="number"
                                                                            name="child_price"
                                                                            placeholder="Child Price"
                                                                            onChange={inputChangeHandler}
                                                                            defaultValue={
                                                                                formInput.child_price ||
                                                                                (formInput.price &&
                                                                                    formInput.price.child)
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <FormGroup>
                                                                <Label>Sale Price</Label>
                                                                <Row>
                                                                    <Col lg={6}>
                                                                        <FormGroup>
                                                                            <Input
                                                                                type="number"
                                                                                name="adult_sale_price"
                                                                                placeholder="Adult Sale Price"
                                                                                onChange={inputChangeHandler}
                                                                                defaultValue={
                                                                                    formInput.adult_sale_price ||
                                                                                    (formInput.sale_price &&
                                                                                        formInput.sale_price.adult)
                                                                                }
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg={6}>
                                                                        <Input
                                                                            type="number"
                                                                            name="child_sale_price"
                                                                            placeholder="Child Sale Price"
                                                                            onChange={inputChangeHandler}
                                                                            defaultValue={
                                                                                formInput.child_sale_price ||
                                                                                (formInput.sale_price &&
                                                                                    formInput.sale_price.child)
                                                                            }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="destination">Destination</Label>
                                                    <Input
                                                        type="select"
                                                        id="destination"
                                                        name="destination"
                                                        className="custom-select">
                                                        <option>-- Please Select --</option>
                                                        {destinations &&
                                                            destinations.map((destination) => {
                                                                return (
                                                                    <option
                                                                        key={destination._id}
                                                                        value={destination._id}>
                                                                        {destination.title}
                                                                    </option>
                                                                );
                                                            })}
                                                    </Input>
                                                </FormGroup>
                                                <FormGroup className="mb-5">
                                                    <Label for="address">Real tour address</Label>
                                                    <GoogleMapAutoComplete
                                                        onUpdateLocation={onUpdateLocation}
                                                        data={formInput}
                                                        props={props}
                                                    />
                                                </FormGroup>
                                                <FormGroup className="mt-5">
                                                    <Label for="image">Gallery</Label>
                                                    <div className="attach-demo d-flex">
                                                        {formInput.image && formInput.image.length > 0 ? (
                                                            formInput.image.map((img, index) => (
                                                                <div key={index} className="image-item">
                                                                    <div className="inner">
                                                                        <Button
                                                                            size="sm"
                                                                            color="danger"
                                                                            className="delete"
                                                                            onClick={() => handleRemoveImage(index)}>
                                                                            <FeatherIcon.Trash />
                                                                        </Button>
                                                                        {typeof img === 'string' ? (
                                                                            <img
                                                                                src={`${url}/${img}`}
                                                                                className="mb-5"
                                                                                alt={formInput.title}
                                                                            />
                                                                        ) : typeof img === 'object' ? (
                                                                            <>
                                                                                <img
                                                                                    src={URL.createObjectURL(img)}
                                                                                    className="mb-5"
                                                                                    alt={formInput.title}
                                                                                />
                                                                            </>
                                                                        ) : (
                                                                            <img
                                                                                src={img}
                                                                                className="mb-5"
                                                                                alt={formInput.title}
                                                                            />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <img
                                                                src={default_image}
                                                                className="mb-5 img-fluid"
                                                                alt="Default"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="upload-box">
                                                        <Input
                                                            type="file"
                                                            multiple
                                                            name="image"
                                                            id="image"
                                                            onChange={inputChangeHandler}
                                                            required={formInput.image && formInput.image.length < 0}
                                                        />
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
                                                        <CustomInput
                                                            type="radio"
                                                            id="publish"
                                                            name="status"
                                                            label="Publish"
                                                            value="publish"
                                                            onChange={inputChangeHandler}
                                                            defaultChecked={
                                                                formInput.status === 'active' ? true : false
                                                            }
                                                        />
                                                        <CustomInput
                                                            type="radio"
                                                            id="draft"
                                                            name="status"
                                                            label="Draft"
                                                            value="draft"
                                                            onChange={inputChangeHandler}
                                                            defaultChecked={formInput.status === 'hide' ? true : false}
                                                        />
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="isFeatured">Tour Featured</Label>
                                                    <CustomInput
                                                        type="switch"
                                                        id="isFeatured"
                                                        name="isFeatured"
                                                        label="Enable featured"
                                                        onChange={inputChangeHandler}
                                                        defaultChecked={formInput.isFeatured ? true : false}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="attribute">Attribute: Property type</Label>
                                                    <div>
                                                        {attributes &&
                                                            attributes.map((attribute) => {
                                                                return (
                                                                    <CustomInput
                                                                        key={attribute._id}
                                                                        type="checkbox"
                                                                        className="mb-3 mt-3"
                                                                        id={attribute.slug}
                                                                        name="attributes"
                                                                        value={attribute._id}
                                                                        label={attribute.title}
                                                                        onChange={onSelectAttribute}
                                                                        defaultChecked={
                                                                            formInput.attributes &&
                                                                            formInput.attributes.includes(attribute._id)
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="wellness">Facilities: Wellness</Label>
                                                    <div>
                                                        {facilities &&
                                                            facilities.map((facility) => {
                                                                return (
                                                                    <CustomInput
                                                                        key={facility._id}
                                                                        type="checkbox"
                                                                        className="mb-3 mt-3"
                                                                        id={facility.slug}
                                                                        name="wellness"
                                                                        value={facility._id}
                                                                        label={facility.title}
                                                                        onChange={onSelectAttribute}
                                                                        defaultChecked={
                                                                            formInput.facility &&
                                                                            formInput.facility.includes(facility._id)
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="food">Facilities: Food & Drink</Label>
                                                    <div>
                                                        {facilities &&
                                                            facilities.map((facility) => {
                                                                return (
                                                                    <CustomInput
                                                                        key={facility._id}
                                                                        type="checkbox"
                                                                        className="mb-3 mt-3"
                                                                        id={facility.slug}
                                                                        name="food"
                                                                        value={facility._id}
                                                                        label={facility.title}
                                                                        onChange={onSelectAttribute}
                                                                        defaultChecked={
                                                                            formInput.facility &&
                                                                            formInput.facility.includes(facility._id)
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="cleaning">Facilities: Cleaning Services</Label>
                                                    <div>
                                                        {facilities &&
                                                            facilities.map((facility) => {
                                                                return (
                                                                    <CustomInput
                                                                        key={facility._id}
                                                                        type="checkbox"
                                                                        className="mb-3 mt-3"
                                                                        id={facility.slug}
                                                                        name="cleaning"
                                                                        value={facility._id}
                                                                        label={facility.title}
                                                                        onChange={onSelectAttribute}
                                                                        defaultChecked={
                                                                            formInput.facility &&
                                                                            formInput.facility.includes(facility._id)
                                                                        }
                                                                    />
                                                                );
                                                            })}
                                                    </div>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="popular">Facilities: Popular</Label>
                                                    <div>
                                                        {facilities &&
                                                            facilities.map((facility) => {
                                                                return (
                                                                    <CustomInput
                                                                        key={facility._id}
                                                                        type="checkbox"
                                                                        className="mb-3 mt-3"
                                                                        id={facility.slug}
                                                                        name="popular"
                                                                        value={facility._id}
                                                                        label={facility.title}
                                                                        onChange={onSelectAttribute}
                                                                        defaultChecked={
                                                                            formInput.facility &&
                                                                            formInput.facility.includes(facility._id)
                                                                        }
                                                                    />
                                                                );
                                                            })}
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
                        )}
                    </Formik>
                </Col>
            </Row>
        </>
    );
};

export default connect()(HandleForm);
