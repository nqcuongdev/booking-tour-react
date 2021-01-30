import React, { useEffect, useState } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
    Row,
    Col,
    Card,
    CardBody,
    Input,
    Badge,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    ModalFooter,
} from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect, useDispatch } from 'react-redux';
import { getAllUser, updateUserRole } from '../../redux/user/action';

const ListUser = (props) => {
    const dispatch = useDispatch();
    const { SearchBar } = Search;
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({ _id: '', role: '' });

    useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    useEffect(() => {
        if (props.users) {
            setUsers(props.users);
        }
    }, [props.users]);

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="primary" size="sm" onClick={() => toggle(row)}>
                    <FeatherIcon.Edit size="18" />
                </Button>
            </div>
        );
    };

    const badgeRole = (cell, row, rowIndex) => {
        return (
            <Badge color="success" style={{ textTransform: 'uppercase' }}>
                {row.role}
            </Badge>
        );
    };

    const inputChangeHandler = (e) => {
        e.persist();
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
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
            dataField: 'first_name',
            text: 'First Name',
            sort: false,
        },
        {
            dataField: 'last_name',
            text: 'Last Name',
            sort: false,
        },
        {
            dataField: 'full_name',
            text: 'Full Name',
            sort: false,
        },
        {
            dataField: 'email',
            text: 'Email',
            sort: false,
        },
        {
            dataField: 'role',
            text: 'Role',
            sort: false,
            formatter: badgeRole,
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

    const toggle = (user) => {
        setUser(user);
        setModal(!modal);
    };

    const handleSubmit = (_id) => {
        setUser({ ...user, _id: _id });
        dispatch(updateUserRole(_id, user.role));
        setUser({ _id: '', role: '' });
        dispatch(getAllUser());
    };

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'User', path: '/users' },
                            { label: 'List User', path: '/users/list-user', active: true },
                        ]}
                        title={'List User'}
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
                                data={users}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(propsDT) => (
                                    <>
                                        <Row>
                                            <Col>
                                                <SearchBar {...propsDT.searchProps} />
                                            </Col>
                                        </Row>

                                        {users && (
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
                                                        { text: 'All', value: users.length },
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
                        <ModalHeader toggle={() => toggle()}>User Roles</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="role">Role</Label>
                                    <Input
                                        type="select"
                                        id="role"
                                        name="role"
                                        className="custom-select"
                                        onChange={inputChangeHandler}
                                        value={user && user.role}>
                                        <option>-- Chọn một quyền --</option>
                                        <option value="user">User</option>
                                        <option value="hotel_partner">Hotel Partner</option>
                                        <option value="tour_partner">Tour Partner</option>
                                        <option value="admin">Admin</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" disabled={props.loading} onClick={() => handleSubmit(user._id)}>
                                Lưu
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={() => toggle()}>
                                Hủy
                            </Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { users, loading, error } = state.User;
    return { users, loading, error };
};

export default connect(mapStateToProps)(ListUser);
