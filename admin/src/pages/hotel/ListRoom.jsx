import React, { useEffect, useState } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
    Button,
    Card,
    CardBody,
    Col,
    Row,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    ModalFooter,
    Label,
} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { createRoom, getAllRoom } from '../../redux/actions';

const ListRoom = (props) => {
    const dispatch = useDispatch();
    const { SearchBar } = Search;
    const [rooms, setRooms] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState({});
    const [room, setRoom] = useState();

    useEffect(() => {
        if (props.match.params.id !== ':id') {
            dispatch(getAllRoom(props.match.params.id));
        }
    }, [dispatch]);

    useEffect(() => {
        if (props.rooms) {
            setRooms(props.rooms);
        }
    }, [props.rooms]);

    const dateFormatter = (cell, row, rowIndex) => {
        return moment(cell).format('YYYY-MM-DD');
    };

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="primary" size="sm" onClick={() => props.history.push(row._id)}>
                    <FeatherIcon.Edit size="18" />
                </Button>
            </div>
        );
    };

    const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
        <>
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
        </>
    );

    const columns = [
        {
            dataField: 'title',
            text: 'Title',
            sort: false,
        },
        {
            dataField: 'hotel.title',
            text: 'Hotel',
            sort: false,
        },
        {
            dataField: 'price',
            text: 'Price',
            sort: false,
        },
        {
            dataField: 'number_room',
            text: 'Number Room',
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

    const inputChangeHandler = (e) => {
        const { name, value, files } = e.target;
        setModalInput({ ...modalInput, [name]: value });
        if (files) {
            setModalInput({ ...modalInput, [name]: files[0] });
        }
    };

    const toggle = (room) => {
        setRoom(room);
        setModalInput(room);
        setModal(!modal);
    };

    const handleSubmit = (_id) => {
        if (_id) {
        } else {
            const formData = new FormData();
            formData.append('title', modalInput.title);
            formData.append('people', modalInput.people);
            formData.append('buffer_price', modalInput.buffer_price);
            formData.append('bed', modalInput.bed);
            formData.append('image', modalInput.image);
            formData.append('width', modalInput.width);
            formData.append('hotel', props.match.params.id);
            formData.append('price', modalInput.price);
            formData.append('number_room', modalInput.number_room);

            dispatch(createRoom(formData));
        }
    };

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Room', path: '/room' },
                            { label: 'List Room', path: '/room/:id/list-room', active: true },
                        ]}
                        title={'List Room'}
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
                                data={rooms}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(propsDT) => (
                                    <>
                                        <Row>
                                            <Col>
                                                <SearchBar {...propsDT.searchProps} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button color="primary" className="mr-3" onClick={toggle}>
                                                    Add Room
                                                </Button>
                                            </Col>
                                        </Row>

                                        {rooms && (
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
                                                        { text: 'All', value: rooms.length },
                                                    ],
                                                })}
                                                wrapperClasses="table-responsive"
                                            />
                                        )}
                                    </>
                                )}
                            </ToolkitProvider>
                        </CardBody>
                    </Card>
                    <Modal isOpen={modal} toggle={() => toggle()}>
                        <ModalHeader toggle={() => toggle()}>{room ? 'Edit Room' : 'Add Room'}</ModalHeader>
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
                                        defaultValue={room ? room.title : ''}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col lg={6}>
                                            <Label for="people">People</Label>
                                            <Input
                                                type="number"
                                                name="people"
                                                id="people"
                                                placeholder="People"
                                                onChange={inputChangeHandler}
                                                defaultValue={room ? room.people : ''}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Label for="width">Width</Label>
                                            <Input
                                                type="text"
                                                name="width"
                                                id="width"
                                                placeholder="Width"
                                                onChange={inputChangeHandler}
                                                defaultValue={room ? room.width : ''}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col lg={6}>
                                            <Label for="buffer_price">Buffer Price</Label>
                                            <Input
                                                type="text"
                                                name="buffer_price"
                                                id="buffer_price"
                                                placeholder="Buffer Price"
                                                onChange={inputChangeHandler}
                                                defaultValue={room && room.options ? room.options.buffer_price : ''}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Label for="bed">Bed</Label>
                                            <Input
                                                type="text"
                                                name="bed"
                                                id="bed"
                                                placeholder="Bed"
                                                onChange={inputChangeHandler}
                                                defaultValue={room && room.options ? room.options.bed : ''}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col lg={6}>
                                            <Label for="price">Price</Label>
                                            <Input
                                                type="text"
                                                name="price"
                                                id="price"
                                                placeholder="Price"
                                                onChange={inputChangeHandler}
                                                defaultValue={room ? room.price : ''}
                                            />
                                        </Col>
                                        <Col lg={6}>
                                            <Label for="number_room">Number Room</Label>
                                            <Input
                                                type="number"
                                                name="number_room"
                                                id="number_room"
                                                placeholder="Number Room"
                                                onChange={inputChangeHandler}
                                                defaultValue={room ? room.number_room : ''}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <Col lg={6}>
                                    <Label for="image">Image</Label>
                                    <Input type="file" name="image" id="image" onChange={inputChangeHandler} />
                                </Col>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => handleSubmit(room ? room._id : '')}>
                                Save
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={() => toggle()}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { rooms, loading, error } = state.Hotel;
    return { rooms, loading, error };
};

export default connect(mapStateToProps)(ListRoom);
