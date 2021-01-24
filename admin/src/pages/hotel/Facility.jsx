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
import moment from 'moment';
import { createFacility, getAllHotelFacility, updateFacility } from '../../redux/actions';

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
    const [modalInput, setModalInput] = useState({ title: '', facility_type: '' });
    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState();
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
            dataField: 'facility_type',
            text: 'Type',
            sort: false,
        },
        {
            dataField: 'created_at',
            text: 'Create Date',
            sort: false,
            formatter: dateFormatter,
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

    useEffect(() => {
        dispatch(getAllHotelFacility());
    }, [dispatch]);

    let data = properties.facilities;
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
            dispatch(updateFacility(modalInput._id, modalInput.title, modalInput.facility_type));
        } else {
            dispatch(createFacility(modalInput));
        }
        setModal(!modal);
        setAttribute();
        setModalInput({ title: '', facility_type: '' });
        dispatch(getAllHotelFacility());
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
                                <Label for="facility_type">Type</Label>
                                <Input
                                    type="select"
                                    id="facility_type"
                                    name="facility_type"
                                    className="custom-select"
                                    onChange={inputChangeHandler}
                                    defaultValue={attribute && attribute.facility_type}>
                                    <option>-- Please Select --</option>
                                    <option value="Wellness Facilities">Wellness Facilities</option>
                                    <option value="Food & Drink">Food & Drink</option>
                                    <option value="Cleaning services">Cleaning services</option>
                                    <option value="Popular Facilities">Popular Facilities</option>
                                </Input>
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

const Facility = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Hotel', path: '/hotel' },
                            { label: 'Hotel Attribute', path: '/hotel/hotel-attribute', active: true },
                        ]}
                        title={'Hotel Attribute'}
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
    const { facilities, loading, error } = state.Hotel;
    return { facilities, loading, error };
};

export default connect(mapStateToProps)(Facility);
