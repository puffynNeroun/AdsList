
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h4>Contact Us</h4>
                        <ListGroup>
                            <ListGroupItem className="border-0">
                                <strong>Email:</strong> contact@example.com
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <strong>Phone:</strong> +123 456 7890
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <strong>Address:</strong> 123 Main Street, City, Country
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h4>Quick Links</h4>
                        <ListGroup>
                            <ListGroupItem className="border-0">
                                <a href="/">Home</a>
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <a href="/about">About Us</a>
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <a href="/services">Services</a>
                            </ListGroupItem>
                            <ListGroupItem className="border-0">
                                <a href="/contact">Contact</a>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" aria-label="LinkedIn" className="social-icon">
                                <FaLinkedin />
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
