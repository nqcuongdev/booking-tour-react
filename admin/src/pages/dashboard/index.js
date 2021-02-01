import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Loader from '../../components/Loader';

import Statistics from './Statistics';
import { connect } from 'react-redux';
import { getAllHotel, getAllRoom, getListOrder, getAllUser, getAllTour } from '../../redux/actions';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
        };
    }

    componentDidMount() {
        this.props.getListOrder();
        this.props.getAllHotel();
        this.props.getAllUser();
        this.props.getAllTour();
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col>
                    </Row>

                    {/* stats */}
                    <Statistics
                        user={this.state.user}
                        orders={this.props.orders}
                        hotels={this.props.hotels}
                        tours={this.props.tours}
                        users={this.props.users}></Statistics>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.Auth;
    const { orders } = state.Order;
    const { hotels } = state.Hotel;
    const { tours } = state.Tour;
    const { users } = state.User;
    return { user, orders, hotels, users, tours };
};

export default connect(mapStateToProps, { getListOrder, getAllRoom, getAllHotel, getAllUser, getAllTour })(Dashboard);
