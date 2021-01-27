import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Badge } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { getListOrder } from '../../redux/order/actions';

const ListOrder = (props) => {
    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <React.Fragment>
            <label className="d-inline mr-1">Show</label>
            <Input
                type="select"
                name="select"
                id="no-entries"
                className="custom-select custom-select-sm d-inline col-1"
                defaultValue={currSizePerPage}
                onChange={(e) => onSizePerPageChange(e.target.value)}>
                {options.map((option, idx) => {
                    return <option key={idx}>{option.text}</option>;
                })}
            </Input>
            <label className="d-inline ml-1">entries</label>
        </React.Fragment>
    );

    const [orders, setOrders] = useState([]);
    const { SearchBar } = Search;

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button
                    color="primary"
                    size="sm"
                    onClick={() => {
                        window.open(`/invoice/${row._id}`, '_blank');
                        window.focus();
                    }}>
                    <i className="uil uil-bill"></i>
                </Button>
            </div>
        );
    };

    const badgeStatusCategory = (cell, row, rowIndex) => {
        return <Badge color="success">{row.status}</Badge>;
    };

    const dateFormatter = (cell, row, rowIndex) => {
        return moment(cell).format('YYYY-MM-DD');
    };

    const getPackage = (cell, row, rowIndex) => {
        return row.code ? row.code.title : row.room.title;
    };

    const columns = [
        {
            dataField: 'user.full_name',
            text: 'Name',
            sort: false,
        },
        {
            dataField: 'package',
            text: 'Package',
            sort: false,
            formatter: getPackage,
        },
        {
            dataField: 'checkin',
            text: 'Check In',
            sort: false,
            formatter: dateFormatter,
        },
        {
            dataField: 'checkout',
            text: 'Check Out',
            sort: false,
            formatter: dateFormatter,
        },
        {
            dataField: 'payment.transaction_id',
            text: 'Transaction Code',
            sort: false,
        },
        {
            dataField: 'status',
            text: 'Status',
            sort: false,
            formatter: badgeStatusCategory,
        },
        {
            dataField: '',
            text: 'Action',
            sort: false,
            formatter: rankFormatter,
        },
    ];

    const defaultSorted = [
        {
            dataField: 'id',
            order: 'asc',
        },
    ];
    const dispatch = useDispatch();
    let data = props.orders;
    useEffect(() => {
        if (data) setOrders(data);
    }, [data]);

    useEffect(() => {
        dispatch(getListOrder());
    }, [dispatch]);

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Hotel', path: '/hotel' },
                            { label: 'Hotel Type', path: '/hotel/hotel-type', active: true },
                        ]}
                        title={'Hotel Type'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <ToolkitProvider
                                bootstrap4
                                keyField="_id"
                                data={orders}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(propsDT) => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...propsDT.searchProps} />
                                            </Col>
                                        </Row>

                                        {orders && (
                                            <BootstrapTable
                                                {...propsDT.baseProps}
                                                bordered={false}
                                                defaultSorted={defaultSorted}
                                                pagination={paginationFactory({
                                                    sizePerPage: 10,
                                                    sizePerPageRenderer: sizePerPageRenderer,
                                                    sizePerPageList: [
                                                        { text: '10', value: 10 },
                                                        { text: '20', value: 20 },
                                                        { text: '30', value: 30 },
                                                        { text: 'All', value: orders.length },
                                                    ],
                                                })}
                                                wrapperClasses="table-responsive"
                                            />
                                        )}
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { order, orders, loading, error } = state.Order;
    return { order, orders, loading, error };
};

export default connect(mapStateToProps)(ListOrder);
