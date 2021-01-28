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
import { createPostTag, getListOfPostTags, getListOfTitleCategories, updatePostTag } from '../../redux/post/actions';

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
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState({ title: '', status: '' });
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const { SearchBar } = Search;

    useEffect(() => {
        dispatch(getListOfPostTags());
        dispatch(getListOfTitleCategories());
    }, [dispatch]);

    useEffect(() => {
        if (properties.tags) setTags(properties.tags);
    }, [properties.tags, properties.categories]);

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

    /**
     * Show/hide the modal
     */
    const toggle = (tag) => {
        setTag(tag);
        setModalInput(tag);
        setModal(!modal);
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setModalInput({ ...modalInput, [name]: value });
    };

    const handleSubmit = (_id) => {
        if (_id) {
            //Default input is 'on' so we must convert into right format for save in db
            modalInput.status = modalInput.status === 'on' && tag.status === 'active' ? 'hide' : 'active';
            dispatch(updatePostTag(modalInput._id, modalInput.title, modalInput.status));
        } else {
            dispatch(createPostTag(modalInput.title));
        }
        if (properties.error === null) {
            setModal(!modal);
            setTag();
            setModalInput({ title: '', status: '' });
        }
        dispatch(getListOfPostTags());
    };

    return (
        <Card>
            <CardBody>
                <ToolkitProvider
                    bootstrap4
                    keyField="_id"
                    data={tags}
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
                                        Add Tag
                                    </Button>
                                </Col>
                            </Row>

                            {tags && (
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
                                            { text: 'All', value: tags.length },
                                        ],
                                    })}
                                    wrapperClasses="table-responsive"
                                />
                            )}
                        </React.Fragment>
                    )}
                </ToolkitProvider>
                <Modal isOpen={modal} toggle={() => toggle()}>
                    <ModalHeader toggle={() => toggle()}>{tag ? 'Edit Tag' : 'Add Tag'}</ModalHeader>
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
                                    defaultValue={tag ? tag.title : ''}
                                />
                                {properties.error && <FormText color="danger">{properties.error}</FormText>}
                            </FormGroup>
                            <FormGroup>
                                {tag && tag.title && (
                                    <CustomInput
                                        type="switch"
                                        id="statusSwitch"
                                        name="status"
                                        label="Status"
                                        defaultChecked={tag && tag.status === 'active' ? tag.status : ''}
                                        required
                                        onChange={inputChangeHandler}
                                    />
                                )}
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => handleSubmit(tag ? tag._id : '')}>
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

const ListTag = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Post', path: '/post' },
                            { label: 'Post Tag', path: '/post/post-tag', active: true },
                        ]}
                        title={'Post Tag'}
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
    const { tag, tags, loading, error } = state.Post;
    return { tag, tags, loading, error };
};

export default connect(mapStateToProps)(ListTag);
