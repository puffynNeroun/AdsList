// Home.jsx

import React from 'react';
import '../styles/home.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector} from 'react-redux';

const Home = () => {
    const darkTheme = useSelector(state => state.darkTheme);


    return (
        <div className={darkTheme ? 'home home--dark' : 'home home--white'}>
            <div className="home__container">
                <h1 className="home__title">Advertisement List</h1>
                <p className="home__description">To get started, you need to log in to your account or register</p>
                <div className="home__buttons">
                    <NavLink className='home__btn' to={'/register'}>
                        <Button variant="outline-primary">Register</Button>
                    </NavLink>
                    <NavLink className='home__btn' to={'/login'}>
                        <Button variant="success">Login</Button>{' '}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Home;
