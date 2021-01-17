import React from 'react';
import { Card, CardBody, Col, FormGroup, Row } from 'reactstrap';
import PageTitle from '../../components/PageTitle';

const HandleForm = (props) => {
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
                <Formik>
                    <Col lg={9}>
                        <Card>
                            <CardBody>
                                <FormGroup></FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Formik>
            </Row>
        </>
    );
};

export default HandleForm;
