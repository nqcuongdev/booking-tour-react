// @flow
import React, { useEffect, useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import Flatpickr from 'react-flatpickr';

import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTour, getSchedule } from '../../redux/tour/actions';
import { ToastContainer, toast } from 'react-toastify';

const Availability = () => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({ start_date: '', end_date: '', available: '' });
    const [tour, setTour] = useState();
    const [listTours, setTours] = useState([]);
    const [listSchedule, setSchedule] = useState([]);
    const [modal, setModal] = useState(false);

    const { tours, schedules } = useSelector((state) => ({
        tours: state.Tour.tours,
        schedules: state.Tour.schedules,
    }));

    useEffect(() => {
        dispatch(getAllTour());
    }, [dispatch]);

    useEffect(() => {
        if (tours) {
            setTours(tours);
        }
        if (schedules) {
            setSchedule(schedules);
        }
    }, [tours, schedules]);

    const onGetTourSchedule = (tour) => {
        dispatch(getSchedule(tour._id));
        setTour(tour);
    };

    const handleDateClick = (arg) => {
        if (!tour) {
            toast.error('Please select tour before add schedule', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setModal(!modal);
            setFormInput({ ...formInput, start_date: arg.date });
        }
    };

    const toggle = () => {
        setModal(!modal);
        setTour();
    };

    const onAddSchedule = () => {
        console.log(formInput);
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Apps', path: '/tour' },
                            { label: 'Schedule', path: '/tour/schedule', active: true },
                        ]}
                        title={'Tour Schedule'}
                    />
                </Col>
            </Row>

            <Row>
                <Col className="col-3">
                    <Card>
                        <CardBody>
                            <Nav vertical>
                                {listTours && listTours.length > 0 ? (
                                    listTours.map((tour, index) => (
                                        <NavItem key={tour._id}>
                                            <NavLink href={`#${tour.slug}`} onClick={() => onGetTourSchedule(tour)}>
                                                #{index + 1} {tour.title}
                                            </NavLink>
                                        </NavItem>
                                    ))
                                ) : (
                                    <NavItem>
                                        <NavLink href="#">Nothing</NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="col-9">
                    <Card>
                        <CardBody>
                            {/* fullcalendar control */}
                            <FullCalendar
                                defaultView="dayGridMonth"
                                plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                                slotDuration="00:15:00"
                                minTime="08:00:00"
                                maxTime="19:00:00"
                                themeSystem="bootstrap"
                                handleWindowResize={true}
                                bootstrapFontAwesome={false}
                                buttonText={{
                                    today: 'Today',
                                    month: 'Month',
                                    week: 'Week',
                                    day: 'Day',
                                    list: 'List',
                                    prev: 'Prev',
                                    next: 'Next',
                                }}
                                header={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth',
                                }}
                                droppable={true}
                                editable={true}
                                eventLimit={true} // allow "more" link when too many events
                                selectable={true}
                                event={listSchedule}
                                dateClick={handleDateClick}
                                id="calendar"
                            />
                        </CardBody>
                    </Card>
                </Col>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Date Information</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>End date</Label>
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={formInput.end_date}
                                        onChange={(date) => {
                                            setFormInput({ ...formInput, end_date: date });
                                        }}
                                        className="form-control"
                                        placeholder="Select end date"
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Available</Label>
                                <Input
                                    type="number"
                                    name="available"
                                    id="available"
                                    placeholder="Enter number tour available"
                                    onChange={(e) => {
                                        setFormInput({ ...formInput, available: e.target.value });
                                    }}
                                    defaultValue={formInput.available}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onAddSchedule}>
                            Save changes
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Row>
        </React.Fragment>
    );
};

export default Availability;
