import React from "react";
import { Link } from "react-router-dom";
import './ThumbnailHotelItem.scss';
import { FaStar } from 'react-icons/fa';

const ThumbnailHotelItem = (props) => {
    return (
        <div className="thumbnail-hotel-item">
            <div className="hotel-item-header">
                {props.sale ? (
                    <div
                        className="hotel-item-tag"
                        style={{
                            background: "#7cdf6c",
                        }}
                    >
                        -{props.sale}%
                    </div>
                    ) : props.saleToday ? (
                    <div
                        className="hotel-item-tag"
                        style={{
                            background: "#1b3e8d",
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        <span style={{ color: "yellow" }}>-{props.saleToday}%</span>
                        <br /> off today
                    </div>
                    ) : (
                    <div
                        className="hotel-item-tag"
                        style={{
                            background: "#ff7d3e",
                        }}
                    >
                        hot
                    </div>
                )}

                <img src={props.image} className="img-fluid" alt={props.title} />
                <ul className="hotel-item-button">
                    <Link className="btn btn-orange mr-2" style={{ width: "auto" }}>
                        Book now
                    </Link>
                    <Link className="btn btn-detail">View detail</Link>
                </ul>
            </div>

            <div className="hotel-item-caption">
                <div className="hotel-item-title">
                    <p className="rate-stars"><FaStar className="stars"/><span> {props.rateStars}</span> /5</p>
                    <Link>
                        <p className="title">{props.title}</p>
                    </Link>
                    <p className="location">
                        {props.location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThumbnailHotelItem;