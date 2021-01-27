import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = ({ user, orders, hotels }) => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="Today Revenue"
                        title="$2100"
                        trend={{
                            textClass: 'text-success',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    {user && user.role === 'admin' && (
                        <StatisticsChartWidget
                            description="Booking"
                            title={orders && orders.length}
                            colors={['#f77e53']}
                            trend={{
                                textClass: 'text-danger',
                            }}></StatisticsChartWidget>
                    )}

                    {user && user.role === 'hotel_partner' && (
                        <StatisticsChartWidget
                            description="Hotel Booking"
                            title={orders && orders.filter((order) => order.room).length}
                            colors={['#f77e53']}
                            trend={{
                                textClass: 'text-danger',
                            }}></StatisticsChartWidget>
                    )}

                    {user && user.role === 'tour_partner' && (
                        <StatisticsChartWidget
                            description="Tour Booking"
                            title={orders && orders.filter((order) => order.code).length}
                            colors={['#f77e53']}
                            trend={{
                                textClass: 'text-danger',
                            }}></StatisticsChartWidget>
                    )}
                </Col>

                {user && user.role === 'hotel_partner' && (
                    <Col md={6} xl={3}>
                        <StatisticsChartWidget
                            description="Hotel"
                            title={hotels && hotels.filter((hotel) => hotel.author === user._id).length}
                            colors={['#43d39e']}
                            trend={{
                                textClass: 'text-success',
                            }}></StatisticsChartWidget>
                    </Col>
                )}

                {user && user.role === 'tour_partner' && (
                    <Col md={6} xl={3}>
                        <StatisticsChartWidget
                            description="Tour Available"
                            title="11"
                            colors={['#43d39e']}
                            trend={{
                                textClass: 'text-success',
                            }}></StatisticsChartWidget>
                    </Col>
                )}

                {user && user.role === 'admin' && (
                    <Col md={6} xl={3}>
                        <StatisticsChartWidget
                            description="Total Partner"
                            title="11"
                            colors={['#43d39e']}
                            trend={{
                                textClass: 'text-success',
                            }}></StatisticsChartWidget>
                    </Col>
                )}

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="Users"
                        title="11"
                        colors={['#43d39e']}
                        trend={{
                            textClass: 'text-success',
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
