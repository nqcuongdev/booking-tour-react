import React from 'react';
import './HomePost.scss';
import {
    Container, Button, Row, Col
} from 'reactstrap';
import post_1 from '../../assets/images/posts/post-1.jpg';
import post_2 from '../../assets/images/posts/post-2.jpg';
import Post from '../Post/Post';

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
    return (
        <div className="home-post">
            <Container>
                <Row>
                    <Col lg={4} md={4} className="home-post-title">
                        <h2>From our blog</h2><br/>
                        <p>Vivavivu is a Multipurpose Sketch template with 06 homepages. This template allows you to easily and...</p><br/>
                        <Button className="btn-view-all">View all posts</Button>
                    </Col>
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
            </Container>
        </div>
    );
};

export default HomePost;