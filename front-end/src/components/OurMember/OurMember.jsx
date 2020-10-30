import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import './OurMember.scss';
import avatar_1 from '../../assets/images/avatar-testimonial/avatar-1.jpg';
import avatar_2 from '../../assets/images/avatar-testimonial/avatar-2.jpg';
import avatar_3 from '../../assets/images/avatar-testimonial/avatar-3.jpg';
import { AiFillPhone } from 'react-icons/ai';

const memberData = [
    {
        image: avatar_1,
        name: 'Quoc Cuong  vs Đức chim to',
        position: 'CEO'
    },
    {
        image: avatar_2,
        name: 'Chau Nguyen',
        position: 'Developer'
    },
    {
        image: avatar_3,
        name: 'Thanh Hung',
        position: 'Designer'
    },
    {
        image: avatar_2,
        name: 'Mol Mol',
        position: 'Tester'
    }
];

const OurMember = (props) => {
    return (
        <div className="our-member">
            <Container>
                <Row className="our-member-header">
                    <div className="width-60">
                        <p className="title">Welcome to Booking Core</p>
                        <p className="sub-title"><b>We cover all the places</b></p>
                        <p className="description">Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes..Vivavivu is a Multipurpose Sketch template with 06 homepages.</p>
                    </div>
                </Row>
                <Row className="our-member-content">
                    {memberData.map(member => {
                        return (
                            <Col lg={3} md={3} xs={6} className="member">
                                <img src={member.image} alt="avatar" className="avatar" />
                                <p className="name">{member.name}</p>
                                <span className="position">{member.position}</span>
                            </Col>
                        );
                    })}
                </Row>
                <Row className="our-member-footer">
                    <Col lg={6} md={6} xs={6} className="our-member-footer-left">
                        <Button>Contact us</Button>
                    </Col>
                    <Col lg={6} md={6} xs={6} className="our-member-footer-right">
                        <AiFillPhone /> <span>0123456789</span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default OurMember;