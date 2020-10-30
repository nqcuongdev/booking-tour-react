import React from "react";
import "./BreadcrumbBanner.scss";
import { Link } from "react-router-dom";
import banner from "../../assets/images/background-1.jpg";

const BreadcrumbBanner = (props) => {
    return (
        <div style={{ backgroundImage: `url(${banner})` }} className="breadcrumb-banner">
            <div>
                <h1>{props.pageName}</h1>
                <p><Link to="/" className="home-link">Home</Link>/{props.pageName}</p>
            </div>
        </div>
    );
}

export default BreadcrumbBanner;