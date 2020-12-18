import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, CustomInput, FormGroup, Label, Input, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import * as FeatherIcon from 'react-feather';
import default_image from '../../assets/images/default_upload_image.png';
import { getAllDestination } from '../../redux/destination/actions';
import { getAllTourAttribute, getAllTourCategory } from '../../redux/tour/actions';

const BasicInputElements = ({
    categories,
    attributes,
    formInput,
    inputChangeHandler,
    onInputDescription,
    onSubmitForm,
    onSelectAttribute,
}) => {
    const [itineraryList, setItineraryList] = useState([]);

    useEffect(() => {
        setItineraryList(formInput.itinerary);
    }, [formInput.itinerary]);

    // Handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...itineraryList];
        list.splice(index, 1);
        setItineraryList(list);
    };

    // Handle click event of the Add button
    const handleAddClick = () => {
        setItineraryList([...itineraryList, { image: '', title: '', description: '', address: '' }]);
    };

    // Handle get input of itinerary
    const inputItineraryChangeHandler = (e) => {
        const { name, value, files } = e.target;
    };

    return (
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
                                placeholder="Tour title"
                                onChange={inputChangeHandler}
                                defaultValue={formInput.title}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <RichTextEditor
                                name="description"
                                id="description"
                                onEditorContentChange={onInputDescription}
                            />
                        </FormGroup>

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        type="select"
                                        id="category"
                                        name="category"
                                        className="custom-select"
                                        onChange={inputChangeHandler}>
                                        <option>-- Please Select --</option>
                                        {categories &&
                                            categories.map((category) => {
                                                return (
                                                    <option key={category._id} value={category._id}>
                                                        {category.title}
                                                    </option>
                                                );
                                            })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="duration">Duration</Label>
                                    <Input
                                        type="number"
                                        name="duration"
                                        id="duration"
                                        placeholder="Duration"
                                        onChange={inputChangeHandler}
                                        defaultValue={formInput.duration}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="min_people">Tour Min People</Label>
                                    <Input
                                        type="number"
                                        name="min_people"
                                        id="min_people"
                                        placeholder="Tour Min People"
                                        onChange={inputChangeHandler}
                                        defaultValue={formInput.min_people}
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
                                        onChange={inputChangeHandler}
                                        defaultValue={formInput.max_people}
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
                            {itineraryList && itineraryList.length > 0 && (
                                <div className="items mt-3">
                                    {itineraryList.map((itinerary, index) => {
                                        return (
                                            <div key={index} className="item">
                                                <Row>
                                                    <Col md={2}>
                                                        <FormGroup>
                                                            <img
                                                                src={itinerary.image ? itinerary.image : default_image}
                                                                className="mb-5 img-fluid"
                                                                alt="Default Picture tour"
                                                            />
                                                            <Input
                                                                type="file"
                                                                name={`iti_image[${index}][image]`}
                                                                id={`iti_image[${index}][image]`}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input
                                                            type="text"
                                                            name={`iti_title[${index}][title]`}
                                                            placeholder="Title: Day 1"
                                                            defaultValue={itinerary.title}
                                                        />
                                                        <Input
                                                            type="text"
                                                            className="mt-2"
                                                            name={`iti_description[${index}][description]`}
                                                            placeholder="Desc: Da Nang"
                                                            defaultValue={itinerary.address}
                                                        />
                                                    </Col>
                                                    <Col md={5}>
                                                        <FormGroup>
                                                            <Input
                                                                type="textarea"
                                                                name={`iti_description[${index}][content]`}
                                                                rows="5"
                                                                placeholder="Content..."
                                                                defaultValue={itinerary.description}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => handleRemoveClick(index)}>
                                                            <FeatherIcon.Trash2 size={16} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <Button className="float-right mt-2" color="success" onClick={handleAddClick}>
                                Add more <FeatherIcon.PlusCircle size={16} />
                            </Button>
                        </FormGroup>

                        <FormGroup className="mt-5">
                            <Label for="image">Gallery</Label>
                            <div>
                                <img src={default_image} className="mb-5 img-fluid" alt="Default" />
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
                            </div>
                        </FormGroup>
                        <FormGroup className="float-right">
                            <Button color="primary" onClick={onSubmitForm}>
                                Save
                            </Button>
                        </FormGroup>
                    </CardBody>
                </Card>
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
                            <Label for="attribute">Attribute: Travel Styles</Label>
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
                                            />
                                        );
                                    })}
                            </div>
                        </FormGroup>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

const TourLocation = ({ destinations, onUpdateLocation, formInput }) => {
    return (
        <React.Fragment>
            <h4 className="header-title">Tour Locations</h4>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input type="select" id="destination" name="destination" className="custom-select">
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
                <GoogleMapAutoComplete onUpdateLocation={onUpdateLocation} data={formInput} />
            </FormGroup>
        </React.Fragment>
    );
};

const Pricing = ({ inputChangeHandler, formInput }) => {
    return (
        <React.Fragment>
            <FormGroup>
                <h4 className="header-title mt-0">Tour Price</h4>
                <Row>
                    <Col lg={6}>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Tour Price"
                                onChange={inputChangeHandler}
                                defaultValue={formInput.price}
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={6}>
                        <FormGroup>
                            <Label for="sale_price">Sale Price</Label>
                            <Input
                                type="number"
                                name="sale_price"
                                id="sale_price"
                                placeholder="Tour Sale Price"
                                onChange={inputChangeHandler}
                                defaultValue={formInput.sale_price}
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </FormGroup>
        </React.Fragment>
    );
};

const AddTour = (props) => {
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
        itinerary: [],
        price: '',
        sale_price: '',
        duration: '',
        min_people: '',
        max_people: '',
        destination: '',
    });
    const [destinations, setDestination] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);

    const onUpdateLocation = (lat, lng, address) => {
        setFormInput({ ...formInput, lat: lat, lng: lng, address: address });
    };

    const onInputDescription = (description) => {
        setFormInput({ ...formInput, description: description });
    };

    useEffect(() => {
        dispatch(getAllDestination());
        dispatch(getAllTourCategory());
        dispatch(getAllTourAttribute());
    }, [dispatch]);

    useEffect(() => {
        if (props.destinations) {
            setDestination(props.destinations);
        }

        if (props.categories) {
            setCategories(props.categories);
        }

        if (props.attributes) {
            setAttributes(props.attributes);
        }
    }, [props.destinations, props.categories, props.attributes]);

    // Reload page when click add new :))
    useEffect(() => {
        if (props.match.params.id === ':id') {
            props.history.push('/tour/add-tour');
            window.location.reload();
        }
    }, [props.match.params]);

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

    const onSelectAttribute = (e) => {
        const { value, checked } = e.target;
        let attributes = [];
        if (checked) attributes.push(value);
        else attributes.splice(attributes.indexOf(value), 1);
        console.log(attributes);
        setFormInput({ ...formInput, attributes: attributes });
    };

    const onSubmitForm = () => {
        console.log(formInput);
    };

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
                    <BasicInputElements
                        categories={categories}
                        attributes={attributes}
                        formInput={formInput}
                        inputChangeHandler={inputChangeHandler}
                        onInputDescription={onInputDescription}
                        onSubmitForm={onSubmitForm}
                        onSelectAttribute={onSelectAttribute}
                    />
                </Col>
            </Row>

            <Row>
                <Col lg={9}>
                    <Card>
                        <CardBody>
                            <Pricing inputChangeHandler={inputChangeHandler} formInput={formInput} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={9}>
                    <Card>
                        <CardBody>
                            {destinations && destinations.length > 0 && (
                                <TourLocation
                                    destinations={destinations}
                                    onUpdateLocation={onUpdateLocation}
                                    formInput={formInput}
                                />
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { user } = state.Auth;
    const { destinations } = state.Destination;
    const { categories, attributes } = state.Tour;
    return { user, destinations, categories, attributes };
};

export default connect(mapStateToProps)(AddTour);
