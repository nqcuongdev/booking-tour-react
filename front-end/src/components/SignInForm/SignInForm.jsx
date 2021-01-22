import React, { useState } from "react";
import "./SignInForm.scss";
import {
  Button,
  Col,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { IoIosClose } from "react-icons/io";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import authApi from "../../api/authApi";

const SignInForm = (props) => {
  const { setUser } = props

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState({ email: "", password: "", message: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(formData)

      if (response.success) {
        localStorage.setItem("jwtKey", response.token)
        props.toggle()
        setUser(response.data)
        // console.log({response})
      }
    } catch (error) { 
      if (error.response?.data) { 
        let err = error.response.data
        setError(err.message)
      }
    }
  }

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle} charCode={<IoIosClose size={34} />}>
        Log In
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="email"
              placeholder="Email address"
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
            <Button color="orange" className="mt-2" type="submit">
              Login
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
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default SignInForm;
