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
import { addTourSchedule, getAllTour, getSchedule, updateTourSchedule } from '../../redux/tour/actions';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const Availability = () => {
    const dispatch = useDispatch();
    const [formInput, setFormInput] = useState({
        start: '',
        end: '',
        available: '',
        tour_id: '',
    });
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
        if (tour && tour._id) {
            dispatch(getSchedule(tour._id));
        }
    }, [tour]);

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
        setFormInput({ ...formInput, tour_id: tour._id });
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
        } else if (moment(arg.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
            toast.error('You can not select this day', {
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
            setFormInput({ ...formInput, start: moment(arg.date).format('YYYY-MM-DD') });
        }
    };

    const toggle = () => {
        setModal(!modal);
        setFormInput({ start: '', end: '', available: '', tour_id: '' });
    };

    const onAddSchedule = () => {
        if (formInput._id) {
            dispatch(updateTourSchedule(formInput));
        } else {
            dispatch(addTourSchedule(formInput));
        }

        toast.success(`${formInput._id ? 'Edit' : 'Add'} schedule success`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        toggle();
    };

    const onEvenEdit = ({ event, el }) => {
        setModal(!modal);
        setFormInput({
            ...formInput,
            start: event.start,
            end: event.end,
            available: event.extendedProps.available,
            _id: event.extendedProps._id,
        });
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
                                    listTours.map((item, index) => (
                                        <NavItem key={item._id}>
                                            <NavLink href="#" onClick={() => onGetTourSchedule(item)}>
                                                #{index + 1} {item.title}
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
                    {tour && (
                        <Card>
                            <CardBody>
                                {/* fullcalendar control */}
                                <FullCalendar
                                    defaultView="dayGridMonth"
                                    plugins={[
                                        BootstrapTheme,
                                        dayGridPlugin,
                                        interactionPlugin,
                                        timeGridPlugin,
                                        listPlugin,
                                    ]}
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
                                    allDay={false}
                                    editable={false}
                                    eventLimit={true} // allow "more" link when too many events
                                    selectable={true}
                                    events={listSchedule}
                                    dateClick={handleDateClick}
                                    eventClick={onEvenEdit}
                                    displayEventTime={false}
                                    addEvents={listSchedule}
                                    eventDidMount={(info) => {
                                        console.log(info.event);
                                    }}
                                    id="calendar"
                                />
                            </CardBody>
                        </Card>
                    )}
                </Col>

                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Date Information</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>End date</Label>
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        options={{
                                            minDate:
                                                formInput.start &&
                                                moment(formInput.start).add(1, 'd').format('YYYY-MM-DD'),
                                        }}
                                        value={formInput.end}
                                        onChange={(date) => {
                                            setFormInput({
                                                ...formInput,
                                                end: moment(date[0]).format('YYYY-MM-DD'),
                                            });
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
