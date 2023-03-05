import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/_normalize.scss';
import Game from './components/Game/Game';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
);
