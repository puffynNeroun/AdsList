import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdItem from './AdItem';
import { deleteAd, fetchAds, searchAds } from '../redux/actions';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import WelcomeSection from './WelcomeSection';
import '../styles/adList.css';

const AdList = () => {
    const ads = useSelector(state => Object.values(state.ads));
    const dispatch = useDispatch();
    const darkTheme = useSelector(state => state.darkTheme);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadAds = async () => {
            setLoading(true);
            const response = await dispatch(fetchAds(page));
            if (response.payload.length === 0) {
                setHasMore(false);
            }
            setLoading(false);
        };

        loadAds();
    }, [page, dispatch]);

    const handleDeleteAd = (id) => {
        dispatch(deleteAd(id));
    };

    const handleSearch = async () => {
        await dispatch(searchAds(search));
    };

    const observer = useRef();
    const lastAdElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <div className={darkTheme ? 'adList adList--dark' : 'adList adList--white'}>
            <div className="adList__container container">
                <WelcomeSection />
                <h2 className={darkTheme ? 'adList__title adList__title--dark' : 'adList__title adList__title--light'}>Popular Ads</h2>
                <div className="adList__search">
                    <InputGroup className="mb-3">
                        <Form.Control
                            className={'adList__searchInp'}
                            value={search}
                            placeholder={'Search...'}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search ads"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" onClick={handleSearch} id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </div>
                <div className="adList__add">
                    <NavLink to='/createAd'>
                        <Button variant="primary">Add new ad</Button>
                    </NavLink>
                </div>
                <ul className='adList__list'>
                    {ads.map((ad, index) => {
                        if (ads.length === index + 1) {
                            return (
                                <li className='adList__item' ref={lastAdElementRef} key={ad.id}>
                                    <AdItem ad={ad} darkTheme={darkTheme} handleDeleteAd={handleDeleteAd} adId={ad.id} title={ad.title}
                                            description={ad.description} img={ad.img} />
                                </li>
                            );
                        } else {
                            return (
                                <li className='adList__item' key={ad.id}>
                                    <AdItem ad={ad} darkTheme={darkTheme} handleDeleteAd={handleDeleteAd} adId={ad.id} title={ad.title}
                                            description={ad.description} img={ad.img} />
                                </li>
                            );
                        }
                    })}
                </ul>
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default AdList;
