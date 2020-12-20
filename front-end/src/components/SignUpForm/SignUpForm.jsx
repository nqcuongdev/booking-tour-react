import React, { useState } from "react";
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
import authApi from "../../api/authApi";

const SignUpForm = (props) => {
  const [formData, setFormData] = useState({ first_name: "", last_name: "", phone: "", email: "", password: "", c_password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // thông báo
  const [notification, setNotification] = useState({})
  const handleNotificationFailed = () => setNotification({
    status: false,
    message: 'Failed'
  });
  const handleNotificationSuccess = () => setNotification({
    status: true,
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.register(formData);
      console.log("Failed", response);
      if (response.success) {
        localStorage.setItem("jwtKey", response.token);
        handleNotificationSuccess();
        setTimeout(() => {
          props.toggle();
        }, 400);
      } else {
        console.log("Failed", response.message);
      }
    } catch (error) {
      console.log('error: ', error);
      handleNotificationFailed();
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
        Sign Up
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={6} md={12}>
              <FormGroup>
                <Input type="text" name="first_name" placeholder="First Name" onChange={handleInputChange} required />
              </FormGroup>
            </Col>
            <Col lg={6} md={12}>
              <FormGroup>
                <Input type="text" name="last_name" placeholder="Last Name" onChange={handleInputChange} required />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Input type="number" name="phone" placeholder="Phone" onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="c_password" placeholder="Confirm Password" onChange={handleInputChange} required />
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              id="term"
              label="I have read and accept the Terms and Privacy Policy"
              inline
              required
            />
          </FormGroup>
          <FormGroup>
            <Button color="orange">Sign Up</Button>
          </FormGroup>

          <div className="notification">
            {notification.status ? (
              <span className="success">{notification.message}</span>
            ) : (
              <span className="failed">{notification.message}</span>
            )}
          </div>

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
