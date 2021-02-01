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
  FormFeedback,
} from "reactstrap";
import "./SignUpForm.scss";
import authApi from "../../api/authApi";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";

const SignUpForm = (props) => {
  const { setUser } = props;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    c_password: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.register(formData);

      if (response.success) {
        localStorage.setItem("jwtKey", response.token);
        props.toggle();
        setUser(response.data);

        toast.success(
          `Register successfully, welcome ${response.data.full_name}!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (errors) {
      if (errors.response.data) {
        let err = errors.response.data;
        setError(err.message);

        let errMess = "";
        if (err.message.first_name) {
          errMess = err.message.first_name;
        } else if (err.message.last_name) {
          errMess = err.message.last_name;
        } else if (err.message.email) {
          errMess = err.message.email;
        } else if (err.message.password) {
          errMess = err.message.password;
        } else if (err.message.confirm_password) {
          errMess = err.message.confirm_password;
        }

        toast.error(`${errMess}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const responseGoogle = async (response) => {
    let data = {
      tokenId: response.tokenId,
      googleId: response.googleId,
    };
    try {
      const response = await authApi.loginWithGoogle(data);
      if (response.success) {
        localStorage.setItem("jwtKey", response.token);
        props.toggle();
        setUser(response.data);
        // console.log({ response });

        toast.success(
          `Register successfully, welcome ${response.data.full_name}!`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (error) {
      if (error.response?.data) {
        let err = error.response.data;
        setError(err.message);

        let errMess = "";
        if (err.message.email) {
          errMess = err.message.email;
        } else if (err.message.password) {
          errMess = err.message.password;
        }

        toast.error(`${errMess}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
                <Input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  onChange={handleInputChange}
                  invalid={error && error.first_name}
                />
                {error && error.first_name && (
                  <FormFeedback>{error.first_name}</FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col lg={6} md={12}>
              <FormGroup>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                  invalid={error && error.last_name}
                />
                {error && error.last_name && (
                  <FormFeedback>{error.last_name}</FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Input
              type="number"
              name="phone"
              placeholder="Phone"
              onChange={handleInputChange}
              invalid={error && error.phone}
            />
            {error && error.phone && <FormFeedback>{error.phone}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              invalid={error && error.email}
            />
            {error && error.email && <FormFeedback>{error.email}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              invalid={error && error.password}
            />
            {error && error.password && (
              <FormFeedback>{error.password}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="c_password"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              invalid={error && error.c_password}
            />
            {error && error.c_password && (
              <FormFeedback>{error.c_password}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <CustomInput
              type="checkbox"
              name="term"
              id="term"
              label="I have read and accept the Terms and Privacy Policy"
              inline
              invalid={error && error.term}
            />
            {error && error.term && <FormFeedback>{error.term}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Button color="orange" className="btn-register">
              Sign Up
            </Button>
          </FormGroup>

          {error && error.message && (
            <div className="notification">
              <span className="failed">{error.message}</span>
            </div>
          )}

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
                <GoogleLogin
                  clientId={process.env.REACT_APP_GG_CLIENT}
                  render={(renderProps) => (
                    <Link
                      className="btn btn-google"
                      onClick={renderProps.onClick}
                    >
                      <FaGooglePlusG className="mr-1" />
                      Google
                    </Link>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
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
