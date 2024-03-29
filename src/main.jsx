import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../node_modules/bootstrap/scss/bootstrap.scss';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.jsx';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
