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
import { getAllType } from '../../redux/hotel/actions';
import { createTourCategory, updateTourCategory } from '../../redux/tour/actions';
import moment from 'moment';

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
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState({});
    const [types, setTypes] = useState([]);
    const [type, setType] = useState();
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
    const dispatch = useDispatch();
    let data = props.types;
    useEffect(() => {
        if (data) setTypes(data);
    }, [data]);

    useEffect(() => {
        dispatch(getAllType());
    }, [dispatch]);

    /**
     * Show/hide the modal
     */
    const toggle = (type) => {
        setType(type);
        setModalInput(type);
        setModal(!modal);
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setModalInput({ ...modalInput, [name]: value });
    };

    const handleSubmit = (_id) => {
        if (_id) {
            //Default input is 'on' so we must convert into right format for save in db
            modalInput.status = modalInput.status === 'on' && type.status === 'active' ? 'hide' : 'active';
            dispatch(updateTourCategory(modalInput._id, modalInput.title, 'hotel', modalInput.status));
        } else {
            dispatch(createTourCategory(modalInput.title, 'hotel'));
        }
        setModal(!modal);
        setType();
        setModalInput({ title: '', status: '' });
        dispatch(getAllType());
    };

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
                                data={types}
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

                                        {types && (
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
                                                        { text: 'All', value: types.length },
                                                    ],
                                                })}
                                                wrapperClasses="table-responsive"
                                            />
                                        )}
                                    </React.Fragment>
                                )}
                            </ToolkitProvider>
                            <Modal isOpen={modal} toggle={() => toggle()}>
                                <ModalHeader toggle={() => toggle()}>
                                    {type ? 'Edit Category' : 'Add Category'}
                                </ModalHeader>
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
                                                defaultValue={type ? type.title : ''}
                                            />
                                            {props.error && <FormText color="danger">{props.error}</FormText>}
                                        </FormGroup>
                                        <FormGroup>
                                            {type && type.title && (
                                                <CustomInput
                                                    type="switch"
                                                    id="statusSwitch"
                                                    name="status"
                                                    label="Status"
                                                    defaultChecked={type && type.status === 'active' ? type.status : ''}
                                                    required
                                                    onChange={inputChangeHandler}
                                                />
                                            )}
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => handleSubmit(type ? type._id : '')}>
                                        Save
                                    </Button>
                                    <Button color="secondary" className="ml-1" onClick={() => toggle()}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { type, types, loading, error } = state.Hotel;
    return { type, types, loading, error };
};

export default connect(mapStateToProps)(ListOrder);
