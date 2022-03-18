import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import configureStore from './Helper/configure/configureStore';
import { configureLocalization } from './Helper/configure/configureLocalization';
import { LocalizeProvider } from 'react-localize-redux';
import './Styles/all.css';
import './Styles/scss/styles.scss';
export const store = configureStore();
const storage = configureLocalization(store);

ReactDOM.render(
    <Provider store={storage}>
        <LocalizeProvider store={storage}>
            <App />
        </LocalizeProvider>
    </Provider>,
    document.getElementById('root'),
);
