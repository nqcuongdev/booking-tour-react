import React from "react";
import { Link } from "react-router-dom";
import './ThumbnailHotelItem.scss';
import { FaStar } from 'react-icons/fa';

const ThumbnailHotelItem = (props) => {
    const getSubStringContent = (text) => {
        const newText = text.replace(/<[^>]+>/g, "");
    
        return newText.substring(0, 30);
    };

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

                <img src={`${process.env.REACT_APP_API_URL}/${props.image}`} className="img-fluid" alt={props.title} />
                <div className="bottom-opacity"></div>
                <ul className="hotel-item-button">
                    <Link className="btn btn-orange mr-2" style={{ width: "auto" }}
                        to={{
                            pathname: `/hotels/${props.slug}`,
                            state: { id: `${props.id}` },
                        }}
                    >
                        Book now
                    </Link>
                    <Link className="btn btn-detail"
                        to={{
                            pathname: `/hotels/${props.slug}`,
                            state: { id: `${props.id}` },
                        }}
                    >
                        View detail
                    </Link>
                </ul>
            </div>

            <div className="hotel-item-caption">
                <div className="hotel-item-title">
                    <p className="rate-stars"><FaStar className="stars"/><span> {props.rateStars}</span> /5</p>
                    <Link
                        to={{
                            pathname: `/hotels/${props.slug}`,
                            state: { id: `${props.id}` },
                        }}
                    >
                        <p className="title">{props.title}</p>
                    </Link>
                    <p className="location">
                        {`${getSubStringContent(props.address)}...`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThumbnailHotelItem;