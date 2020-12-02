import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, CustomInput, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import RichTextEditor from '../../components/RichTextEditor';
import GoogleMapAutoComplete from '../../components/GoogleMapAutoComplete';
import default_image from '../../assets/images/default_upload_image.png';
import { connect, useDispatch } from 'react-redux';
import { createDestination, getDestination, updateDestination } from '../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import { url } from '../../helpers/url';
import * as FeatherIcon from 'react-feather';

const BasicInputElements = ({ props }) => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        title: '',
        description: '',
        address: '',
        isFeatured: '',
        lat: '',
        lng: '',
    });

    // Reload page when click add new :))
    useEffect(() => {
        if (props.match.params.id === ':id') {
            props.history.push('/destination/add-destination');
            window.location.reload();
        }
    }, [props.match.params]);

    // Check param if difference add-destination then fetch api
    useEffect(() => {
        if (props.match.params.id !== 'add-destination') {
            dispatch(getDestination(props.match.params.id));
        }
    }, [dispatch]);

    // Redirect to new link when create new or get data from api show
    // And set data to formData
    useEffect(() => {
        if (props.destination) {
            props.history.push(`/destination/${props.destination._id}`);
            setFormInput(props.destination);
        } else {
            props.history.push('/destination/add-destination');
        }
    }, [props.destination]);

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

    const onInputDescription = (description) => {
        setFormInput({ ...formInput, description: description });
    };

    const onUpdateLocation = (lat, lng, address) => {
        setFormInput({ ...formInput, lat: lat, lng: lng, address: address });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', formInput.title);
        formData.append('description', formInput.description);
        formData.append('address', formInput.address);
        formData.append('lat', formInput.lat);
        formData.append('lng', formInput.lng);
        formData.append('isFeatured', formInput.isFeatured === 'on' ? true : false);
        formData.append('status', formInput.status === 'publish' || formInput.status === 'active' ? 'active' : 'hide');

        const files = formInput.image;
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]);
        }

        if (formInput._id) {
            formData.append('_id', formInput._id);
            props.updateDestination(formData);
        } else {
            props.createDestination(formData);
        }

        toast.success(`${formInput._id ? 'Edit' : 'Add'} Destination success`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleRemoveImage = (index) => {
        let images = formInput.image;
        images.splice(index, 1);
        setFormInput({ ...formInput, image: images });
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
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="description">Description</Label>
                                {formInput.description && (
                                    <RichTextEditor
                                        id="description"
                                        onEditorContentChange={onInputDescription}
                                        initialContent={formInput.description}
                                    />
                                )}
                                {formInput.description === '' && (
                                    <RichTextEditor id="description" onEditorContentChange={onInputDescription} />
                                )}
                            </FormGroup>

                            <FormGroup className="mb-5">
                                <Label>Real tour address</Label>
                                <GoogleMapAutoComplete onUpdateLocation={onUpdateLocation} data={formInput} />
                            </FormGroup>

                            <FormGroup>
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
                                        <img src={default_image} className="mb-5" alt="Default" />
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
                                <Label for="isFeatured">Tour Featured</Label>
                                {formInput.isFeatured ? (
                                    <CustomInput
                                        type="switch"
                                        id="isFeatured"
                                        name="isFeatured"
                                        label="Enable featured"
                                        onChange={inputChangeHandler}
                                        defaultChecked={formInput.isFeatured}
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
                                <Button color="primary">Save</Button>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

const HandleDestination = (props) => {
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
                    <BasicInputElements props={props} />
                </Col>
            </Row>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { loading, destination, error } = state.Destination;
    return { loading, destination, error };
};

export default connect(mapStateToProps, { createDestination, updateDestination })(HandleDestination);
