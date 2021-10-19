import { Component } from "react";
import chat from "./images/chat.png";
import "./App.css";


export class App extends Component<{}, {}> {
    // className='App-logo'
    render() {
        return(
            <div className='App-header'>
                <h1>Välkommen till Hotell Mercer's chat!</h1>
                <img src={chat} ></img>
            </div>
        )
    }
}