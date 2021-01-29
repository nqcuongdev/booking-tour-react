import React, { useState, useEffect } from 'react';
import './HomePost.scss';
import {
    Container, Button, Row, Col
} from 'reactstrap';
import post_1 from '../../assets/images/posts/post-1.jpg';
import post_2 from '../../assets/images/posts/post-2.jpg';
import Post from '../Post/Post';
import { Link } from "react-router-dom";
import BlogApi from "../../api/blogApi";
import { dateToYMD } from "../../helpers/format";

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
    }
];

const HomePost = (props) => {
    const [blogs, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotel = async () => {
        try {
            const response = await BlogApi.getAll();

            console.log(response)
            if (response.success) {
            setHotels(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        };

        fetchHotel();
    }, []);

    const getSubStringContent = (text) => {
        const newText = text.replace(/<[^>]+>/g, "");
    
        return newText.substring(0, 70);
    };

    return (
        <div className="home-post">
            <Container>
                <Row>
                    <Col lg={4} md={4} className="home-post-title">
                        <h2>From our blog</h2><br/>
                        <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...</p><br/>
                        <Link to="/blogs">
                            <Button className="btn-view-all">View all posts</Button>
                        </Link>
                    </Col>
                    {blogs.map(post => {
                        return (
                            post.isFeatured &&
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
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default HomePost;