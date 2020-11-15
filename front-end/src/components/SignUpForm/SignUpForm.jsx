import React from "react";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import "./SignUpForm.scss";

const SignUpForm = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
        Sign Up
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col lg={6} md={12}>
              <FormGroup>
                <Input type="text" name="first_name" placeholder="First Name" />
              </FormGroup>
            </Col>
            <Col lg={6} md={12}>
              <FormGroup>
                <Input type="text" name="last_name" placeholder="Last Name" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Input type="number" name="phone" placeholder="Phone" />
          </FormGroup>
          <FormGroup>
            <Input type="email" name="email" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" />
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="term"
              label="I have read and accept the Terms and Privacy Policy"
              inline
            />
          </FormGroup>
          <FormGroup>
            <Button color="orange">Sign Up</Button>
          </FormGroup>
          <div className="advanced">
            <p className="text-center mt-5">or continue with</p>
            <Row>
              <Col xs={12} sm={4}>
                <Link className="btn btn-facebook">
                  <FaFacebookF className="mr-1" />
                  Facebook
                </Link>
              </Col>
              <Col xs={12} sm={4}>
                <Link className="btn btn-google">
                  <FaGooglePlusG className="mr-1" />
                  Google
                </Link>
              </Col>
              <Col xs={12} sm={4}>
                <Link className="btn btn-twitter">
                  <FaTwitter className="mr-1" /> Twitter
                </Link>
              </Col>
            </Row>
          </div>
          <div className="text-center mt-4">
            Already have an account? <Link>Login</Link>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default SignUpForm;
