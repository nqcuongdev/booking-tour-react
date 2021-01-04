import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Users, Image, ShoppingBag } from 'react-feather';

import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import Orders from './Orders';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: this.props.user,
            filterDate: [oneWeekAgo, new Date()],
        };
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
                    <Statistics user={this.state.user}></Statistics>

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <OverviewWidget
                                items={[
                                    { title: '121,000', description: 'Total Visitors', icon: Users },
                                    { title: '21,000', description: 'Total Product', icon: Image },
                                    { title: '$21.5', description: 'Revenue This Month', icon: ShoppingBag },
                                ]}></OverviewWidget>
                        </Col>

                        <Col xl={9}>
                            <RevenueChart />
                        </Col>
                    </Row>

                    {/* charts */}
                    <Row>
                        <Col xl={12}>
                            <Orders />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.Auth;
    return { user };
};

export default connect(mapStateToProps)(Dashboard);
