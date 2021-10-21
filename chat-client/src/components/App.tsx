import { Component, createRef } from "react";
import chat from "../images/chat.png";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Chat } from "./Chat";

interface State {
    connection: any,
    user: string,
    hasUser: boolean
}

export class App extends Component<{}, State> {

    state: State = {
        connection: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build(),
        user: '',
        hasUser: false
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // create a ref to store the textInput DOM element
    private userRef = createRef<HTMLInputElement>();

    componentDidMount() {

        if (this.state.connection) {
            this.state.connection.start()
            .then(() => {
                // console.log('User with userId: ', this.state.connection.connectionId, ' is connected!');
            })
            .catch((error: any) => console.log('Connection failed: ', error))
        }
    }

    handleChange() {
        // console.log('user: ', this.userNameRef.current!.value);
        this.setState({
            user: this.userRef.current!.value
        });
    }

    handleClick() {
        // console.log('User: ',this.state.user);
        this.setState({
            hasUser: true
        });
    }

    render() {
        if (!this.state.hasUser) {
            return(
                <div className='App-header'>
                    <h1>Välkommen till Hotell Mercer's chat!</h1>
                    <img src={chat} alt='chat icon' className='App-logo'></img>
                    <p>Ange användarnamn för att börja chatta:</p>
                    <input ref={this.userRef} type='text' onChange={this.handleChange}/><br/><br/>
                    <button onClick={this.handleClick}>Starta Chatten!</button>
                </div>
            )
        }

        else {
            return(
                <div className='App-header'>
                    <Chat user={this.state.user} connection={this.state.connection}/>
                </div>
            )
        }  
    }
}