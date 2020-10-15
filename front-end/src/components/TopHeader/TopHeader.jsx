import React from 'react';
import {Container} from 'reactstrap';
import './TopHeader.scss';

const TopHeader = () => {
    return (
        <div className="top_header">
            <Container>
                <div className="top_header content">
                    <div className="top_header left">
                        <a href="">Wellcome to booking !</a>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default TopHeader;