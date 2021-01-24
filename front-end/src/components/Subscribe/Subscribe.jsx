import React, { useState } from 'react';
import './Subscribe.scss';
import { Button, Col, Container, Input, Row, Form, FormFeedback } from 'reactstrap';
import subscribeApi from "../../api/subscribeApi";
import { ToastContainer, toast } from 'react-toastify';

const Subscribe = (props) => {
    const [formData, setFormData] = useState({ email: "" })
    const [error, setError] = useState({ email: "" })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await subscribeApi.add(formData)

        if (response.success) {
            console.log({response})
            setFormData({ email: "" })

            toast.success(`${response.message}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        } catch (error) { 
        if (error.response?.data) { 
            let err = error.response.data
            setError(err.message)

            toast.error(`${err.message.email}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        }
    }

    return (
        <div className="subscribe">
            <Container>
                <Form onSubmit={handleSubmit}>        
                    <Row>
                        <Col lg={5} md={5} className="subscribe-left">
                            <h1>Subscribe</h1>
                            <p>To get latest offers & deal today</p>
                        </Col>
                        <Col lg={7} md={7} className="subscribe-right">
                            <Input className="subscribe-input" 
                                placeholder="Enter your E-mail" 
                                name="email" 
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                invalid={error && error.email}
                            />
                            <Button className="subscribe-button">Subscribe</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default Subscribe;