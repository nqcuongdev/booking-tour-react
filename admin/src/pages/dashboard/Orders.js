import React from 'react';
import { Card, CardBody, Table } from 'reactstrap';

const Orders = ({ orders }) => {
    return (
        <Card>
            <CardBody className="pb-0">
                <h5 className="card-title mt-0 mb-0 header-title">Recent Orders</h5>
                <Table hover responsive className="mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders &&
                            orders.splice(0, 10).map((order) => {
                                return (
                                    <tr key={order._id}>
                                        <td>#{order._id}</td>
                                        <td>{order.code ? order.code.title : order.tour.title}</td>
                                        <td>{order.user.full_name}</td>
                                        <td>${order.total_price}</td>
                                        <td>
                                            <span
                                                className={`badge badge-soft-${
                                                    order.status === 'success'
                                                        ? 'success'
                                                        : order.status === 'process'
                                                        ? 'warning'
                                                        : 'danger'
                                                } py-1`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Orders;
