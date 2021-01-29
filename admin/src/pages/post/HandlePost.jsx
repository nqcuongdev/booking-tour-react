import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, CustomInput, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect, useDispatch } from 'react-redux';
import RichTextEditor from '../../components/RichTextEditor';
import default_image from '../../assets/images/default_upload_image.png';
import { url } from '../../helpers/url';
import Select from 'react-select';
import { getAllDestination } from '../../redux/destination/actions';
import { getAllTourCategory } from '../../redux/tour/actions';
import { createPost, getListOfPostTags, getPost, updatePost } from '../../redux/post/actions';
import { toast } from 'react-toastify';

const HandlePost = (props) => {
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formInput, setFormInput] = useState({
        title: '',
        content: '',
        banner: '',
        isFeatured: '',
        category: '',
        destination: '',
        tags: [],
    });

    useEffect(() => {
        if (props.match.params.id !== 'add-post' && props.match.params.id !== ':id') {
            dispatch(getPost(props.match.params.id));
        }
        if (props.match.params.id === ':id') {
            props.history.push('/post/add-post');
        }
    }, [props.match.params.id]);

    useEffect(() => {
        dispatch(getAllDestination());
        dispatch(getAllTourCategory());
        dispatch(getListOfPostTags());
    }, [dispatch]);

    useEffect(() => {
        if (props.destinations) {
            setDestinations(props.destinations);
        }
        if (props.categories) {
            setCategories(props.categories);
        }
        if (props.tags) {
            let tagData = [];
            props.tags.map((tag) => {
                return tagData.push({ value: tag._id, label: tag.title });
            });
            setTags(tagData);
        }
        if (props.post) {
            props.history.push(`/post/${props.post._id}`);
            setFormInput(props.post);
        }
    }, [props.destinations, props.categories, props.tags]);

    const handleDefaultValueTag = (tags) => {
        let tagData = [];
        tags.filter((tag) => {
            return tagData.push({ value: tag._id, label: tag.title });
        });
        return tagData;
    };

    const postFormSave = (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('banner', values.banner);
        formData.append('category', typeof values.category === 'string' ? values.category : values.category._id);
        formData.append('isFeatured', values.isFeatured[0] || values.isFeatured ? true : false);
        formData.append(
            'destination',
            typeof values.destination === 'string' ? values.destination : values.destination._id
        );
        formData.append('tags', JSON.stringify(values.tags));

        if (values._id) {
            formData.append('_id', values._id);
            dispatch(updatePost(formData));
        } else {
            dispatch(createPost(formData));
        }

        toast.success(`${values._id ? 'Edit' : 'Add'} Post success`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        content: yup.string().required('Content is required'),
        banner: yup.string().required('Banner is required'),
        category: yup.string().required('Category is required'),
        destination: yup.string().required('Destination is required'),
        // tag: yup.array().required('Tag is required'),
    });

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Post', path: '/post' },
                            { label: 'Add Post', path: '/post/add-post', active: true },
                        ]}
                        title={'Add Post'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Formik
                        initialValues={formInput}
                        enableReinitialize={true}
                        validationSchema={!formInput._id ? schema : ''}
                        onSubmit={(values, { setSubmitting }) => {
                            postFormSave(values);
                            setSubmitting(false);
                        }}>
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
                            <Form onSubmit={handleSubmit}>
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
                                                        placeholder="Enter post title"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.title}
                                                        invalid={touched.title && errors.title ? true : false}
                                                    />
                                                    {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="content">Content</Label>
                                                    {values.content && (
                                                        <RichTextEditor
                                                            id="content"
                                                            name="content"
                                                            onEditorContentChange={(e) => setFieldValue('content', e)}
                                                            initialContent={values.content}
                                                        />
                                                    )}

                                                    {values.content === '' && (
                                                        <RichTextEditor
                                                            id="content"
                                                            name="content"
                                                            onEditorContentChange={(e) => setFieldValue('content', e)}
                                                        />
                                                    )}
                                                    {errors.content && <FormFeedback>{errors.content}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="tags">Tag</Label>
                                                    <Select
                                                        value={handleDefaultValueTag(values.tags)}
                                                        isMulti={true}
                                                        options={tags}
                                                        onChange={(e) => setFieldValue('tags', e)}
                                                        name="tags"
                                                        id="tags"
                                                        className="react-select"
                                                        placeholder="Select Tag"
                                                        classNamePrefix="react-select"></Select>
                                                </FormGroup>
                                                <FormGroup className="mt-5">
                                                    <Label for="image">Gallery</Label>
                                                    <div className="attach-demo d-flex">
                                                        {values.banner && typeof values.banner === 'string' ? (
                                                            <img
                                                                src={`${url}/${values.banner}`}
                                                                className="mb-5 img-fluid"
                                                                alt={values.title}
                                                            />
                                                        ) : typeof values.banner === 'object' ? (
                                                            <React.Fragment>
                                                                <img
                                                                    src={URL.createObjectURL(values.banner)}
                                                                    className="mb-5 img-fluid"
                                                                    alt={values.title}
                                                                />
                                                            </React.Fragment>
                                                        ) : (
                                                            <img
                                                                src={default_image}
                                                                className="mb-5 img-fluid"
                                                                alt={values.title}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="upload-box">
                                                        <Input
                                                            type="file"
                                                            multiple
                                                            name="image"
                                                            id="image"
                                                            className="img-fluid"
                                                            onChange={(e) =>
                                                                setFieldValue('banner', e.currentTarget.files[0])
                                                            }
                                                            required={values.image && values.image.length < 0}
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
                                                    <Label for="category">Category</Label>
                                                    <Input
                                                        type="select"
                                                        name="category"
                                                        id="category"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.category && values.category._id}
                                                        invalid={
                                                            touched.category &&
                                                            touched.category._id &&
                                                            errors.category &&
                                                            errors.category._id
                                                        }>
                                                        <option>-- Select One --</option>
                                                        {categories.map((category) => {
                                                            return (
                                                                <option key={category._id} value={category._id}>
                                                                    {category.title}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                    {errors.category && errors.category._id && (
                                                        <FormFeedback>{errors.category._id}</FormFeedback>
                                                    )}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="destination">Destination</Label>
                                                    <Input
                                                        type="select"
                                                        name="destination"
                                                        id="destination"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.destination && values.destination._id}
                                                        invalid={
                                                            touched.destination &&
                                                            touched.destination._id &&
                                                            errors.destination &&
                                                            errors.destination._id
                                                        }>
                                                        <option>-- Select One --</option>
                                                        {destinations.map((destination) => {
                                                            return (
                                                                <option key={destination._id} value={destination._id}>
                                                                    {destination.title}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                    {errors.destination && errors.destination._id && (
                                                        <FormFeedback>{errors.destination._id}</FormFeedback>
                                                    )}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="isFeatured">Post Featured</Label>
                                                    {values.isFeatured ? (
                                                        <CustomInput
                                                            type="switch"
                                                            id="isFeatured"
                                                            name="isFeatured"
                                                            label="Enable featured"
                                                            onChange={handleChange}
                                                            defaultChecked={
                                                                values.isFeatured !== '' && values.isFeatured
                                                            }
                                                        />
                                                    ) : (
                                                        <CustomInput
                                                            type="switch"
                                                            id="isFeatured"
                                                            name="isFeatured"
                                                            label="Enable featured"
                                                            onChange={handleChange}
                                                        />
                                                    )}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Button type="submit" color="primary">
                                                        Submit
                                                    </Button>
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

const mapStateToProps = (state) => {
    const { destinations } = state.Destination;
    const { categories } = state.Tour;
    const { post, loading, error, tags } = state.Post;
    return { categories, destinations, post, loading, error, tags };
};

export default connect(mapStateToProps)(HandlePost);
