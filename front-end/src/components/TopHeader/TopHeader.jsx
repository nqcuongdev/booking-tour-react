import React from 'react';
import {Container} from 'reactstrap';
import { FaPhoneAlt,FaMapMarkerAlt } from 'react-icons/fa';
import './TopHeader.scss';

const TopHeader = () => {
    return (
        <div className="top__header">
            <Container>
                <div className="top__content">
                    <div className="top__left">
                        <a href="">Welcome to booking !</a>
                    </div>
                    <div className="top__right">
                        <ul className="top__items">
                            <li className="top__item">
                                <FaPhoneAlt size={18} /> <a href="tel:0337317788" style={{ color: 'black' }}>0337317788</a>
                            </li>
                            <li className="top__item">
                                <FaMapMarkerAlt size={18} /> <a href="">Nam Ky Khoi Nghia, Da Nang</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopHeader;