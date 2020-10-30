import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Feature.scss';

const featureData = [
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages choon laauf châu lòn . This template allows you to'
    },
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. CHâu châu mol mol This template allows you to'
    },
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: '',
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    }
];

const Feature = (props) => {
    return (
        <div className="feature">
            <Container>
                <Row>
                    {featureData.map(feature => {
                        return (
                            <Col lg={4} md={4} xs={4}>
                                He
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Feature;