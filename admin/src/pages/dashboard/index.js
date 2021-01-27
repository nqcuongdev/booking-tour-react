import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Loader from '../../components/Loader';

import Statistics from './Statistics';
import Orders from './Orders';
import { connect } from 'react-redux';
import { getAllHotel, getAllRoom, getListOrder } from '../../redux/actions';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
        };
    }

    componentDidMount() {
        this.props.getListOrder();
        this.props.getAllRoom();
        this.props.getAllHotel();
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
                        hotels={this.props.hotels}></Statistics>

                    {/* charts */}
                    <Row>
                        <Col xl={12}>
                            <Orders orders={this.props.orders} />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.Auth;
    const { orders } = state.Order;
    const { hotels } = state.Hotel;
    return { user, orders, hotels };
};

export default connect(mapStateToProps, { getListOrder, getAllRoom, getAllHotel })(Dashboard);
