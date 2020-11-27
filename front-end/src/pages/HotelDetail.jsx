import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { MdLocationOn } from 'react-icons/md';
import { FaStarHalfAlt, FaStar, FaRegStar, FaTag } from 'react-icons/fa';
import CarouselSlide from '../components/CarouselSlide/CarouselSlide';
import hotelRoom1 from '../assets/images/hotels/hotel-1/hotel-room-1.jpg';
import hotelRoom2 from '../assets/images/hotels/hotel-1/hotel-room-2.jpg';
import Room from '../components/Room/Room';
import { IoMdFlower } from 'react-icons/io';
import { FaHamburger } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { RiHomeHeartFill } from 'react-icons/ri';
import avatar_1 from '../assets/images/avatar-testimonial/avatar-1.jpg';
import avatar_2 from '../assets/images/avatar-testimonial/avatar-2.jpg';
import avatar_3 from '../assets/images/avatar-testimonial/avatar-3.jpg';
import Comment from '../components/Comment/Comment';
import RateTable from '../components/RateTable/RateTable';
import CommentForm from '../components/CommentForm/CommentForm';
import ThumbnailHotelItem from '../components/ThumbnailHotelItem/ThumbnailHotelItem';

import Korea from "../assets/images/populars/1.jpg";
import NY from "../assets/images/populars/newyork.jpg";
import Cali from "../assets/images/populars/califonia.jpg";

const hotelData = {
    title: 'Suarsena House',
    location: '297 Luna Alley Apt.327',
    tags: ['Resort', 'Near the beach', 'Penthouse'],
    rateStars: 3.7,
    view: 169,
    images: [
        hotelRoom1,
        hotelRoom2
    ],
    rooms: [
        {
            images: [hotelRoom1, hotelRoom2],
            title: "Normal room",
            price: 99,
            people: 2,
            acreage: 28,
            options: [
                'Breakfast included',
                'FREE cancellation',
                'Garden / Mountain view',
                'Free Wifi',
                'Telephone',
                'Cable Channels'
            ]
        },
        {
            images: [hotelRoom2, hotelRoom1],
            title: "Luxury room",
            price: 199,
            people: 2,
            acreage: 38,
            options: [
                'Breakfast included',
                'FREE cancellation',
                'Garden / Mountain view',
                'Free Wifi',
                'Telephone',
                'Cable Channels'
            ]
        },
        {
            images: [hotelRoom1, hotelRoom2],
            title: "Presidential room",
            price: 199,
            people: 2,
            acreage: 38,
            options: [
                'Breakfast included',
                'FREE cancellation',
                'Garden / Mountain view',
                'Free Wifi',
                'Telephone',
                'Cable Channels'
            ]
        },
        {
            images: [hotelRoom2, hotelRoom1],
            title: "Family room",
            price: 299,
            people: 4,
            acreage: 48,
            options: [
                'Breakfast included',
                'FREE cancellation',
                'Garden / Mountain view',
                'Free Wifi',
                'Telephone',
                'Cable Channels'
            ]
        }
    ],
    facilities: {
        wellnessFacilities: ['Outdoor pool', 'Hot tub/jacuzzi', 'Spa and wellness centre', 'Fitness centre'],
        foodAndDrink: ['Bar', 'Restaurant', 'Good coffee'],
        cleaningServices: ['Shoeshine', 'Ironing services', 'Dry cleaning', 'Laundry'],
        popularFacilities: ['Free wifi', 'Parking', 'Outdoor pool', 'Non-smoking room']
    }
};

const commentData = [
    {
        avatar: avatar_1,
        name: 'Quoc Cuong',
        content: 'Bài viết hay quá nà, lần sau đừng viết nữa nha. Hihi',
        rateStars: 4,
        national: 'Vietnamese'
    },
    {
        avatar: avatar_2,
        name: 'Chou Chou',
        content: 'Bạn trên comment kỳ quá à, ai lại nói thẳng ra thế bao giờ :v',
        rateStars: 5,
        national: 'Japan'
    },
    {
        avatar: avatar_3,
        name: 'Hun Hun',
        content: 'Hai thằng trên im đê, ý kiến lên phường...',
        rateStars: 3,
        national: 'Laos'
    }
];

const similarHotelData = [
    {
        title: "Suarsena House",
        image: hotelRoom2,
        sale: 20,
        rateStars: 4.7,
        location: '297 Luna Alley Apt. 327'
    },
    {
        title: "Suarsena House",
        image: hotelRoom1,
        rateStars: 4.2,
        location: '297 Luna Alley Apt. 327'   
    },
    {
        title: "Suarsena House",
        image: hotelRoom2,
        rateStars: 4.5,
        location: '297 Luna Alley Apt. 327'
    }
];

const starsCounter = (stars) => {
    const counter = [1, 2, 3, 4, 5];
    if (Number.isInteger(stars)) {
        return (
            counter.map(i => {
                if (i <= stars) {
                    return (
                        <FaStar className="stars" />
                    );
                } else {
                    return (
                        <FaRegStar className="stars" />
                    );
                }
            })
        )
    } else {
        const roundStars = Math.round(stars)
        return (
            counter.map(i => {
                if (i < roundStars) {
                    return (
                        <FaStar className="stars" />
                    );
                } else if (i === roundStars) {
                    return (
                        <FaStarHalfAlt className="stars" />
                    );
                } else {
                    return (
                        <FaRegStar className="stars" />
                    )
                }
            })
        )
    }
};

const HotelDetail = (props) => {
    return (
        <MainLayout>
            <div className="hotel-detail">
                <div className="hotel-detail-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/hotels">Hotels</Link> /</span> {hotelData.title}</span>
                    </Container>
                </div>

                <Container className="hotel-detail-main mt-30 pb-30 pt-30">
                    <Row className="hotel-detail-main-header">
                        <Col xl={6} lg={6} md={6} xs={12} className="hotel-detail-main-header-left">
                            <p className="title">{hotelData.title}</p>
                            <div className="location-tags">
                                <p className="location"><MdLocationOn /> {hotelData.location}</p>
                                <p className="tags"><FaTag />
                                    {
                                        hotelData.tags.map((tag, index) => {
                                            return (
                                                index+1 != hotelData.tags.length ?
                                                <span> {tag} /</span>
                                                : <span> {tag}</span>
                                            )
                                        })
                                    }
                                </p>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={6} xs={12} className="hotel-detail-main-header-right">
                            <div className="rate-stars">
                                <div className="stars-counter">
                                    <span className="stars-number-calculation">
                                        {starsCounter(hotelData.rateStars)}
                                    </span>
                                    <span className="stars-number">
                                        <span>{hotelData.rateStars}</span><span className="below"> /5</span>
                                    </span>
                                </div>
                                <p className="view">Based on {hotelData.view} views</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <CarouselSlide images={hotelData.images} />

                    <div className="hotel-detail-tag mt-3 mb-3">
                        <ul>
                            <li>Insurance</li>
                            <li>all drink included</li>
                            <li>lunch in restaurant</li>
                            <li>tour guide</li>
                            <li>travel Insurance</li>
                        </ul>
                    </div>
                </Container>

                <Container className="room-type mt-50 mb-30">
                    <p className="room-type-title">Room Type</p>
                    {hotelData.rooms.map(room => {
                        return (
                            <Room
                                images={room.images}
                                title={room.title}
                                price={room.price}
                                people={room.people}
                                acreage={room.acreage}
                                options={room.options}
                            />
                        )
                    })}
                </Container>

                <Container className="facilities mt-50 mb-50">
                    <p className="facilities-title">Facilities of {hotelData.title}</p>
                    <div className="facilities-body">
                        <Row>
                            <Col xl={3} lg={3} md={6} xs={6} className="wellness-facilities facilities-body-item">
                                <div>
                                    <IoMdFlower className="facilities-icon" />
                                </div>
                                <div className="facilities-list">
                                    <p>Wellness facilities</p>
                                    <ul className="facilities-list-item">
                                        {hotelData.facilities.wellnessFacilities.map(item => {
                                            return (
                                                <li>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={6} xs={6} className="food-and-drink facilities-body-item">
                                <div>
                                    <FaHamburger className="facilities-icon" />
                                </div>
                                <div className="facilities-list">
                                    <p>Food & Drink</p>
                                    <ul className="facilities-list-item">
                                        {hotelData.facilities.foodAndDrink.map(item => {
                                            return (
                                                <li>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={6} xs={6} className="cleaning-services facilities-body-item">
                                <div>
                                    <GiBroom className="facilities-icon" />
                                </div>
                                <div className="facilities-list">
                                    <p>Cleaning services</p>
                                    <ul className="facilities-list-item">
                                        {hotelData.facilities.cleaningServices.map(item => {
                                            return (
                                                <li>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>
                            <Col xl={3} lg={3} md={6} xs={6} className="popular-facilities facilities-body-item">
                                <div>
                                    <RiHomeHeartFill className="facilities-icon" />
                                </div>
                                <div className="facilities-list">
                                    <p>Popular facilities</p>
                                    <ul className="facilities-list-item">
                                        {hotelData.facilities.popularFacilities.map(item => {
                                            return (
                                                <li>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>

                <Container className="comments mb-50">
                    <p className="comments-title">Guests loved their stay<span> (69)</span></p>
                    <Row>
                        <Col xl={9} className="comments-list mt-30">
                            <div>
                                {commentData.map(comment => {
                                    return (
                                        <Comment 
                                            avatar={comment.avatar} 
                                            name={comment.name}
                                            content={comment.content} 
                                            rateStars={comment.rateStars} 
                                            national={comment.national}
                                        />
                                    );
                                })}
                            </div>
                            <div className="view-more-comment mt-30 mb-30">
                                <Link><p><span>View more</span> (69)</p></Link>
                            </div>
                        </Col>
                        <Col xl={3}>
                            <RateTable />
                        </Col>
                    </Row>
                </Container>

                <Container className="mb-50">
                    <CommentForm />
                </Container>

                <Container className="similar-hotels mb-50">
                    <p className="similar-hotels-title">Similar hotels</p>
                    <Row>
                        {similarHotelData.map(hotel => {
                            return (
                                <Col lg={4} md={6} sx={12} className="mb-30">
                                    <ThumbnailHotelItem
                                        image={hotel.image}
                                        title={hotel.title}
                                        sale={hotel.sale}
                                        location={hotel.location}
                                        rateStars={hotel.rateStars}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
}

export default HotelDetail;