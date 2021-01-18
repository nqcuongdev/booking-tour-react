import React, { useState } from 'react';
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
    const [rooms, setRooms] = useState([]);

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

    // Handle click event of the Add button
    const handleAddClick = () => {
        setRooms([...rooms, { image: '', title: '', description: '', address: '' }]);
    };

    // Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...rooms];
        list.splice(index, 1);
        setRooms(list);
    };

    // Handle get input of itinerary
    const onInputItineraryChange = (index, e) => {
        const values = [...rooms];
        const { name, value, files } = e.target;
        values[index][name] = value;
        if (files) {
            console.log(files);
            values[index][name] = files[0];
        }
        setRooms(values);
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
                                                    <Label for="room">Room</Label>
                                                    <div className="header">
                                                        <Row>
                                                            <Col md={2}>Image</Col>
                                                            <Col md={4}>Title - Desc</Col>
                                                            <Col md={5}>Content</Col>
                                                            <Col md={1}></Col>
                                                        </Row>
                                                    </div>
                                                    {rooms && rooms.length > 0 && (
                                                        <div className="items mt-3">
                                                            {rooms.map((room, index) => {
                                                                return (
                                                                    <div key={index} className="item">
                                                                        <Row>
                                                                            <Col md={2}>
                                                                                <FormGroup>
                                                                                    {room.image ? (
                                                                                        typeof room.image ===
                                                                                        'string' ? (
                                                                                            <img
                                                                                                src={`${url}/${room.image}`}
                                                                                                className="img-fluid mb-5"
                                                                                                alt="Default Picture tour"
                                                                                            />
                                                                                        ) : typeof room.image ===
                                                                                          'object' ? (
                                                                                            <React.Fragment>
                                                                                                <img
                                                                                                    src={URL.createObjectURL(
                                                                                                        room.image
                                                                                                    )}
                                                                                                    className="img-fluid mb-5"
                                                                                                    alt="Default Picture tour"
                                                                                                />
                                                                                            </React.Fragment>
                                                                                        ) : (
                                                                                            <img
                                                                                                src={room.image}
                                                                                                className="mb-5"
                                                                                                alt="Default Picture tour"
                                                                                            />
                                                                                        )
                                                                                    ) : (
                                                                                        <img
                                                                                            src={default_image}
                                                                                            className="mb-5 img-fluid"
                                                                                            alt="Default"
                                                                                        />
                                                                                    )}
                                                                                    <Input
                                                                                        type="file"
                                                                                        name="image"
                                                                                        onChange={(e) =>
                                                                                            onInputItineraryChange(
                                                                                                index,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col md={4}>
                                                                                <Input
                                                                                    type="text"
                                                                                    name="title"
                                                                                    placeholder="Title: Day 1"
                                                                                    defaultValue={room.title}
                                                                                    onChange={(e) =>
                                                                                        onInputItineraryChange(index, e)
                                                                                    }
                                                                                />
                                                                                <Input
                                                                                    type="text"
                                                                                    className="mt-2"
                                                                                    name="address"
                                                                                    placeholder="Desc: Da Nang"
                                                                                    defaultValue={room.address}
                                                                                    onChange={(e) =>
                                                                                        onInputItineraryChange(index, e)
                                                                                    }
                                                                                />
                                                                            </Col>
                                                                            <Col md={5}>
                                                                                <FormGroup>
                                                                                    <Input
                                                                                        type="textarea"
                                                                                        name="description"
                                                                                        rows="5"
                                                                                        placeholder="Content..."
                                                                                        defaultValue={room.description}
                                                                                        onChange={(e) =>
                                                                                            onInputItineraryChange(
                                                                                                index,
                                                                                                e
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col md={1}>
                                                                                <Button
                                                                                    color="danger"
                                                                                    size="sm"
                                                                                    onClick={() =>
                                                                                        handleRemoveClick(index)
                                                                                    }>
                                                                                    <FeatherIcon.Trash2 size={16} />
                                                                                </Button>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    <Button
                                                        className="float-right mt-2"
                                                        color="success"
                                                        onClick={handleAddClick}>
                                                        Add more <FeatherIcon.PlusCircle size={16} />
                                                    </Button>
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
