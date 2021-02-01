import React, { useState, useContext } from "react";
import { Button, Col, Form, FormGroup, Input, FormFeedback } from "reactstrap";
import Row from "reactstrap/lib/Row";
import "./ContactForm.scss";
import ContactApi from "../../api/contactApi";
import { ToastContainer, toast } from 'react-toastify';

const ContactForm = (props) => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [error, setError] = useState({ name: "", email: "", subject: "", message: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ContactApi.add(formData)

      if (response.success) {
        //console.log({response})
        //reset form
        setFormData({ name: "", email: "", subject: "", message: "" })

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

        //console.log(err.message)
        let errMess = '';
        if (err.message.name) {
          errMess = err.message.name
        } else if (err.message.email) {
          errMess = err.message.email
        } else if (err.message.subject) {
          errMess = err.message.subject
        } else if (err.message.message) {
          errMess = err.message.message
        }

        toast.error(`${errMess}`, {
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
    <div className="contact__section-contact-form">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-4">
          <Row>
            <Col md={12} lg={6}>
              <Input type="text" name="name" placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                invalid={error && error.name}
              />
              {error && error.name && <FormFeedback>{error.name}</FormFeedback>}
            </Col>
            <Col md={12} lg={6}>
              <Input type="email" name="email" placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                invalid={error && error.email}
              />
              {error && error.email && <FormFeedback>{error.email}</FormFeedback>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="mb-4">
          <Input type="text" name="subject" placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            invalid={error && error.subject}
          />
          {error && error.subject && <FormFeedback>{error.subject}</FormFeedback>}
        </FormGroup>
        <FormGroup className="mb-4">
          <Input
            type="textarea"
            name="message"
            rows={5}
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
            invalid={error && error.message}
          />
          {error && error.message && <FormFeedback>{error.message}</FormFeedback>}
        </FormGroup>
        <FormGroup className="mb-5 text-center">
          <Button color="orange">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ContactForm;
