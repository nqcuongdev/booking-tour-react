import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, CustomInput, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import { connect, useDispatch } from 'react-redux';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import * as FeatherIcon from 'react-feather';
import { url } from '../../helpers/url';
import { toast } from 'react-toastify';
import default_image from '../../assets/images/default_upload_image.png';
import { createHotel, getAllHotelFacility, getAllType, getHotel, updateHotel } from '../../redux/hotel/actions';
import { getAllDestination } from '../../redux/destination/actions';

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
        adult_price: '',
        child_price: '',
        adult_sale_price: '',
        child_sale_price: '',
        destination: '',
        facility: [],
        star: '',
    });
    const [destinations, setDestinations] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        dispatch(getAllDestination());
        dispatch(getAllType());
        dispatch(getAllHotelFacility());

        if (props.match.params.id !== 'add-hotel') {
            dispatch(getHotel(props.match.params.id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (props.types) {
            setAttributes(props.types);
        }
        if (props.destinations) {
            setDestinations(props.destinations);
        }
        if (props.facilities) {
            setFacilities(props.facilities);
        }
    }, [props.types, props.destinations, props.facilities]);

    useEffect(() => {
        if (props.hotel) {
            props.history.push(`/hotel/${props.hotel._id}`);
            setFormInput(props.hotel);
        } else {
            props.history.push('/hotel/add-hotel');
        }
    }, [props.hotel]);

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

    const onSelectFacility = (e) => {
        const { name, value, checked } = e.target;
        let facility = [...formInput.facility];
        if (checked) facility.push({ type_fac: name, facility_id: value });
        else facility.splice(facility.indexOf(value), 1);
        setFormInput({ ...formInput, facility: facility });
    };

    const onInputDescription = (description) => {
        setFormInput({ ...formInput, description: description });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', formInput.title);
        formData.append('description', formInput.description);
        formData.append('address', formInput.address);
        formData.append('attributes', formInput.attributes);
        formData.append('facility', JSON.stringify(formInput.facility));
        formData.append('star', formInput.star);
        formData.append('adult_price', formInput.price ? formInput.price.adult : formInput.adult_price);
        formData.append('child_price', formInput.price ? formInput.price.child : formInput.child_price);
        formData.append(
            'adult_sale_price',
            formInput.sale_price ? formInput.sale_price.adult : formInput.adult_sale_price
        );
        formData.append(
            'child_sale_price',
            formInput.sale_price ? formInput.sale_price.child : formInput.child_sale_price
        );
        formData.append('destination', formInput.destination._id ? formInput.destination._id : formInput.destination);
        formData.append('isFeatured', formInput.isFeatured === 'on' ? true : false);
        formData.append('status', formInput.status === 'publish' || formInput.status === 'active' ? 'active' : 'hide');

        const files = formInput.image;
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }

        if (formInput._id) {
            formData.append('_id', formInput._id);
            dispatch(updateHotel(formData));
        } else {
            dispatch(createHotel(formData));
        }

        toast.success(`${formInput._id ? 'Edit' : 'Add'} Hotel success`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                                                onChange={inputChangeHandler}
                                                defaultValue={formInput.title}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="description">Description</Label>
                                            {formInput.description && (
                                                <RichTextEditor
                                                    name="description"
                                                    id="description"
                                                    onEditorContentChange={onInputDescription}
                                                    initialContent={formInput.description}
                                                />
                                            )}
                                            {formInput.description === '' && (
                                                <RichTextEditor
                                                    name="description"
                                                    id="description"
                                                    onEditorContentChange={onInputDescription}
                                                />
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="star">Star</Label>
                                            <Input
                                                type="number"
                                                name="star"
                                                id="star"
                                                max="5"
                                                min="1"
                                                placeholder="Enter star"
                                                onChange={inputChangeHandler}
                                                defaultValue={formInput.star}
                                            />
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
                                                                            (formInput.price && formInput.price.adult)
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
                                                                        (formInput.price && formInput.price.child)
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
                                                className="custom-select"
                                                onChange={inputChangeHandler}
                                                value={formInput.destination && formInput.destination._id}>
                                                <option>-- Please Select --</option>
                                                {destinations &&
                                                    destinations.map((destination) => {
                                                        return (
                                                            <option key={destination._id} value={destination._id}>
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
                                                    <img src={default_image} className="mb-5 img-fluid" alt="Default" />
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
                                                {formInput.status ? (
                                                    <React.Fragment>
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
                                                    </React.Fragment>
                                                ) : (
                                                    <React.Fragment>
                                                        <CustomInput
                                                            type="radio"
                                                            id="publish"
                                                            name="status"
                                                            label="Publish"
                                                            value="publish"
                                                            onChange={inputChangeHandler}
                                                        />
                                                        <CustomInput
                                                            type="radio"
                                                            id="draft"
                                                            name="status"
                                                            label="Draft"
                                                            value="draft"
                                                            onChange={inputChangeHandler}
                                                        />
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="isFeatured">Tour Featured</Label>
                                            {formInput.isFeatured ? (
                                                <CustomInput
                                                    type="switch"
                                                    id="isFeatured"
                                                    name="isFeatured"
                                                    label="Enable featured"
                                                    onChange={inputChangeHandler}
                                                    defaultChecked={formInput.isFeatured ? true : false}
                                                />
                                            ) : (
                                                <CustomInput
                                                    type="switch"
                                                    id="isFeatured"
                                                    name="isFeatured"
                                                    label="Enable featured"
                                                    onChange={inputChangeHandler}
                                                />
                                            )}
                                        </FormGroup>
                                        <FormGroup className="mb-3">
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
                                        <FormGroup className="mb-3">
                                            <Label for="wellness">Facilities: Wellness</Label>
                                            <div>
                                                {facilities &&
                                                    facilities.map((facility) => {
                                                        if (facility.facility_type === 'Wellness Facilities') {
                                                            let wellness = formInput.facility.filter(
                                                                (item) => item.type_fac === 'wellness'
                                                            );

                                                            return (
                                                                <CustomInput
                                                                    key={facility._id}
                                                                    type="checkbox"
                                                                    className="mb-3 mt-3"
                                                                    id={facility._id}
                                                                    name="wellness"
                                                                    value={facility._id}
                                                                    label={facility.title}
                                                                    onChange={onSelectFacility}
                                                                    defaultChecked={
                                                                        wellness &&
                                                                        wellness[0] &&
                                                                        wellness[0].facility_id.includes(facility._id)
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    })}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Label for="food">Facilities: Food & Drink</Label>
                                            <div>
                                                {facilities &&
                                                    facilities.map((facility) => {
                                                        if (facility.facility_type === 'Food & Drink') {
                                                            let food = formInput.facility.filter(
                                                                (item) => item.type_fac === 'food'
                                                            );

                                                            return (
                                                                <CustomInput
                                                                    key={facility._id}
                                                                    type="checkbox"
                                                                    className="mb-3 mt-3"
                                                                    id={facility._id}
                                                                    name="food"
                                                                    value={facility._id}
                                                                    label={facility.title}
                                                                    onChange={onSelectFacility}
                                                                    defaultChecked={
                                                                        food &&
                                                                        food[0] &&
                                                                        food[0].facility_id.includes(facility._id)
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    })}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Label for="cleaning">Facilities: Cleaning Services</Label>
                                            <div>
                                                {facilities &&
                                                    facilities.map((facility) => {
                                                        if (facility.facility_type === 'Cleaning services') {
                                                            let cleaning = formInput.facility.filter(
                                                                (item) => item.type_fac === 'cleaning'
                                                            );

                                                            return (
                                                                <CustomInput
                                                                    key={facility._id}
                                                                    type="checkbox"
                                                                    className="mb-3 mt-3"
                                                                    id={facility._id}
                                                                    name="cleaning"
                                                                    value={facility._id}
                                                                    label={facility.title}
                                                                    onChange={onSelectFacility}
                                                                    defaultChecked={
                                                                        cleaning &&
                                                                        cleaning[0] &&
                                                                        cleaning[0].facility_id.includes(facility._id)
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    })}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <Label for="popular">Facilities: Popular</Label>
                                            <div>
                                                {facilities &&
                                                    facilities.map((facility) => {
                                                        if (facility.facility_type === 'Popular Facilities') {
                                                            let popular = formInput.facility.filter(
                                                                (item) => item.type_fac === 'popular'
                                                            );

                                                            return (
                                                                <CustomInput
                                                                    key={facility._id}
                                                                    type="checkbox"
                                                                    className="mb-3 mt-3"
                                                                    id={facility._id}
                                                                    name="popular"
                                                                    value={facility._id}
                                                                    label={facility.title}
                                                                    onChange={onSelectFacility}
                                                                    defaultChecked={
                                                                        popular &&
                                                                        popular[0] &&
                                                                        popular[0].facility_id.includes(facility._id)
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    })}
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="float-right">
                                            <Button color="primary" onClick={onSubmitForm}>
                                                Save
                                            </Button>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { types, loading, error, facilities, hotel } = state.Hotel;
    const { destinations } = state.Destination;
    return { types, destinations, loading, error, facilities, hotel };
};

export default connect(mapStateToProps)(HandleForm);
