import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import { HubConnectionBuilder } from '@microsoft/signalr';

var connection;
connectToServer();

ReactDOM.render(
    <React.StrictMode>
        <App connection={connection}/>
    </React.StrictMode>,
    document.getElementById('root')
);

function connectToServer() {
    connection = new HubConnectionBuilder()
    .withUrl('https://localhost:5001/hubs/chat')
    .withAutomaticReconnect()
    .build();

    return connection;
}