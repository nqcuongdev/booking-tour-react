import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, CustomInput, FormGroup, Label, Input, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import * as FeatherIcon from 'react-feather';
import default_image from '../../assets/images/default_upload_image.png';
import { getAllDestination } from '../../redux/destination/actions';
import { getAllTourAttribute, getAllTourCategory, getTour, createTour, updateTour } from '../../redux/tour/actions';
import { url } from '../../helpers/url';
import { toast } from 'react-toastify';

const BasicInputElements = ({
    categories,
    attributes,
    formInput,
    inputChangeHandler,
    onInputDescription,
    onSubmitForm,
    onSelectAttribute,
    onSetItinerary,
    setFormInput,
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

    // Handle get input of itinerary
    const onInputItineraryChange = (index, e) => {
        const values = [...itineraryList];
        const { name, value, files } = e.target;
        values[index][name] = value;
        if (files) {
            console.log(files);
            values[index][name] = files[0];
        }
        setItineraryList(values);
        onSetItinerary(itineraryList);
    };

    // Handle click event of the Add button
    const handleAddClick = () => {
        setItineraryList([...itineraryList, { image: '', title: '', description: '', address: '' }]);
    };

    const handleRemoveImage = (index) => {
        let images = [...formInput.image];
        images.splice(index, 1);
        setFormInput({ ...formInput, image: images });
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

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input
                                        type="select"
                                        id="category"
                                        name="category"
                                        className="custom-select"
                                        onChange={inputChangeHandler}
                                        value={formInput.category && formInput.category._id}>
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
                                        type="text"
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
                                                            {itinerary.image ? (
                                                                typeof itinerary.image === 'string' ? (
                                                                    <img
                                                                        src={`${url}/${itinerary.image}`}
                                                                        className="img-fluid mb-5"
                                                                        alt="Default Picture tour"
                                                                    />
                                                                ) : typeof itinerary.image === 'object' ? (
                                                                    <React.Fragment>
                                                                        <img
                                                                            src={URL.createObjectURL(itinerary.image)}
                                                                            className="img-fluid mb-5"
                                                                            alt="Default Picture tour"
                                                                        />
                                                                    </React.Fragment>
                                                                ) : (
                                                                    <img
                                                                        src={itinerary.image}
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
                                                                onChange={(e) => onInputItineraryChange(index, e)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Input
                                                            type="text"
                                                            name="title"
                                                            placeholder="Title: Day 1"
                                                            defaultValue={itinerary.title}
                                                            onChange={(e) => onInputItineraryChange(index, e)}
                                                        />
                                                        <Input
                                                            type="text"
                                                            className="mt-2"
                                                            name="address"
                                                            placeholder="Desc: Da Nang"
                                                            defaultValue={itinerary.address}
                                                            onChange={(e) => onInputItineraryChange(index, e)}
                                                        />
                                                    </Col>
                                                    <Col md={5}>
                                                        <FormGroup>
                                                            <Input
                                                                type="textarea"
                                                                name="description"
                                                                rows="5"
                                                                placeholder="Content..."
                                                                defaultValue={itinerary.description}
                                                                onChange={(e) => onInputItineraryChange(index, e)}
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
                                                    <img src={`${url}/${img}`} className="mb-5" alt={formInput.title} />
                                                ) : typeof img === 'object' ? (
                                                    <React.Fragment>
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            className="mb-5"
                                                            alt={formInput.title}
                                                        />
                                                    </React.Fragment>
                                                ) : (
                                                    <img src={img} className="mb-5" alt={formInput.title} />
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
                                            defaultChecked={formInput.status === 'active' ? true : false}
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
                                                defaultChecked={
                                                    formInput.attributes && formInput.attributes.includes(attribute._id)
                                                }
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

const TourLocation = ({ inputChangeHandler, destinations, onUpdateLocation, formInput, props }) => {
    return (
        <React.Fragment>
            <h4 className="header-title">Tour Locations</h4>
            <FormGroup>
                <Label for="destination">Destination</Label>
                <Input
                    type="select"
                    id="destination"
                    name="destination"
                    className="custom-select"
                    onChange={inputChangeHandler}
                    defaultValue={formInput.destination && formInput.destination._id}>
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
                <GoogleMapAutoComplete onUpdateLocation={onUpdateLocation} data={formInput} props={props} />
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
                                                formInput.adult_price || (formInput.price && formInput.price.adult)
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
                                            formInput.child_price || (formInput.price && formInput.price.child)
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
                                                (formInput.sale_price && formInput.sale_price.adult)
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
                                            (formInput.sale_price && formInput.sale_price.child)
                                        }
                                    />
                                </Col>
                            </Row>
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
        adult_price: '',
        child_price: '',
        adult_sale_price: '',
        child_sale_price: '',
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

    // For select box
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

    // Check router has id
    useEffect(() => {
        if (props.match.params.id === ':id') {
            props.history.push('/tour/add-tour');
            setFormInput({
                title: '',
                description: '',
                address: '',
                isFeatured: '',
                lat: '',
                lng: '',
                attributes: [],
                category: '',
                itinerary: [],
                adult_price: '',
                child_price: '',
                adult_sale_price: '',
                child_sale_price: '',
                duration: '',
                min_people: '',
                max_people: '',
                destination: '',
            });
        }
    }, [props.match.params]);

    // Router has id => fetch data with id
    useEffect(() => {
        if (props.match.params.id !== 'add-tour') {
            dispatch(getTour(props.match.params.id));
        }
    }, [dispatch]);

    // Show form data after create new
    useEffect(() => {
        if (props.tour) {
            props.history.push(`/tour/${props.tour._id}`);
            setFormInput(props.tour);
        } else {
            props.history.push('/tour/add-tour');
        }
    }, [props.tour]);

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

    // Handle select attribute checkbox
    const onSelectAttribute = (e) => {
        const { value, checked } = e.target;
        let attributes = [...formInput.attributes];
        if (checked) attributes.push(value);
        else attributes.splice(attributes.indexOf(value), 1);
        setFormInput({ ...formInput, attributes: attributes });
    };

    const onSetItinerary = (itinerary) => {
        setFormInput({ ...formInput, itinerary: itinerary });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', formInput.title);
        formData.append('description', formInput.description);
        formData.append('address', formInput.address);
        formData.append('attributes', formInput.attributes);
        formData.append('category', formInput.category._id ? formInput.category._id : formInput.category);
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
        formData.append('duration', formInput.duration);
        formData.append('min_people', formInput.min_people);
        formData.append('max_people', formInput.max_people);
        formData.append('destination', formInput.destination._id ? formInput.destination._id : formInput.destination);
        formData.append('lat', formInput.lat);
        formData.append('lng', formInput.lng);
        formData.append('isFeatured', formInput.isFeatured === 'on' ? true : false);
        formData.append('status', formInput.status === 'publish' || formInput.status === 'active' ? 'active' : 'hide');

        const files = formInput.image;
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }

        for (let i = 0; i < formInput.itinerary.length; i++) {
            formData.append(`itinerary[${i}][title]`, formInput.itinerary[i].title);
            formData.append(`itinerary[${i}][image]`, formInput.itinerary[i].image);
            formData.append(`itinerary[${i}][description]`, formInput.itinerary[i].description);
            formData.append(`itinerary[${i}][address]`, formInput.itinerary[i].address);
        }

        if (formInput._id) {
            formData.append('_id', formInput._id);
            props.updateTour(formData);
        } else {
            props.createTour(formData);
        }

        toast.success(`${formInput._id ? 'Edit' : 'Add'} Tour success`, {
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
                        onSetItinerary={onSetItinerary}
                        setFormInput={setFormInput}
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
                                    inputChangeHandler={inputChangeHandler}
                                    destinations={destinations}
                                    onUpdateLocation={onUpdateLocation}
                                    formInput={formInput}
                                    props={props}
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
    const { categories, attributes, tour } = state.Tour;
    return { user, destinations, categories, attributes, tour };
};

export default connect(mapStateToProps, { createTour, updateTour })(AddTour);
