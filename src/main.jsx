import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AntdCustomTheme from './theme/AntdCustomTheme.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='995985528236-qa771s1a2d72v14nobqapk06ggojqq9h.apps.googleusercontent.com'>
        <BrowserRouter>
          <AntdCustomTheme>
            <App />
          </AntdCustomTheme>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
