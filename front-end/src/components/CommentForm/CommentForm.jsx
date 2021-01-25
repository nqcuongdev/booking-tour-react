import React, { useContext, useState } from "react";
import { Col, Input, Label, Row, Form, FormGroup, Button } from "reactstrap";
import "./CommentForm.scss";
import ReactStars from "react-stars";
import AuthContext from "../../contexts/auth";
import RatingApi from "../../api/ratingApi";

const CommentForm = (props) => {
  const [commentForm, setCommentForm] = useState({});
  const { user } = useContext(AuthContext);
  const ratingChanged = (ratingNumber) => {
    setCommentForm({
      ...commentForm,
      rating: ratingNumber,
      target_id: props.data._id,
      name: user.full_name,
      email: user.email,
      user: user._id,
    });
  };

  const onInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await RatingApi.create(commentForm);
      if (response.success) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-form">
      <p className="comment-form-title">Leave a reviews</p>
      {user ? (
        <>
          <div className="comment-form-subtitle">
            <span>Your rating:</span>
            <ReactStars
              className="rating"
              count={5}
              onChange={ratingChanged}
              size={24}
              color2={"#ffd700"}
              half={false}
            />
          </div>
          <Form onSubmit={onSubmitForm}>
            <Row className="comment-info">
              <Col xl={4} lg={4} md={12} xs={12}>
                <FormGroup>
                  <Label for="name">
                    Name <span className="obligatory-icon">*</span>
                  </Label>
                  <Input
                    className="input-info"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    required
                    disabled
                    value={user.full_name}
                    onChange={onInputChange}
                  ></Input>
                </FormGroup>
              </Col>
              <Col xl={4} lg={4} md={12} xs={12}>
                <FormGroup>
                  <Label for="email">
                    Email <span className="obligatory-icon">*</span>
                  </Label>
                  <Input
                    className="input-info"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    disabled
                    value={user.email}
                    onChange={onInputChange}
                  ></Input>
                </FormGroup>
              </Col>
              <Col xl={4} lg={4} md={12} xs={12}>
                <FormGroup>
                  <Label for="name">Website</Label>
                  <Input
                    className="input-info"
                    type="text"
                    name="website"
                    id="website"
                    placeholder="Enter your website"
                    onChange={onInputChange}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="comment-content">
              <Col xl={12} lg={12} md={12} xs={12}>
                <FormGroup>
                  <Label for="message">
                    Message <span className="obligatory-icon">*</span>
                  </Label>
                  <Input
                    className="input-info"
                    type="textarea"
                    name="content"
                    id="content"
                    rows="5"
                    required
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" className="btn btn-write-review">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        "Please login for comment"
      )}
    </div>
  );
};

export default CommentForm;
