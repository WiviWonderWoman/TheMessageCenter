import { Component, createRef } from "react";
import chat from "../images/chat.png";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Room } from "./Room";

interface State {
    connection: any,
    userId: string,
    roomName: string,
    isClicked: boolean
}

export class App extends Component<{}, State> {

    state: State = {
        connection: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build(),
        userId: '',
        roomName: '',
        isClicked: false
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.joiningRoom = this.joiningRoom.bind(this);
    }
    // create a ref to store the textInput DOM element
    private roomNameRef = createRef<HTMLInputElement>();

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
            roomName: this.roomNameRef.current!.value
        });
    }

    handleClick() {
        console.log('RoomName: ',this.state.roomName);
        this.joiningRoom(this.state.roomName);
        this.setState({
            isClicked: true
        });
        // console.log('State userId: ', this.state.userId, ' userName: ', this.state.userName, ' isClicked: ', this.state.isClicked);
    }

    async joiningRoom(roomName: string) {
        if (this.state.connection) {
            try {
                await this.state.connection.invoke('AddToGroup', roomName);
            } 
            catch (error) {
                console.log('Failed to join room: ', error)
            }
        }
        else {
            alert('No connection to server.');
        }
    }
    
    render() {
        if (!this.state.isClicked) {
            return(
                <div className='App-header'>
                    <h1>Välkommen till Hotell Mercer's chat!</h1>
                    <img src={chat} alt='chat icon' className='App-logo'></img>
                    <p>Ange rum för att börja chatta:</p>
                    <input ref={this.roomNameRef} type='text' onChange={this.handleChange}/><br/><br/>
                    <button onClick={this.handleClick}>Starta Chatten!</button>
                </div>
            )
        }

        else {
            return(
                <>
                    <Room connection={this.state.connection} roomName={this.state.roomName}/>
                </>
            )
        }  
    }
}