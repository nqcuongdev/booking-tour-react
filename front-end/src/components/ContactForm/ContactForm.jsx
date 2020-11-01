import React from "react";
import { Button, Col, Form, FormGroup, Input } from "reactstrap";
import Row from "reactstrap/lib/Row";
import "./ContactForm.scss";

const ContactForm = (props) => {
  return (
    <div className="contact__section-contact-form">
      <Form>
        <FormGroup className="mb-4">
          <Row>
            <Col md={12} lg={6}>
              <Input type="text" name="name" placeholder="Name" />
            </Col>
            <Col md={12} lg={6}>
              <Input type="email" name="email" placeholder="Email" />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="mb-4">
          <Input type="text" name="subject" placeholder="Subject" />
        </FormGroup>
        <FormGroup className="mb-4">
          <Input
            type="textarea"
            name="message"
            rows={5}
            placeholder="Message"
          />
        </FormGroup>
        <FormGroup className="mb-5">
          <Button color="orange">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ContactForm;
