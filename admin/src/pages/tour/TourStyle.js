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
    CustomInput,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import { getAllTourAttribute, createTourAttribute } from '../../redux/tour/actions';

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
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState({ title: '', status: '' });
    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState('');
    const { SearchBar } = Search;

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="primary" size="sm" onClick={() => toggle(row)}>
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

    let data = properties.attributes;
    useEffect(() => {
        if (data) setAttributes(data);
    }, [data]);

    /**
     * Show/hide the modal
     */
    const toggle = (attribute) => {
        setAttribute(attribute);
        setModalInput(attribute);
        setModal(!modal);
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setModalInput({ ...modalInput, [name]: value });
    };

    const handleSubmit = (_id) => {
        if (_id) {
            //Default input is 'on' so we must convert into right format for save in db
            modalInput.status = modalInput.status === 'on' && attribute.status === 'active' ? 'hide' : 'active';
            properties.updateTourCategory(modalInput._id, modalInput.title, 'tour', modalInput.status);
        } else {
            properties.createTourAttribute(modalInput.title, 'tour');
        }

        if (properties.error === null) {
            setModal(!modal);
            setAttribute();
            setModalInput();
        }
        properties.getAllTourAttribute();
    };

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    data={attributes}
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
                                        Add Attribute
                                    </Button>
                                </Col>
                            </Row>

                            {attributes && (
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
                                            { text: 'All', value: attributes.length },
                                        ],
                                    })}
                                    wrapperClasses="table-responsive"
                                />
                            )}
                        </React.Fragment>
                    )}
                </ToolkitProvider>
                <Modal isOpen={modal} toggle={() => toggle()}>
                    <ModalHeader toggle={() => toggle()}>{attribute ? 'Edit Attribute' : 'Add Attribute'}</ModalHeader>
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
                                    defaultValue={attribute ? attribute.title : ''}
                                />
                                {properties.error && <FormText color="danger">{properties.error}</FormText>}
                            </FormGroup>
                            <FormGroup>
                                {attribute && attribute.title && (
                                    <CustomInput
                                        type="switch"
                                        id="statusSwitch"
                                        name="status"
                                        label="Status"
                                        defaultChecked={
                                            attribute && attribute.status === 'active' ? attribute.status : ''
                                        }
                                        required
                                        onChange={inputChangeHandler}
                                    />
                                )}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => handleSubmit(attribute ? attribute._id : '')}>
                            Save
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={() => toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </CardBody>
        </Card>
    );
};

const TourStyle = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTourAttribute());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Tour', path: '/tour' },
                            { label: 'Tour Style', path: '/tables/tour-attribute', active: true },
                        ]}
                        title={'Tour Category'}
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
    const { attribute, attributes, loading, error } = state.Tour;
    return { attribute, attributes, loading, error };
};

export default connect(mapStateToProps, { createTourAttribute, getAllTourAttribute })(TourStyle);
