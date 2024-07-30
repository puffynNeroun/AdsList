import axios from 'axios';

export const FETCH_ADS_REQUEST = 'FETCH_ADS_REQUEST';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';

export const CREATE_AD_REQUEST = 'CREATE_AD_REQUEST';
export const CREATE_AD_SUCCESS = 'CREATE_AD_SUCCESS';
export const CREATE_AD_FAILURE = 'CREATE_AD_FAILURE';

export const UPDATE_AD_REQUEST = 'UPDATE_AD_REQUEST';
export const UPDATE_AD_SUCCESS = 'UPDATE_AD_SUCCESS';
export const UPDATE_AD_FAILURE = 'UPDATE_AD_FAILURE';

export const DELETE_AD_REQUEST = 'DELETE_AD_REQUEST';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const SEARCH_ADS_REQUEST = 'SEARCH_ADS_REQUEST';
export const SEARCH_ADS_SUCCESS = 'SEARCH_ADS_SUCCESS';
export const SEARCH_ADS_FAILURE = 'SEARCH_ADS_FAILURE';


export const TOGGLE_THEME = 'TOGGLE_THEME';

export const searchAdsRequest = () => ({
    type: SEARCH_ADS_REQUEST
});

export const searchAdsSuccess = (ads) => ({
    type: SEARCH_ADS_SUCCESS,
    payload: ads
});

export const searchAdsFailure = (error) => ({
    type: SEARCH_ADS_FAILURE,
    payload: error
});

export const searchAds = (query) => {
    return async dispatch => {
        dispatch(searchAdsRequest());
        try {
            const response = await axios.get(`http://localhost:3132/ads/search?query=${query}`);
            dispatch(searchAdsSuccess(response.data));
        } catch (error) {
            console.error('Failed to search ads', error);
            dispatch(searchAdsFailure(error.message));
        }
    };
};

export const toggleTheme = () => ({
    type: TOGGLE_THEME
});

export const fetchAdsRequest = () => ({
    type: FETCH_ADS_REQUEST
});

export const fetchAdsSuccess = (ads) => ({
    type: FETCH_ADS_SUCCESS,
    payload: ads
});

export const fetchAdsFailure = (error) => ({
    type: FETCH_ADS_FAILURE,
    payload: error
});

export const fetchAds = (page = 1) => {
    return async dispatch => {
        dispatch(fetchAdsRequest());
        try {
            const response = await axios.get(`http://localhost:3132/ads?page=${page}`);
            dispatch(fetchAdsSuccess(response.data.ads));
            return { payload: response.data.ads };
        } catch (error) {
            dispatch(fetchAdsFailure(error.message));
        }
    };
};

export const createAdRequest = () => ({
    type: CREATE_AD_REQUEST
});

export const createAdSuccess = (ad) => ({
    type: CREATE_AD_SUCCESS,
    payload: ad
});

export const createAdFailure = (error) => ({
    type: CREATE_AD_FAILURE,
    payload: error
});

export const createAd = (formData) => async (dispatch) => {
    dispatch(createAdRequest());
    try {
        const response = await axios.post('http://localhost:3132/ads/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(createAdSuccess(response.data.ad)); // изменено на response.data.ad
        return response.data.ad;
    } catch (error) {
        dispatch(createAdFailure(error.response ? error.response.data.message : 'Error creating ad'));
        throw new Error(error.response ? error.response.data.message : 'Error creating ad');
    }
};

export const updateAdRequest = () => ({
    type: UPDATE_AD_REQUEST
});

export const updateAdSuccess = (message) => ({
    type: UPDATE_AD_SUCCESS,
    payload: message // Передаем сообщение в качестве payload
});

export const updateAdFailure = (error) => ({
    type: UPDATE_AD_FAILURE,
    payload: error
});

export const updateAd = (id, adData) => {
    return dispatch => {
        dispatch(updateAdRequest());
        return axios.put(`http://localhost:3132/ads/${id}`, adData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                dispatch(updateAdSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(updateAdFailure(error));
                throw error;
            });
    };
};

export const deleteAdRequest = () => ({
    type: DELETE_AD_REQUEST
});

export const deleteAdSuccess = (message) => ({
    type: DELETE_AD_SUCCESS,
    payload: message
});

export const deleteAdFailure = (error) => ({
    type: DELETE_AD_FAILURE,
    payload: error
});

export const deleteAd = (id) => {
    return async (dispatch, getState) => {
        dispatch(deleteAdRequest());
        const token = getState().auth.token; // Получаем токен из состояния
        try {
            await axios.delete(`http://localhost:3132/ads/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            dispatch(deleteAdSuccess(id));  // Передаем id в экшн
        } catch (error) {
            dispatch(deleteAdFailure(error));
            throw error;
        }
    };
};


export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = (token) => ({
    type: LOGIN_SUCCESS,
    payload: token
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:3132/login', { username, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            dispatch(loginSuccess(token));
        } catch (error) {
            console.error('Login failed', error);
            dispatch(loginFailure(error.message));
        }
    };
};

export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = (message) => ({
    type: REGISTER_SUCCESS,
    payload: message
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});

export const registerUser = (username, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3132/register', {
            username,
            password
        });
        dispatch(registerSuccess(response.data));
    } catch (error) {
        dispatch(registerFailure(error.response?.data?.message || 'Registration failed'));
        throw error; // Чтобы обработать ошибку в компоненте
    }
};

export const RESET_ERROR = 'RESET_ERROR';

export const resetError = () => ({
    type: RESET_ERROR
});
