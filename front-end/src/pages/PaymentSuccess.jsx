import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Container } from "reactstrap";
import MainLayout from "../layouts/MainLayout";
import { BsCheckCircle, BsArrowRight } from 'react-icons/bs';

const PaymentSuccess = (props) => {
    return (
        <React.Fragment>
            <MainLayout>
                <Container>
                    <div className="payment-success">
                        <BsCheckCircle className="success-icon" />
                        <p className="title">PAYMENT SUCCESS!</p>
                        <p className="description">
                            <Link className="link">Click here</Link> to view your details / transaction history
                        </p>
                        <p className="title">Thank you for using Booking Core services!</p>
                        <Link to="/" className="go-home">Go to home page <BsArrowRight/></Link>
                    </div>
                </Container>
            </MainLayout>
        </React.Fragment>
    )
}

export default PaymentSuccess;