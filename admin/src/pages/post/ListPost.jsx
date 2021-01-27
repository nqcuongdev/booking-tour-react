import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Input, Button, Badge } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import PageTitle from '../../components/PageTitle';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';
import { getAllPosts } from '../../redux/actions';

const ListPost = (props) => {
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

    const [posts, setPosts] = useState([]);
    const { SearchBar } = Search;

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="primary" size="sm">
                    <i className="uil uil-bill"></i>
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

    const getPackage = (cell, row, rowIndex) => {
        return row.code ? row.code.title : row.room.title;
    };

    const columns = [
        {
            dataField: 'title',
            text: 'Title',
            sort: false,
        },
        {
            dataField: 'image',
            text: 'Image',
            sort: false,
            formatter: getPackage,
        },
        {
            dataField: 'created_by',
            text: 'Created By',
            sort: false,
            formatter: dateFormatter,
        },
        {
            dataField: 'created_at',
            text: 'Created At',
            sort: false,
            formatter: dateFormatter,
        },
        {
            dataField: 'destination.title',
            text: 'Destination',
            sort: false,
            formatter: dateFormatter,
        },
        {
            dataField: 'category.title',
            text: 'Category',
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

    useEffect(() => {
        if (props.posts) setPosts(props.posts);
    }, [props.posts]);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Post', path: '/post' },
                            { label: 'List Post', path: '/post/list-post', active: true },
                        ]}
                        title={'List Post'}
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
                                data={posts}
                                columns={columns}
                                search
                                exportCSV={{ onlyExportFiltered: true, exportAll: false }}>
                                {(propsDT) => (
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <SearchBar {...propsDT.searchProps} />
                                            </Col>
                                            <Col className="text-right">
                                                <Button
                                                    color="primary"
                                                    className="mr-3"
                                                    onClick={() => props.history.push('/post/add-post')}>
                                                    Add Post
                                                </Button>
                                            </Col>
                                        </Row>

                                        {posts && (
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
                                                        { text: 'All', value: posts.length },
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
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { posts, loading, error } = state.Post;
    return { posts, loading, error };
};

export default connect(mapStateToProps)(ListPost);
