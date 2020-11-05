import React from 'react';
import './PopularTags.scss';
import { Link } from 'react-router-dom';

const PopularTags = (props) => {
    return (
        <div className="popular-tags">
            <p className="popular-tags-title">Popular Tags</p>
            <div className="popular-tags-list">
                {props.popularTags.map((tag, index) => {
                    if (index === 0) {
                        return (
                            <span className="first-tag"><Link to='#' className="white-text">{tag}</Link></span>
                        );
                    } else {
                        return (
                            <span className="normal-tag"><Link to='#'>{tag}</Link></span>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default PopularTags;