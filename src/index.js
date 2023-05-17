import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import MyGraph from './graph-experiment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GeistProvider>
      <CssBaseline />
      <App />
    </GeistProvider>
);
