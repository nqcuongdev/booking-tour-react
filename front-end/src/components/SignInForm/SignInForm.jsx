import React from "react";
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
import "./SignInForm.scss";
import { IoIosClose } from "react-icons/io";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignInForm = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
        Log In
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input type="text" name="email" placeholder="Email address" />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" />
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-between mt-1">
              <CustomInput
                type="checkbox"
                id="remember_me"
                label="Remember Me"
                inline
              />
              <Link to="/forgot" className="text__inform">
                Forgot Password ?
              </Link>
            </div>
          </FormGroup>
          <FormGroup>
            <Button color="orange" className="mt-2">
              Login
            </Button>
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
            Do not have an account? <Link>Sign Up</Link>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default SignInForm;