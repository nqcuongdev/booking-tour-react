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

const HandlePost = (props) => {
    const dispatch = useDispatch();
    const [tags, setTags] = useState([]);
    const [destinations, setDestinations] = useState([]);
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
        dispatch(getAllDestination());
        if (props.match.params.id !== 'add-post' || props.match.params.id !== ':id') {
            // dispatch(getPlace(props.match.params.id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (props.match.params.id === ':id') {
            props.history.push('/post/add-post');
        }
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.destinations) {
            setDestinations(props.destinations);
        }
    }, [props.destinations]);

    const onInputDescriptionChange = (content) => {
        setFormInput({ ...formInput, content: content });
    };

    const handleDefaultValueTag = (tags) => {
        let tagData = [];
        tags.filter((tag) => {
            return tagData.push({ value: tag._id, label: tag.name });
        });

        return tagData;
    };

    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        content: yup.string().required('Content is required'),
        category: yup.string().required('Category is required'),
        destination: yup.string().required('Destination is required'),
        // closeTime: yup.string().required('Bạn phải chọn thời gian mở cửa'),
        // media: yup.array().of(
        //     yup.object().shape({
        //         media: yup.string().required('Bạn phải upload hình ảnh món ăn'),
        //         name: yup.string().required('Bạn phải nhập tên món ăn'),
        //     })
        // ),
        // tag: yup.array().required('Bạn phải chọn thẻ'),
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
                        validationSchema={!formInput._id ? schema : ''}>
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
                                                        invalid={touched.title && errors.title}
                                                    />
                                                    {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="content">Content</Label>
                                                    <RichTextEditor
                                                        id="content"
                                                        name="content"
                                                        onEditorContentChange={onInputDescriptionChange}
                                                        initialContent={values.content}
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="tag">Thẻ</Label>
                                                    <Select
                                                        defaultValue={() => handleDefaultValueTag(values.tag)}
                                                        isMulti={true}
                                                        options={tags}
                                                        onChange={(e) => setFieldValue('tag', e)}
                                                        name="tag"
                                                        id="tag"
                                                        className="react-select"
                                                        placeholder="Select Tag"
                                                        classNamePrefix="react-select"></Select>
                                                </FormGroup>
                                                <FormGroup className="mt-5">
                                                    <Label for="image">Gallery</Label>
                                                    <div className="attach-demo d-flex">
                                                        {typeof values.image === 'string' ? (
                                                            <img
                                                                src={`${url}/${values.image}`}
                                                                className="mb-5"
                                                                alt={values.title}
                                                            />
                                                        ) : typeof values.image === 'object' ? (
                                                            <React.Fragment>
                                                                <img
                                                                    src={URL.createObjectURL(values.image)}
                                                                    className="mb-5"
                                                                    alt={values.title}
                                                                />
                                                            </React.Fragment>
                                                        ) : (
                                                            <img
                                                                src={default_image}
                                                                className="mb-5"
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
                                                            onChange={handleChange}
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
                                                    <CustomInput
                                                        type="switch"
                                                        id="isFeatured"
                                                        name="isFeatured"
                                                        label="Enable featured"
                                                        onChange={handleChange}
                                                        defaultChecked={values.isFeatured}
                                                    />
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
    return { destinations };
};

export default connect(mapStateToProps)(HandlePost);
