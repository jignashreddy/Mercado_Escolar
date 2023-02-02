require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Boot from './components/Boot';
import { BrowserRouter } from 'react-router-dom';
import './helper/config';

ReactDOM.render(
    <BrowserRouter>
        <Boot />
    </BrowserRouter>,
    document.getElementById('root')
);
