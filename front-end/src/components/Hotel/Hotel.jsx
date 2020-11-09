import React from 'react';
import './Hotel.scss';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardImgOverlay
} from 'reactstrap';

const Hotel = (props) => {
    return (
        <div className="hotel">
            <Card>
                <CardImg top width="100%" src={props.image} alt="Card image cap" />
                
                <CardImgOverlay>
                    <CardTitle tag="h5">Card Title</CardTitle>
                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                    <CardText>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </CardText>
                </CardImgOverlay>

                <CardBody>
                    <CardTitle tag="h5">{props.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{props.location}</CardSubtitle>
                    <CardText>{props.description}</CardText>
                    <Button className="btn-book-now">Book now</Button>
                    <Button className="btn-view-detail">View detail</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default Hotel;