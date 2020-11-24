import React from 'react';
import './RateTable.scss';
import { FaStar } from 'react-icons/fa';
import { Button } from 'reactstrap';

const RateTable = props => {
    return (
        <div className="rate-table">
            <div className="header">
                <p className="title">4.7<span> /5</span></p>
                <div className="stars">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                </div>
                <p className="based">based on 149 reviews</p>
            </div>

            <div className="item">
                <div className="item-top">
                    <span>5 Stars</span>
                    <span className="percent">77%</span>
                </div>
                <input type="range" min="1" max="100" value="77"/>
            </div>

            <div className="item">
                <div className="item-top">
                    <span>4 Stars</span>
                    <span className="percent">65%</span>
                </div>
                <input type="range" min="1" max="100" value="65"/>
            </div>

            <div className="item">
                <div className="item-top">
                    <span>3 Stars</span>
                    <span className="percent">25%</span>
                </div>
                <input type="range" min="1" max="100" value="25"/>
            </div>

            <div className="item">
                <div className="item-top">
                    <span>2 Stars</span>
                    <span className="percent">12%</span>
                </div>
                <input type="range" min="1" max="100" value="12"/>
            </div>

            <div className="item">
                <div className="item-top">
                    <span>1 Stars</span>
                    <span className="percent">3%</span>
                </div>
                <input type="range" min="1" max="100" value="3"/>
            </div>

            <div className="write-review mt-30">
                <Button className="btn btn-write-review">Write a review</Button>
            </div>
        </div>
    )
};

export default RateTable;