import React, { Component } from 'react';
import Routes from './routes/Routes';

// Themes

// default
import './assets/scss/theme.scss';
import { ToastContainer } from 'react-toastify';

/**
 * Main app component
 */
class App extends Component {
    render() {
        return (
            <>
                <Routes></Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        );
    }
}

export default App;
