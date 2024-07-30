import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetError } from '../redux/actions'; // добавляем resetError
import { Button, Form } from 'react-bootstrap';
import '../styles/loginForm.css';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.auth.error);
    const darkTheme = useSelector(state => state.darkTheme);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/adList');
        }
    }, [token, navigate]);

    useEffect(() => {
        dispatch(resetError()); // сбрасываем ошибку при монтировании
    }, [dispatch]);

    const handleLogin = () => {
        dispatch(loginUser(username, password));
    };

    return (
        <div className={darkTheme ? 'login login--dark' : 'login login--white'}>
            <div className="login__container">
                <h1 className="login__title">Login</h1>
                <Form className="login__form">
                    <Form.Group className="mb-3" controlId="formGroupLogin">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            type="email"
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
                    {error && <p className="login__error">{error}</p>}
                </Form>
                <div className="login__buttons">
                    <Button className="login__btn" onClick={handleLogin} variant="success">
                        Login
                    </Button>
                    <NavLink to='/register'>Create a new account?</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
