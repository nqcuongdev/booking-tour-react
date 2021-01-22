import React from "react";
import MainLayout from "../layouts/MainLayout";
import BreadcrumbBanner from "../components/BreadcrumbBanner/BreadcrumbBanner";
import bannerBackground from "../assets/images/background-1.jpg";
import Post from "../components/Post/Post";
import { Row, Col, Container } from "reactstrap";
import post_1 from '../assets/images/posts/post-1.jpg';
import post_2 from '../assets/images/posts/post-2.jpg';
import Paginate from "../components/Paginate/Paginate";
import ThumbnailTourItem from "../components/ThumbnailTourItem/ThumbnailTourItem";

import Korea from "../assets/images/populars/1.jpg";
import NY from "../assets/images/populars/newyork.jpg";
import Cali from "../assets/images/populars/califonia.jpg";

const postsData = [
    {
        id: 'ghd793f892',
        image: post_1,
        dataTime: '26th October, 2020',
        view: 69,
        title: `Family's Paradise`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    },
    {
        id: 'hsd244f234',
        image: post_2,
        dataTime: '1st November, 2020',
        view: 96,
        title: `10 Best Places Gallery`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    },
    {
        id: 'ghd793f892',
        image: post_1,
        dataTime: '26th October, 2020',
        view: 69,
        title: `Family's Paradise`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    },
    {
        id: 'hsd244f234',
        image: post_2,
        dataTime: '1st November, 2020',
        view: 96,
        title: `10 Best Places Gallery`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    },
    {
        id: 'ghd793f892',
        image: post_1,
        dataTime: '26th October, 2020',
        view: 69,
        title: `Family's Paradise`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    },
    {
        id: 'hsd244f234',
        image: post_2,
        dataTime: '1st November, 2020',
        view: 96,
        title: `10 Best Places Gallery`,
        description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...'
    }
];

const toursData = [
    {
        title: "The Bahamas",
        price: 299,
        image: Korea,
        option: {
          during: 2,
          place: "Port Canaveral",
        },
        sale: 30,
        saleToday: null
    },
    {
        title: "The Bahamas",
        price: 299,
        image: NY,
        option: {
          during: 2,
          place: "Port Canaveral",
        },
        sale: null,
        saleToday: null
    },
    {
        title: "The Bahamas",
        price: 299,
        image: Cali,
        option: {
          during: 2,
          place: "Port Canaveral",
        },
        sale: null,
        saleToday: 25
    }
];

const Blogs = (props) => {
    return (
        <MainLayout>
            <div className="blogs">
                <BreadcrumbBanner pageName="Blogs" backgroundImage={bannerBackground} />
                <Container className="post-list-of-blogs mt-20">
                    <Row>
                        {postsData.map(post => {
                            return (
                                <Col lg={4} md={4}>
                                    <Post
                                        id={post.id}
                                        image={post.image}
                                        dataTime={post.dataTime}
                                        view={post.view}
                                        title={post.title}
                                        description={post.description}
                                    />
                                </Col>
                            );
                        })}
                    </Row>

                    <Paginate />

                    <p className="popular-tour mt-50">Popular Tour</p>
                    <Row className="pt-20 pb-50">
                        {toursData.map(tour => {
                            return (
                                <Col lg={4} md={6} sx={12} className="mb-30">
                                    <ThumbnailTourItem
                                        image={tour.image}
                                        title={tour.title}
                                        option={tour.option}
                                        price={tour.price}
                                        sale={tour.sale}
                                        saleToday={tour.saleToday}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Blogs;