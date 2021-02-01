import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = ({ user, orders, hotels, users, tours }) => {
    return (
        <React.Fragment>
            <Row>
                {user && user.role === 'admin' && (
                    <>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Today Revenue"
                                title={
                                    orders &&
                                    orders.reduce((a, b) => {
                                        return a + (b.total_price || 0);
                                    }, 0)
                                }
                                trend={{
                                    textClass: 'text-success',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Booking"
                                title={orders && orders.length}
                                trend={{
                                    textClass: 'text-success',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Item"
                                title={tours && hotels && tours.length + hotels.length}
                                trend={{
                                    textClass: 'text-success',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="User"
                                title={users && users.length}
                                trend={{
                                    textClass: 'text-success',
                                }}></StatisticsChartWidget>
                        </Col>
                    </>
                )}
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
