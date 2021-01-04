// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTour, getSchedule } from '../../redux/tour/actions';

const Availability = () => {
    const dispatch = useDispatch();
    const [listTours, setTours] = useState([]);
    const [listSchedule, setSchedule] = useState([]);
    const [modal, setModal] = useState(false);

    const { tours, schedule } = useSelector((state) => ({
        tours: state.Tour.tours,
        schedule: state.Tour.schedule,
    }));

    useEffect(() => {
        dispatch(getAllTour());
    }, [dispatch]);

    useEffect(() => {
        if (tours) {
            setTours(tours);
        }
        if (schedule) {
            setSchedule(schedule);
        }
    }, [tours, schedule]);

    const onGetTourSchedule = (tour) => {
        dispatch(getSchedule(tour._id));
    };

    const handleDateClick = (arg) => {
        console.log(arg);
    };

    const toggle = () => setModal(!modal);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col className="col-12">
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Apps', path: '/apps/calendar' },
                            { label: 'Calendar', path: '/apps/calendar', active: true },
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
                                            <NavLink href={`#${tour.slug}`} onClick={(tour) => onGetTourSchedule(tour)}>
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
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                                }}
                                droppable={true}
                                editable={true}
                                eventLimit={true} // allow "more" link when too many events
                                selectable={true}
                                event={listSchedule}
                                id="calendar"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Availability;
