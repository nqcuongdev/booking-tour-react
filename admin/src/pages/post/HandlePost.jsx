import React from 'react';
import { Col, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import Formik from 'formik';
import * as yup from 'yup';

const HandlePost = (props) => {
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
                    <Formik></Formik>
                </Col>
            </Row>
        </>
    );
};

export default HandlePost;
