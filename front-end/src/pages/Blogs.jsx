import React, { useState, useEffect } from "react";
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

import blogApi from "../api/blogApi";
import { useRouteMatch } from "react-router-dom";
import { dateToYMD } from "../helpers/format";
import Pagination from "react-js-pagination";
import ToursApi from "../api/toursApi";

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
    //phân trang
    const [pagination, setPagination] = useState()
    //console.log(pagination)

    const [blogs, setBLogs] = useState([]);

    const [tours, setTours] = useState([]);

    let [totalPages, setTotalPages] = useState();
    let [totalDocs, setTotalDocs] = useState();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogApi.getPaginate(pagination);

                //console.log(response)
                if (response.success) {
                    setBLogs(response.data.docs);

                    setTotalPages(response.data.totalPages)
                    setTotalDocs(response.data.totalDocs);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTours = async () => {
            try {
                const response = await ToursApi.getAll();
                if (response.success) {
                    setTours(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
        fetchTours();
    }, [pagination]);

    // lấy đường dẫn hiện tại
    const { url } = useRouteMatch();

    const getSubStringContent = (text) => {
        const newText = text.replace(/<[^>]+>/g, "");
    
        return newText.substring(0, 70);
    };
    
    return (
        <MainLayout>
            <div className="blogs">
                <BreadcrumbBanner pageName="Blogs" backgroundImage={bannerBackground} />
                <Container className="post-list-of-blogs mt-20">
                    <Row>
                        {blogs &&
                            blogs.length > 0 &&
                                blogs.map(post => {
                                    return (
                                        <Col lg={4} md={4}>
                                            <Post
                                                _id={post._id}
                                                image={`${process.env.REACT_APP_API_URL}/${post.banner}`}
                                                dataTime={dateToYMD(new Date(post.created_at))}
                                                view={post.views}
                                                title={post.title}
                                                content={`${getSubStringContent(post.content)}...`}
                                                slug={post.slug}
                                            />
                                        </Col>
                                    );
                                })
                        }
                    </Row>

                    {/* <Paginate /> */}
                    <div className="pagination-bar text-center">
                        {totalDocs > 0 &&
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={pagination}
                                itemsCountPerPage={10}
                                totalItemsCount={totalDocs}
                                pageRangeDisplayed={totalPages}
                                onChange={(page) => setPagination(page)}
                            />
                        }
                    </div>

                    <p className="popular-tour mt-50">Popular Tour</p>
                    <Row className="pt-20 pb-50">
                        {tours &&
                            tours.length > 0 &&
                                tours.slice(0, 3).map(tour => {
                                    return (
                                        tour.isFeatured &&
                                            <Col xl={4} lg={4} md={6} sx={12} className="mb-30">
                                                <ThumbnailTourItem
                                                    image={tour.image[0]}
                                                    title={tour.title}
                                                    duration={tour.duration}
                                                    price={tour.price.adult}
                                                    sale={tour.sale_price.adult}
                                                    saleToday={tour.sale_price.adult}
                                                    id={tour._id}
                                                    slug={tour.slug}
                                                />
                                            </Col>
                                    );
                                })
                        }
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
};

export default Blogs;