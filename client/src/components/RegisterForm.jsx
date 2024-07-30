import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetError } from '../redux/actions'; // добавляем resetError
import { Button, Form } from 'react-bootstrap';
import '../styles/registerForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(state => state.auth.message);
    const error = useSelector(state => state.auth.error);
    const token = useSelector(state => state.auth.token);
    const darkTheme = useSelector(state => state.darkTheme);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        dispatch(resetError()); // сбрасываем ошибку при монтировании
    }, [dispatch]);

    const handleRegister = async () => {
        try {
            await dispatch(registerUser(username, password));
            navigate('/login');
        } catch (error) {
            // Ошибка будет обработана через состояние Redux
        }
    };

    return (
        <div className={darkTheme ? 'register register--dark' : 'register register--white'}>
            <div className="register__container">
                <h1 className="register__title">Register</h1>
                <Form className="register__form">
                    <Form.Group className="mb-3" controlId="formGroupLogin">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    {error && <p className="register__error">{error}</p>}
                    <Button variant="primary" onClick={handleRegister}>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
