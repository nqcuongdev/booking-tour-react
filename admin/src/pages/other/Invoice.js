import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import logo from '../../assets/images/logo.svg';
import { getInvoice } from '../../redux/actions';
import moment from 'moment';

const Invoice = (props) => {
    const dispatch = useDispatch();
    const [invoice, setInvoice] = useState();

    useEffect(() => {
        if (props.match.params.id !== ':id') {
            dispatch(getInvoice(props.match.params.id));
        }
    }, [props.match.params.id]);

    useEffect(() => {
        if (props.order) {
            setInvoice(props.order);
        }
    }, [props.order]);

    const invoiceDetail = {
        customer: 'Greeva Navadiya',
        notes:
            'All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged the agreed quoted fee noted above',
        invoice_date: 'Jul 17, 2019',
        due_date: 'Jul 27, 2019',
        invoice_id: '#sh1001',
        address: {
            line_1: '795 Folsom Ave, Suite 600',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            phone: '(123) 456-7890',
        },
        billing_address: {
            line_1: '795 Folsom Ave, Suite 600',
            city: 'San Francisco',
            state: 'CA',
            zip: 94107,
            phone: '(123) 456-7890',
        },
        items: [
            {
                id: 1,
                name: 'Web Design',
                description: '2 Pages static website - my website',
                qty: 22,
                unit_cost: '$30.00',
                total: '$660.00',
            },
            {
                id: 2,
                name: 'Software Development',
                description: "Invoice editor software - AB'c Software",
                qty: 112.5,
                unit_cost: '$35.00',
                total: '$3937.50',
            },
        ],
        sub_total: '$4597.50',
        discount: '$459.75',
        total: '$4137.75',
    };

    return (
        <React.Fragment>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <CardBody>
                            <div className="clearfix">
                                <div className="float-sm-right">
                                    <img src={logo} alt="" height="48" />
                                    <address className="pl-2 mt-2">
                                        Nam Ky Khoi Nghia Street
                                        <br />
                                        Hoa Quy Ward, Da Nang City
                                        <br />
                                        <abbr title="Phone">Phone :</abbr> 096 969 6969
                                    </address>
                                </div>
                                <div className="float-sm-left">
                                    <h4 className="m-0 d-print-none">Invoice</h4>
                                    <dl className="row mb-2 mt-3">
                                        <dt className="col-sm-3 font-weight-normal">Invoice Number :</dt>
                                        <dd className="col-sm-9 font-weight-normal">#{invoice && invoice._id}</dd>

                                        <dt className="col-sm-3 font-weight-normal">Check In Date :</dt>
                                        <dd className="col-sm-9 font-weight-normal">
                                            {invoice && moment(invoice.checkin).format('YYYY-MM-DD')}
                                        </dd>

                                        <dt className="col-sm-3 font-weight-normal">Check Out Date :</dt>
                                        <dd className="col-sm-9 font-weight-normal">
                                            {invoice && moment(invoice.checkout).format('YYYY-MM-DD')}
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                            <Row className="mt-4">
                                <Col md={6}>
                                    <h6 className="font-weight-normal">Invoice For:</h6>
                                    <h6 className="font-size-16">{invoice && invoice.user.full_name}</h6>
                                    <address>
                                        {invoice && invoice.address}
                                        <br />
                                        {invoice && invoice.city}, {invoice && invoice.state} {invoice && invoice.zip}
                                        <br />
                                        <abbr title="Phone">Phone :</abbr> {invoice && invoice.phone}
                                    </address>
                                </Col>

                                <Col md={6}>
                                    <div className="text-md-right">
                                        <h6 className="font-weight-normal">Total</h6>
                                        <h2>{invoice && invoice.total_price}</h2>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div className="table-responsive">
                                        <table className="table mt-4 table-centered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item</th>
                                                    <th>Number</th>
                                                    <th>Price</th>
                                                    <th className="text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice && invoice.code && (
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            <h5 className="font-size-16 mt-0 mb-2">
                                                                {invoice.code.title}
                                                            </h5>
                                                            <p className="text-muted mb-0">
                                                                Tour:{' '}
                                                                <span style={{ fontWeight: 'bold' }}>
                                                                    {invoice.code.tour.title}
                                                                </span>
                                                            </p>
                                                        </td>
                                                        <td>{invoice.number}</td>
                                                        <td>{invoice.code.tour.price.adult}</td>
                                                        <td className="text-right">
                                                            {invoice.code.tour.price.adult * invoice.number}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <div className="clearfix pt-5">
                                        <h6 className="text-muted">Notes:</h6>

                                        <small className="text-muted">{invoice && invoice.notes}</small>
                                    </div>
                                </Col>

                                <Col sm={6}>
                                    <div className="float-right mt-4">
                                        <h3>{invoice && invoice.total_price} USD</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </Col>
                            </Row>

                            <div className="mt-5 mb-1">
                                <div className="text-right d-print-none">
                                    <Button
                                        color="primary"
                                        onClick={(e) => {
                                            window.print();
                                        }}>
                                        <i className="uil uil-print mr-1"></i> Print
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { order, loading, error } = state.Order;
    return { order, loading, error };
};

export default connect(mapStateToProps)(Invoice);
