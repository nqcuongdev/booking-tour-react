import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Feature.scss';
import { RiShipFill, RiMusic2Fill } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { AiFillHome, AiFillFlag } from 'react-icons/ai';

const featureData = [
    {
        icon: <RiShipFill />,
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages choon laauf châu lòn . This template allows you to'
    },
    {
        icon: <BiWorld />,
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. CHâu châu mol mol This template allows you to'
    },
    {
        icon: <RiMusic2Fill />,
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: <MdLocationOn />,
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: <MdLocationOn />,
        title: 'special activities',
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to'
    },
    {
        icon: <AiFillFlag />,
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
                            <Col lg={4} md={4} xs={4} className="feature-item"> 
                                <Row>
                                    <Col lg={2}>
                                        <div className="feature-icon">
                                            <span>{feature.icon}</span>
                                        </div>
                                    </Col>
                                    <Col lg={10}>
                                        <div className="feature-description">
                                            <p className="title">Special activities</p>
                                            <p className="description">Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Feature;