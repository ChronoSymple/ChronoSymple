import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppController from './Controller/AppController';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import i18n from 'i18next';
import './i18n';



i18n.init({
    interpolation: { escapeValue: false },  
});

ReactDOM.render(<AppController />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
