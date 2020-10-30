import React from "react";
import "./BreadcrumbBanner.scss";
import { Link } from "react-router-dom";

const BreadcrumbBanner = (props) => {
    return (
        <div style={{ backgroundImage: `url(${props.backgroundImage})` }} className="breadcrumb-banner">
            <div>
                <h1>{props.pageName}</h1>
                <p><Link to="/" className="home-link">Home</Link>/{props.pageName}</p>
            </div>
        </div>
    );
}

export default BreadcrumbBanner;