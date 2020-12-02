import React from 'react';
import './Faq.scss';
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";

const PopularDestinations = (props) => {
    return (
        <div className="faqs">
            <p className="title">FAQ’s</p>
                {props.faqs.map(faq => {
                    return (
                        <p className="item">
                            <Link to="#"><AiFillCaretRight/> {faq}</Link>
                        </p>
                    );
                })}
        </div>
    );
}

export default PopularDestinations;