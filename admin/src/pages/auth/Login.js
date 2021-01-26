import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Label,
    FormGroup,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock } from 'react-feather';

import { loginUser, loginWithGoogle } from '../../redux/actions';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.svg';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
        };
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
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.email, values.password, this.props.history);
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        let roles = ['admin', 'hotel_partner', 'tour_partner'];
        if (this.props.user && roles.includes(this.props.user.role)) {
            return <Redirect to="/dashboard" />;
        }
    };

    responseGoogle = (response) => {
        this.props.loginWithGoogle(response.tokenId, response.googleId);
    };

    render() {
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !this.props.user) && (
                    <div className="account-pages my-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.props.loading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/dashboard">
                                                            <img src={logo} alt="Logo booking core" />
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Enter your email address and password to access admin panel.
                                                    </p>

                                                    {this.props.error && (
                                                        <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                            <div>{this.props.error}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm
                                                        onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="email">Email</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Mail className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="text"
                                                                    name="email"
                                                                    id="email"
                                                                    placeholder="admin@bookingcore.com"
                                                                    value={this.state.email}
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Password</Label>
                                                            <Link
                                                                to="/account/forget-password"
                                                                className="float-right text-muted text-unline-dashed ml-1">
                                                                Forgot your password?
                                                            </Link>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    placeholder="Enter your password"
                                                                    value={this.state.password}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Button color="primary" className="btn-block">
                                                                Log In
                                                            </Button>
                                                        </FormGroup>
                                                        <div className="advanced">
                                                            <p className="text-center mt-3">or continue with</p>
                                                            <Row>
                                                                <Col sm={4} xs={12}>
                                                                    <Button color="primary" className="btn-block">
                                                                        Facebook
                                                                    </Button>
                                                                </Col>
                                                                <Col sm={4} xs={12}>
                                                                    <Button color="danger" className="btn-block">
                                                                        Google
                                                                    </Button>
                                                                </Col>
                                                                <Col sm={4} xs={12}>
                                                                    <Button color="info" className="btn-block">
                                                                        Twitter
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                Quote
                                                            </p>
                                                            <p className="lead">
                                                                "If do it, You will eat it. If you don't, you will eat
                                                                ... eat ..."
                                                            </p>
                                                            <p>- Huan Rose</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
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

export default connect(mapStateToProps, { loginUser, loginWithGoogle })(Login);
