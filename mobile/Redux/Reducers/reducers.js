import { combineReducers } from 'redux';

const rootReducer = (state = {
    token: {},
    accountValid: {},
    currentModule: {},
    currentModuleName: {},
    loading: true,
    loadingModule: true,
    loadingModuleName: true,
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
        case 'GET_CURRENT_MODULE_NAME':
            return { ...state, currentModuleName: action.currentModuleName };
        case 'SAVE_CURRENT_MODULE_NAME':
            return { ...state, currentModuleName: action.currentModuleName };
        case 'REMOVE_CURRENT_MODULE_NAME':
            return { ...state, currentModuleName: action.currentModuleName };
        case 'LOADING':
            return { ...state, loading: action.isLoading };
        case 'LOADING_MODULE':
            return { ...state, loadingModule: action.isLoadingModule };
        case 'LOADING_MODULE_NAME':
            return { ...state, loadingModuleName: action.isLoadingModule };
        case 'GET_ACCOUNT_VALID':
            return { ...state, accountValid: action.accountValid };
        case 'SAVE_ACCOUNT_VALID':
            return { ...state, accountValid: action.accountValid };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default combineReducers({
    token: rootReducer,
    currentModule: rootReducer,
    currentModuleName: rootReducer,
    accountValid: rootReducer,
});