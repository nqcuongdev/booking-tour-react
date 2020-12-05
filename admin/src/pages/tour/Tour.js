import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Badge } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import { getAllTour } from '../../redux/tour/actions';

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
    const [tours, setTours] = useState([]);
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

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
            dataField: 'code',
            text: 'Code',
            sort: false,
        },
        {
            dataField: 'title',
            text: 'Title',
            sort: true,
        },
        {
            dataField: 'destination.title',
            text: 'Destination',
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

    let data = properties.tours;
    useEffect(() => {
        if (data) setTours(data);
    }, [data]);

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="id"
                    data={tours}
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
                                        Add Tour
                                    </Button>
                                </Col>
                            </Row>

                            {tours && (
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
                                            { text: 'All', value: tours.length },
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

const Tour = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTour());
    }, [dispatch]);
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tour', path: '/tour' },
                            { label: 'List tour', path: '/tour/list-tour', active: true },
                        ]}
                        title={'List tour'}
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
    const { tours, loading, error } = state.Tour;
    return { tours, loading, error };
};

export default connect(mapStateToProps)(Tour);
