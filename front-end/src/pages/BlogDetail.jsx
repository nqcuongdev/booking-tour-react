import React, { useState, useEffect } from "react";
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
import { BsFillPersonFill, BsGrid3X3Gap, BsChevronLeft, BsChevronRight} from 'react-icons/bs';
import PopularTags from '../components/PopularTags/PopularTags';
import avatar_1 from '../assets/images/avatar-testimonial/avatar-1.jpg';
import avatar_2 from '../assets/images/avatar-testimonial/avatar-2.jpg';
import avatar_3 from '../assets/images/avatar-testimonial/avatar-3.jpg';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import Comment from '../components/Comment/Comment';
import CommentForm from '../components/CommentForm/CommentForm';
import Post from '../components/Post/Post';
import adImage from "../assets/images/ad.png";
import AdItem from "../components/AdItem/AdItem";
import BlogApi from "../api/blogApi";
import { dateToYMD } from "../helpers/format";

const postData = {
    blogImage: post_1,
    location: 'Thailand',
    dateTime: '30th November, 2020',
    view: 69,
    title: 'Vietnamese special places',
    description: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel.',
    content: 'Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes. Vivavivu is a Multipurpose Sketch template with 06 homepages. Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and effectively create your very own travel booking website to offer hotel, tours, car and cruise bookings in minutes. Vivavivu is a Multipurpose Sketch template with 06 homepages.',
    quotes: 'We’re on a mission to build a better futer where technology creates good fobs for everyone.',
    tag: ['travel guide', 'design', 'thememove', 'famous location'],
    author: {
        name: 'Hun Hun',
        avatar: avatar_3,
        description: 'Hi anh em, minh la Hun Hun ne! Chung minh cung lam quen nha <3 Hi anh em, minh la Hun Hun ne! Chung minh cung lam quen nha <3'
    }
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

const relatedPostsData = [
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
    }
];

const popularItem = {
    text1: "Summer Stay",
    text2: "for single couple",
    image: adImage,
};

const BlogDetail = (props) => {
    const [blog, setBlog] = useState([])
    const [author, setAuthor] = useState([])
    const [tag, setTag] = useState([])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const id = props.location.state.id
                const response = await BlogApi.show(id)

                setBlog(response.data)
                setAuthor(response.data.created_by)
                setTag(response.data.tags)
            } catch (error) {
                console.log('Fail to fetch Destination: ', error)
            }
        }
        fetchBlog()
    }, [])

    let location = {
        center: {
          lat: blog.lat,
          lng: blog.lng,
        },
        zoom: blog.map_zoom,
        address: blog.address,
    };

    console.log(blog)

    return (
        <MainLayout>
            <div className="blog-detail">
                <div className="blog-detail-link">
                    <Container>
                        <span><span><Link to="/">Home</Link> / <Link to="/blogs">Blogs</Link> /</span> {blog.title}</span>
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
                            <AdItem {...popularItem} />
                            <PopularTags popularTags={popularTags} />
                        </Col>
                        <Col xl={9} lg={8} md={7} xs={12} className="blog-detail-content">
                            <img src={`${process.env.REACT_APP_API_URL}/${blog.banner}`} alt="" className="post-image"/>
                            <p className="post-title">{blog.title}</p>
                            <div className="post-info mt-10">
                                <ul>
                                    <li><BsFillPersonFill /> {author.full_name}</li>
                                    <li><BiCalendarWeek /> {dateToYMD(new Date(blog.created_at))}</li>
                                    <li><AiOutlineEye /> {blog.views}</li>
                                </ul>
                            </div>
                            {/* <div className="post-description mt-30">
                                <p dangerouslySetInnerHTML={{__html: blog.content}}></p>
                            </div> */}
                            {/* <div className="post-quotes mt-30">
                                <div className="quotes">
                                    <span>{postData.quotes}</span>
                                </div>
                            </div> */}
                            <div className="post-content mt-30">
                                <p dangerouslySetInnerHTML={{__html: blog.content}}></p>
                            </div>
                            <div className="post-tag mb-30">
                                <AiFillTag />
                                {tag.map((tag, index) => {
                                    if (index === 0) {
                                        return (
                                            <span><Link to='#' className="orange-text"> {tag.title}</Link></span>
                                        );
                                    } else {
                                        return (
                                            <span><Link to='#'> . {tag.title}</Link></span>
                                        );
                                    }
                                })}
                            </div>
                            <hr/>
                            <div className="author-info mt-30">
                                <div className="author-avatar">
                                    <img src={postData.author.avatar} alt={postData.author.avatar} />
                                    <div className="author-social mt-10">
                                        <ul>
                                            <li><Link to="#"><FaFacebookF className="icon" title="Facebook" /></Link></li>
                                            <li><Link to="#"><FaInstagram className="icon" title="Instagram" /></Link></li>
                                            <li><Link to="#"><FaTwitter className="icon" title="Twitter" /></Link></li>
                                            <li><Link to="#"><FaGithub className="icon" title="Github" /></Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="author-name-description">
                                    <p className="author-name">{postData.author.name}</p>
                                    <span className="author-description">{postData.author.description}</span>
                                </div>
                            </div>
                            <div className="blog-detail-content-paginate mt-20">
                                <div className="previous-post">
                                    <Link to="#" className="link"><BsChevronLeft /> Title of previous post</Link>
                                </div>
                                <div className="grid-circle">
                                    <div className="border-circle">
                                        <BsGrid3X3Gap className="grid-icon" />
                                    </div>
                                </div>
                                <div className="next-post">
                                    <Link to="#" className="link">Title of next post <BsChevronRight /></Link>
                                </div>
                            </div>
                            <div className="post-comment mt-50 mb-30">
                                <p className="post-comment-title">Comment <span className="post-comment-count">(69)</span></p>
                                <div className="post-comment-list mt-30">
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
                                <hr/>
                            </div>
                            <div className="post-comment-form mb-30">
                                <CommentForm />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="related-posts">
                    <Container>
                        <p className="related-posts-title">Related posts</p>
                        <Row>
                            {relatedPostsData.map(post => {
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
                    </Container>
                </div>

                <Subscribe />
            </div>
        </MainLayout>
    );
}

export default BlogDetail;