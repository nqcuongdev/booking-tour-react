import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Button,
    Badge,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';
import { createTourCategory, getAllTourCategory } from '../../redux/tour/actions';

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
        dataField: 'slug',
        text: 'Slug',
        sort: false,
    },
    {
        dataField: 'created_at',
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

const TableWithSearch = ({ properties, loading, error, categories }) => {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const { SearchBar } = Search;

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
    };

    const inputChangeHandler = (e) => {
        setTitle(e.target.value);
    };

    const handleCreateNew = () => {
        properties.createTourCategory(title, 'tour');
        setModal(!modal);
    };

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    data={properties.categories}
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
                                    <Button color="primary" className="mr-3" onClick={toggle}>
                                        Add Category
                                    </Button>
                                </Col>
                            </Row>

                            {properties.categories && (
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
                                            { text: 'All', value: properties.categories.length },
                                        ],
                                    })}
                                    wrapperClasses="table-responsive"
                                />
                            )}
                        </React.Fragment>
                    )}
                </ToolkitProvider>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add Category</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                    onChange={inputChangeHandler}
                                    defaultValue={title}
                                />
                                <FormText color="danger"></FormText>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleCreateNew} disabled={!title}>
                            Save
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </CardBody>
        </Card>
    );
};

const TourCategory = (props) => {
    useEffect(() => {
        props.getAllTourCategory();
    }, []);

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
                    <TableWithSearch
                        properties={props}
                        loading={props.loading}
                        error={props.error}
                        categories={props.categories}
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { category, categories, loading, error } = state.Tour;
    return { category, categories, loading, error };
};

export default connect(mapStateToProps, { createTourCategory, getAllTourCategory })(TourCategory);
