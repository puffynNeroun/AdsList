import {
    FETCH_ADS_REQUEST,
    FETCH_ADS_SUCCESS,
    FETCH_ADS_FAILURE,
    CREATE_AD_REQUEST,
    CREATE_AD_SUCCESS,
    CREATE_AD_FAILURE,
    UPDATE_AD_REQUEST,
    UPDATE_AD_SUCCESS,
    UPDATE_AD_FAILURE,
    DELETE_AD_REQUEST,
    DELETE_AD_SUCCESS,
    DELETE_AD_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    TOGGLE_THEME,
    SEARCH_ADS_REQUEST,
    SEARCH_ADS_FAILURE,
    RESET_ERROR, SEARCH_ADS_SUCCESS
} from './actions';

const initialState = {
    ads: {},
    loading: false,
    error: null,
    auth: {
        token: null,
        message: '',
        error: null
    },
    darkTheme: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADS_REQUEST:
        case CREATE_AD_REQUEST:
        case UPDATE_AD_REQUEST:
        case DELETE_AD_REQUEST:
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case SEARCH_ADS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case SEARCH_ADS_SUCCESS:
            return {
                ...state,
                ads: action.payload.reduce((acc, ad) => {
                    acc[ad.id] = ad;
                    return acc;
                }, {}),
                loading: false,
                error: null
            };
        case SEARCH_ADS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_ADS_SUCCESS:
            const newAds = action.payload.reduce((acc, ad) => {
                acc[ad.id] = ad;
                return acc;
            }, {});

            return {
                ...state,
                ads: { ...state.ads, ...newAds },
                loading: false,
                error: null
            };

        case CREATE_AD_SUCCESS:
        case UPDATE_AD_SUCCESS:
            const updatedAds = {
                ...state.ads,
                [action.payload.id]: action.payload
            };
            return {
                ...state,
                ads: updatedAds,
                loading: false,
                error: null
            };
        case DELETE_AD_SUCCESS:
            const { [action.payload]: _, ...remainingAds } = state.ads;  // Удаляем объявление из состояния
            return {
                ...state,
                ads: remainingAds,
                loading: false,
                error: null
            };
        case FETCH_ADS_FAILURE:
        case CREATE_AD_FAILURE:
        case UPDATE_AD_FAILURE:
        case DELETE_AD_FAILURE:
        case SEARCH_ADS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: {
                    token: action.payload,
                    message: '',
                    error: null
                }
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                auth: {
                    token: null,
                    message: action.payload,
                    error: null
                }
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                auth: {
                    ...state.auth,
                    error: action.payload
                }
            };
        case TOGGLE_THEME:
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        case RESET_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default rootReducer;
