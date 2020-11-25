import React from 'react';
import { Row, Col, Card, CardBody, Input, Button, Badge } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../components/PageTitle';

const records = [
    {
        title: 'City trips',
        date: '11/04/2020',
        status: 'active',
    },
    {
        title: 'City trips',
        date: '11/04/2020',
        status: 'active',
    },
    {
        title: 'City trips',
        date: '11/04/2020',
        status: 'active',
    },
    {
        title: 'City trips',
        date: '11/04/2020',
        status: 'active',
    },
    {
        title: 'City trips',
        date: '11/04/2020',
        status: 'active',
    },
];

const rankFormatter = (cell, row, rowIndex) => {
    return (
        <div>
            <Button color="primary" size="sm">
                <FeatherIcon.Edit size="18" />
            </Button>
        </div>
    );
};

const badgeStatusCategory = (cell, row, rowIndex) => {
    return <Badge color="success">{row.status}</Badge>;
};

const columns = [
    {
        dataField: 'title',
        text: 'Title',
        sort: false,
    },
    {
        dataField: 'date',
        text: 'Create Date',
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

const TableWithSearch = () => {
    const { SearchBar } = Search;

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={records}
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
                                    <Button color="primary" className="mr-3">
                                        Add Category
                                    </Button>
                                </Col>
                            </Row>

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
                                        { text: 'All', value: records.length },
                                    ],
                                })}
                                wrapperClasses="table-responsive"
                            />
                        </React.Fragment>
                    )}
                </ToolkitProvider>
            </CardBody>
        </Card>
    );
};

const TourCategory = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tour', path: '/tour' },
                            { label: 'Tour Category', path: '/tables/tour-category', active: true },
                        ]}
                        title={'Tour Category'}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableWithSearch />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default TourCategory;
