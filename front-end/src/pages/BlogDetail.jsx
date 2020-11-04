import React from "react";
import MainLayout from "../layouts/MainLayout";
import Subscribe from "../components/Subscribe/Subscribe";
import { Button, Col, Container, Input, Row } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
import post_1 from "../assets/images/posts/post-1.jpg";
import post_2 from "../assets/images/posts/post-2.jpg";
import post_3 from "../assets/images/posts/post-3.jpg";
import post_4 from "../assets/images/posts/post-4.jpg";
import { Link } from "react-router-dom";
import PopularPost from "../components/PopularPost/PopularPost";
import { BiCalendarWeek } from 'react-icons/bi';
import { AiOutlineEye, AiFillTag } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

const postName = 'Vietnamese special places';

const postData = {
    blogImage: post_1,
    location: 'Thailand',
    dateTime: '30th November, 2020',
    view: 69,
    title: 'Thailand Special places',
    description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel.',
    content: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes. Vivavivu is a Multipurpose Sketch template with 06 homepages. Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes. Vivavivu is a Multipurpose Sketch template with 06 homepages.',
    quotes: 'We’re on a mission to build a better futer where technology creates good fobs for everyone.',
    tag: ['travel guide', 'design', 'thememove', 'famous location'],
    authorName: 'Chou',
    authorImage: '',
};

const categoriesData = ["All", "Adventure", "Famous location", "Travel guide", "Life style", "Videos", "Uncategoriz"];

const popularPostData = [
    {
        image: post_1,
        title: 'Vietnamese special places',
        view: 69
    },
    {
        image: post_2,
        title: 'Vietnamese special places',
        view: 58
    },
    {
        image: post_3,
        title: 'Thailand special places',
        view: 47
    },
    {
        image: post_4,
        title: 'Thailand special places',
        view: 36
    },
];

const popularTags = ['travel', 'hotel', 'motel', 'restaurant', 'resort', 'money', 'street'];

const BlogDetail = (props) => {
    return (
        <MainLayout>
            <div className="blog-detail">
                <div className="blog-detail-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/blogs">Blogs</Link> /</span> {postName}</span>
                    </Container>
                </div>
                <Container className="blog-detail-main mt-50 pb-30 pt-30">
                    <Row>
                        <Col xl={3} lg={4} md={5} xs={12} className="blog-detail-sidebar mb-30">
                            <div className="search">
                                <Input placeholder="Search keyword" />
                                <Button><AiOutlineSearch className="search-icon" /></Button>
                            </div>
                            <div className="categories">
                                <p className="title">Categories</p>
                                {categoriesData.map(category => {
                                    return (
                                        <p className="category-item">
                                            <Link to="#">{category}</Link>
                                        </p>
                                    );
                                })}
                            </div>
                            <div className="popular-post-list">
                                <p className="popular-post-list-title">Popular Post</p>
                                {popularPostData.map(post => {
                                    return (
                                        <PopularPost 
                                            image={post.image}
                                            title={post.title}
                                            view={post.view}
                                        />
                                    );
                                })}
                            </div>
                            <div className="popular-tags">
                                <p className="popular-tags-title">Popular Tags</p>
                                <div className="popular-tags-list">
                                    {popularTags.map((tag, index) => {
                                        if (index === 0) {
                                            return (
                                                <span className="first-tag"><Link to='#' className="white-text">{tag}</Link></span>
                                            );
                                        } else {
                                            return (
                                                <span className="normal-tag"><Link to='#'>{tag}</Link></span>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col xl={9} lg={8} md={7} xs={12} className="blog-detail-content">
                            <img src={postData.blogImage} alt={postData.blogImage} className="post-image"/>
                            <p className="post-title">{postData.title}</p>
                            <div className="post-info mt-10">
                                <ul>
                                    <li><BsFillPersonFill /> {postData.authorName}</li>
                                    <li><BiCalendarWeek /> {postData.dateTime}</li>
                                    <li><AiOutlineEye /> {postData.view}</li>
                                </ul>
                            </div>
                            <div className="post-description mt-30">
                                <p>{postData.description}</p>
                            </div>
                            <div className="post-quotes mt-30">
                                <div className="quotes">
                                    <span>{postData.quotes}</span>
                                </div>
                            </div>
                            <div className="post-content mt-30">
                                <p>{postData.content}</p>
                                <p>{postData.content}</p>
                            </div>
                            <div className="post-tag mb-30">
                                <AiFillTag />
                                {postData.tag.map((tag, index) => {
                                    if (index === 0) {
                                        return (
                                            <span><Link to='#' className="orange-text"> {tag}</Link></span>
                                        );
                                    } else {
                                        return (
                                            <span><Link to='#'> . {tag}</Link></span>
                                        );
                                    }
                                })}
                            </div>
                            <hr/>
                        </Col>
                    </Row>
                </Container>

                <Subscribe />
            </div>
        </MainLayout>
    );
}

export default BlogDetail;