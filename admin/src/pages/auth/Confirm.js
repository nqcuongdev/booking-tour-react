import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import logo from '../../assets/images/logo.svg';

class Confirm extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = this.props.user;
        if (isAuthTokenValid) {
            return <Redirect to="/dashboard" />;
        }
    };

    render() {
        const isAuthTokenValid = this.props.user;
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages my-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={8} lg={6} xl={5}>
                                    <Card className="text-center">
                                        <CardBody className="p-4">
                                            <div className="mx-auto mb-5">
                                                <a href="/dashboard">
                                                    <img src={logo} alt="logo app" />
                                                </a>
                                            </div>

                                            <h6 className="h5 mb-0 mt-4">Confirm your email</h6>
                                            <p className="text-muted mt-3 mb-3">
                                                Your account has been successfully registered. To complete the
                                                verification process, please check your email for a validation request.
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col className="text-center">
                                    <p className="text-muted">
                                        Return to{' '}
                                        <Link to="/account/login" className="text-primary font-weight-bold ml-1">
                                            Login
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps)(Confirm);
