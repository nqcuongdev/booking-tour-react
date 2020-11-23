import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { Users, Image, ShoppingBag } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import Orders from './Orders';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
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
                        <Col sm={8} xl={6}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={this.state.filterDate}
                                        onChange={(date) => {
                                            this.setState({ filterDate: date });
                                        }}
                                        options={{ mode: 'range' }}
                                        className="form-control"
                                    />
                                </div>
                            </form>
                        </Col>
                    </Row>

                    {/* stats */}
                    <Statistics></Statistics>

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <OverviewWidget
                                items={[
                                    { title: '121,000', description: 'Total Visitors', icon: Users },
                                    { title: '21,000', description: 'Product Views', icon: Image },
                                    { title: '$21.5', description: 'Revenue Per Visitor', icon: ShoppingBag },
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

export default Dashboard;
