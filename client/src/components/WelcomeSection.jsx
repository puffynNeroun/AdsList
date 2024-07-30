import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import '../styles/welcome.css';

const WelcomeSection = () => {
    return (
        <Container fluid className="welcome-section my-4">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Welcome to Our Ad Platform</h1>
                    <p>
                        Explore a wide range of advertisements. Find what you need or post your own ad.
                    </p>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="../../public/images/slide1.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption className='slide-content'>
                                <h3>Discover Amazing Ads</h3>
                                <p>Find the best deals and offers.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="../../public/images/slide2.jpg"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Post Your Own Ad</h3>
                                <p>Reach a wide audience with your ads.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="../../public/images/slide3.png"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h3>Easy and Convenient</h3>
                                <p>Post and manage your ads with ease.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
};

export default WelcomeSection;
