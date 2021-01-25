import React from 'react';
import { Row, Col } from 'reactstrap';

import StatisticsChartWidget from '../../components/StatisticsChartWidget';

const Statistics = ({ user }) => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="Today Revenue"
                        title="$2100"
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '10.21%',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    {user && user.role === 'admin' && (
                        <StatisticsChartWidget
                            description="Product Sold"
                            title="1065"
                            colors={['#f77e53']}
                            data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                            trend={{
                                textClass: 'text-danger',
                                icon: 'uil uil-arrow-down',
                                value: '5.05%',
                            }}></StatisticsChartWidget>
                    )}

                    {user && user.role === 'hotel_partner' && (
                        <StatisticsChartWidget
                            description="Hotel Booking"
                            title="1065"
                            colors={['#f77e53']}
                            data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                            trend={{
                                textClass: 'text-danger',
                                icon: 'uil uil-arrow-down',
                                value: '5.05%',
                            }}></StatisticsChartWidget>
                    )}

                    {user && user.role === 'tour_partner' && (
                        <StatisticsChartWidget
                            description="Tour Booking"
                            title="1065"
                            colors={['#f77e53']}
                            data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                            trend={{
                                textClass: 'text-danger',
                                icon: 'uil uil-arrow-down',
                                value: '5.05%',
                            }}></StatisticsChartWidget>
                    )}
                </Col>

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="New Customers"
                        title="11"
                        colors={['#43d39e']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-success',
                            icon: 'uil uil-arrow-up',
                            value: '25.16%',
                        }}></StatisticsChartWidget>
                </Col>

                <Col md={6} xl={3}>
                    <StatisticsChartWidget
                        description="New Visitors"
                        title="750"
                        colors={['#ffbe0b']}
                        data={[25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54]}
                        trend={{
                            textClass: 'text-danger',
                            icon: 'uil uil-arrow-down',
                            value: '5.05%',
                        }}></StatisticsChartWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
