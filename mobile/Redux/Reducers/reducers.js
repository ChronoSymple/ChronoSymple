import { combineReducers } from 'redux';

const rootReducer = (state = {
    token: {},
    currentModule: {},
    loading: true,
    loadingModule: true,
    error: null,
}, action) => {
    switch (action.type) {
        case 'GET_TOKEN':
            return { ...state, token: action.token };
        case 'SAVE_TOKEN':
            return { ...state, token: action.token };
        case 'REMOVE_TOKEN':
            return { ...state, token: action.token };
        case 'GET_CURRENT_MODULE':
            return { ...state, currentModule: action.currentModule };
        case 'SAVE_CURRENT_MODULE':
            return { ...state, currentModule: action.currentModule };
        case 'REMOVE_CURRENT_MODULE':
            return { ...state, currentModule: action.currentModule };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'LOADING_MODULE':
            return { ...state, loading: action.isLoadingModule };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default combineReducers({
    token: rootReducer,
    currentModule: rootReducer
});