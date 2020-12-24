import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Badge } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import { getAllDestination } from '../../redux/actions';
import moment from 'moment';

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

const TableWithSearch = ({ properties }) => {
    const [destinations, setDestinations] = useState([]);
    const { SearchBar } = Search;

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="primary" size="sm" onClick={() => properties.history.push(row._id)}>
                    <FeatherIcon.Edit size="18" />
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

    const columns = [
        {
            dataField: 'title',
            text: 'Title',
            sort: false,
        },
        {
            dataField: 'slug',
            text: 'Slug',
            sort: false,
        },
        {
            dataField: 'address',
            text: 'Address',
            sort: false,
        },
        {
            dataField: 'created_at',
            text: 'Create Date',
            sort: false,
            formatter: dateFormatter,
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

    let data = properties.destinations;
    useEffect(() => {
        if (data) setDestinations(data);
    }, [data]);

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    data={destinations}
                    columns={columns}
                    search
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                    {(props) => (
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <SearchBar {...props.searchProps} />
                                </Col>
                                <Col className="text-right">
                                    <Button
                                        color="primary"
                                        className="mr-3"
                                        onClick={() => properties.history.push('/destination/add-destination')}>
                                        Add Destination
                                    </Button>
                                </Col>
                            </Row>

                            {destinations && (
                                <BootstrapTable
                                    {...props.baseProps}
                                    bordered={false}
                                    defaultSorted={defaultSorted}
                                    pagination={paginationFactory({
                                        sizePerPage: 10,
                                        sizePerPageRenderer: sizePerPageRenderer,
                                        sizePerPageList: [
                                            { text: '10', value: 10 },
                                            { text: '20', value: 20 },
                                            { text: '30', value: 30 },
                                            { text: 'All', value: destinations.length },
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
    );
};

const ListDestination = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDestination());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Destination', path: '/destination' },
                            { label: 'List Destination', path: '/destination/list-destination', active: true },
                        ]}
                        title={'List Destination'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableWithSearch properties={props} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { destinations, loading, error } = state.Destination;
    return { destinations, loading, error };
};

export default connect(mapStateToProps)(ListDestination);
