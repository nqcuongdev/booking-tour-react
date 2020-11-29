import React from 'react';
import { Col, Input, Label, Row, Form, FormGroup, Button } from 'reactstrap';
import './CommentForm.scss';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const stars = [1,2,3,4,5];
const CommentForm = (props) => {
    return (
        <div className="comment-form">
            <p className="comment-form-title">Leave a reviews</p>
            <p className="comment-form-subtitle">
                <span>Your rating:</span>
                <span className="stars">
                    {stars.map((rating) => {
                        return (
                            <Link><FaStar className="stars-hover" /></Link>
                        )
                    })}
                </span>
            </p>
            <Form>
                <Row className="comment-info">
                    <Col xl={4} lg={4} md={12} xs={12}>
                        <FormGroup>
                            <Label for="name">Name <span className="obligatory-icon">*</span></Label>
                            <Input className="input-info" type="text" name="name" id="name" placeholder="Enter your name" required></Input>
                        </FormGroup>
                    </Col>
                    <Col xl={4} lg={4} md={12} xs={12}>
                        <FormGroup>
                            <Label for="email">Email <span className="obligatory-icon">*</span></Label>
                            <Input className="input-info" type="email" name="email" id="email" placeholder="Enter your email" required></Input>
                        </FormGroup>
                    </Col>
                    <Col xl={4} lg={4} md={12} xs={12}>
                        <FormGroup>
                            <Label for="name">Website</Label>
                            <Input className="input-info" type="text" name="website" id="website" placeholder="Enter your website"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="comment-content">
                    <Col xl={12} lg={12} md={12} xs={12}>
                        <FormGroup>
                            <Label for="message">Message <span className="obligatory-icon">*</span></Label>
                            <Input className="input-info" type="textarea" name="message" id="message" rows="5" required/>
                        </FormGroup>    
                    </Col> 
                </Row>
                <Button type="submit" className="btn btn-write-review">Submit</Button>
            </Form>
        </div>
    );
};

export default CommentForm;