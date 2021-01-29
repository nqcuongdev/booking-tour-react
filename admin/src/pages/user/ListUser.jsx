import React, { useEffect, useState } from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button, Card, CardBody, Col, Row, Input } from 'reactstrap';
import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { deleteReview, getListReviews } from '../../redux/review/actions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ListUser = (props) => {
    const dispatch = useDispatch();
    const { SearchBar } = Search;
    const [reviews, setReviews] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(getListReviews());
    }, [dispatch]);

    useEffect(() => {
        if (props.reviews) {
            setReviews(props.reviews);
        }
    }, [props.reviews]);

    const dateFormatter = (cell, row, rowIndex) => {
        return moment(cell).format('YYYY-MM-DD');
    };

    const rankFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Button color="danger" size="sm" onClick={() => onDeleteReview(row)}>
                    <FeatherIcon.Trash size="18" />
                </Button>
            </div>
        );
    };

    const renderStar = (cell, row, rowIndex) => {
        return (
            <>
                {row.rating} <i className="uil uil-star"></i>
            </>
        );
    };

    const renderTarget = (cell, row, rowIndex) => {
        return row.hotel ? row.hotel[0].title : row.tour[0].title;
    };

    const onDeleteReview = (review) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You cannot restore it!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Continue',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteReview(review._id));
                Swal.fire('Deleted!', 'Delete review success.', 'success');
                dispatch(getListReviews());
            }
        });
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
            dataField: 'name',
            text: 'Name',
            sort: false,
        },
        {
            dataField: 'content',
            text: 'Content',
            sort: false,
        },
        {
            dataField: 'rating',
            text: 'Rating',
            sort: false,
            formatter: renderStar,
        },
        {
            dataField: '',
            text: 'Target',
            sort: false,
            formatter: renderTarget,
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

    const toggle = (room) => {
        setModal(!modal);
    };

    return (
        <>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Review', path: '/review' },
                            { label: 'List Review', path: '/review/list-review', active: true },
                        ]}
                        title={'List Review'}
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
                                data={reviews}
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

                                        {reviews && (
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
                                                        { text: 'All', value: reviews.length },
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
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { reviews, loading, error } = state.Review;
    return { reviews, loading, error };
};

export default connect(mapStateToProps)(ListUser);
