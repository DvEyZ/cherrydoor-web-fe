import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Helmet>
            <title>Cherrydoor</title>
        </Helmet>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
)
