import { Component, createRef } from "react";
import { HashRouter as Router } from "react-router-dom";
import chat from "../images/chat.png";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Chat } from "./Chat";

interface State {
    connection: any,
    userId: string,
    userName: string,
    isClicked: boolean
}

export class App extends Component<{}, State> {

    state: State = {
        connection: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build(),
        userId: '',
        userName: '',
        isClicked: false
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // create a ref to store the textInput DOM element
    private userNameRef = createRef<HTMLInputElement>();

    componentDidMount() {

        if (this.state.connection) {
            this.state.connection.start()
            .then(() => {
                var userId = this.state.connection.connectionId;
                console.log('User with userId: ', userId, ' is connected!');
                this.setState({
                    userId: userId
                });
                //  console.log('State userId: ', this.state.userId);
            })
            .catch((error: any) => console.log('Connection failed: ', error))
        }
    }

    handleChange() {
        // console.log('userName: ', this.userNameRef.current!.value);
        this.setState({
            userName: this.userNameRef.current!.value
        });
    }

    handleClick() {
        this.setState({
            isClicked: true
        });
        // console.log('State userId: ', this.state.userId, ' userName: ', this.state.userName, ' isClicked: ', this.state.isClicked);
    }
    
    render() {
        if (!this.state.isClicked) {
            return(
                <div className='App-header'>
                    <h1>Välkommen till Hotell Mercer's chat!</h1>
                    <img src={chat} alt='chat icon' className='App-logo'></img>
                    <p>Ange ditt användarnamn för att börja chatta:</p>
                    <input ref={this.userNameRef} type='text' onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Starta Chatten!</button>
                </div>
            )
        }

        else {
            return(
                <Router>
                    <Chat/>
                </Router>
            )
        }  
    }
}