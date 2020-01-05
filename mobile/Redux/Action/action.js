import { AsyncStorage } from 'react-native';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const loadingModule = bool => ({
    type: 'LOADING_MODULE',
    isLoadingModule: bool,
});

export const loadingModuleName = bool => ({
    type: 'LOADING_MODULE_NAME',
    isLoadingModule: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});




export const getCurrentModule = (currentModule) => ({
    type: 'GET_CURRENT_MODULE',
    currentModule
});

export const saveCurrentModule = (currentModule) => ({
    type: 'SAVE_CURRENT_MODULE',
    currentModule
});

export const removeCurrentModule = () => ({
    type: 'REMOVE_CURRENT_MODULE',
});




export const getCurrentModuleName = (currentModuleName) => ({
    type: 'GET_CURRENT_MODULE_NAME',
    currentModuleName
});

export const savecurrentModuleName = (currentModuleName) => ({
    type: 'SAVE_CURRENT_MODULE_NAME',
    currentModuleName
});

export const removeCurrentModuleName = () => ({
    type: 'REMOVE_CURRENT_MODULE_NAME',
});




export const getUserToken = () => dispatch => 
    AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const saveUserToken = (oui3) => dispatch =>
    AsyncStorage.setItem('userToken', oui3)
        .then(() => {
            dispatch(loading(false));
            dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
})

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
})




export const getUserCurrentModule = () => dispatch => 
    AsyncStorage.getItem('currentModule')
        .then((data) => {
            dispatch(loadingModule(false));
            dispatch(getCurrentModule(data));
        })
        .catch((err) => {
            dispatch(loadingModule(false));
            dispatch(error(err.message || 'ERROR'));
})

export const saveUserCurrentModule = (moduleId) => dispatch =>
    AsyncStorage.setItem('currentModule', moduleId)
    .then(() => {
        dispatch(loadingModule(false));
        dispatch(saveCurrentModule('module saved'));
    })
    .catch((err) => {
        dispatch(loadingModule(false));
        dispatch(error(err.message || 'ERROR'));
})

export const removeUserCurrentModule = () => dispatch =>
    AsyncStorage.removeItem('currentModule')
        .then((data) => {
            dispatch(loadingModule(false));
            dispatch(removeCurrentModule(data));
        })
        .catch((err) => {
            dispatch(loadingModule(false));
            dispatch(error(err.message || 'ERROR'));
})




export const getUserCurrentModuleName = () => dispatch => 
    AsyncStorage.getItem('currentModuleName')
        .then((data) => {
            dispatch(loadingModuleName(false));
            dispatch(getCurrentModuleName(data));
        })
        .catch((err) => {
            dispatch(loadingModuleName(false));
            dispatch(error(err.message || 'ERROR'));
})

export const saveUserCurrentModuleName = (moduleName) => dispatch =>
    AsyncStorage.setItem('currentModuleName', moduleName)
    .then(() => {
        dispatch(loadingModuleName(false));
        dispatch(saveCurrentModuleName('module saved'));
    })
    .catch((err) => {
        dispatch(loadingModuleName(false));
        dispatch(error(err.message || 'ERROR'));
})

export const removeUserCurrentModuleName = () => dispatch =>
    AsyncStorage.removeItem('currentModuleName')
        .then((data) => {
            dispatch(loadingModuleName(false));
            dispatch(removeCurrentModuleName(data));
        })
        .catch((err) => {
            dispatch(loadingModuleName(false));
            dispatch(error(err.message || 'ERROR'));
})