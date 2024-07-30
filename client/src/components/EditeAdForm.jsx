import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAd } from '../redux/actions';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import '../styles/editeAdForm.css';

const EditeAdForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const adId = id;
    const darkTheme = useSelector(state => state.darkTheme);

    const ads = useSelector(state => state.ads);
    const ad = ads[adId];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: null
    });
    const [imgFile, setImgFile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (ad) {
            setFormData({
                title: ad.title,
                description: ad.description,
                img: ad.img
            });
        }
    }, [ad]);

    useEffect(() => {
        if (message === 'Ad updated successfully') {
            setTimeout(() => {
                navigate('/adList');
            }, 2000); // Задержка перед перенаправлением (2 секунды)
        }
    }, [message, navigate]);

    const handleUpdateAd = () => {
        const updatedFormData = new FormData();
        updatedFormData.append('title', formData.title);
        updatedFormData.append('description', formData.description);
        if (imgFile) {
            updatedFormData.append('img', imgFile);
        } else {
            updatedFormData.append('img', formData.img);
        }

        dispatch(updateAd(adId, updatedFormData))
            .then(response => {
                setMessage(response.payload);
            })
            .catch(error => {
                setMessage(error.payload);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setImgFile(e.target.files[0]);
    };

    return (
        <div className={darkTheme ? 'editeAdForm editeAdForm--dark' : 'editeAdForm editeAdForm--white'}>
            <Container>
                <h2 className="my-4">Edit Ad</h2>
                {message && <Alert variant={message === 'Ad updated successfully' ? 'success' : 'danger'}>{message}</Alert>}
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mt-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                    <Button className="mt-4" variant="primary" onClick={handleUpdateAd}>
                        Update
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default EditeAdForm;
