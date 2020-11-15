import React from "react";
import { IoIosClose } from "react-icons/io";
import {
  Col,
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
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default SignUpForm;
