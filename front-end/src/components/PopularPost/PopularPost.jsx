import React from 'react';
import { Col, Row } from 'reactstrap';
import './PopularPost.scss';
import { Link } from "react-router-dom";
import { AiOutlineEye } from 'react-icons/ai';

const PopularPost = (props) => {
    return (
        <div className="popular-post-item">
            <Row>
                <Col lg={4} md={4} xs={4}>
                    <div className="popular-post-item-image">
                        <Link to='#'><img src={props.image} /></Link>
                    </div>
                </Col>
                <Col lg={8} md={8} xs={8}>
                    <p><Link to="#" className="popular-post-item-title">{props.title}</Link></p>
                    <span className="popular-post-item-view"><AiOutlineEye /> {props.view}</span>
                </Col>
            </Row>
        </div>
    );
};

export default PopularPost;