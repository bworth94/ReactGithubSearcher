import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Routing from './Routing';

import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducer from './reducers/reducer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

let store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>     
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();