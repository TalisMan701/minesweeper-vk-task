import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/_normalize.scss';
import Game from './components/Game/Game';
import {setupStore} from './store/redux-store';
import {Provider} from 'react-redux';

export const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Game />
        </Provider>
    </React.StrictMode>,
);

// eslint-disable-next-line
// @ts-ignore
window.store = store;
