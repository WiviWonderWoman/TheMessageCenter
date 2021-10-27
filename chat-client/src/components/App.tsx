import { Component, createRef } from "react";
import chat from "../images/chat.png";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Chat } from "./Chat";
import {getChatRooms  } from "../api/room";

interface State {
    connection: any,
    user: string,
    hasUser: boolean,
    rooms: any
}

export class App extends Component<{}, State> {

    state: State = {
        connection: new HubConnectionBuilder()
        .withUrl('https://localhost:5001/hubs/chat')
        .withAutomaticReconnect()
        .build(),
        user: '',
        hasUser: false,
        rooms: [{
            roomName: ''
          }]
    }

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    // create a ref to store the textInput DOM element
    private userRef = createRef<HTMLInputElement>();

    async componentDidMount() {

        var rooms = await getChatRooms();
        this.setState({
            rooms: rooms
        });

        if (this.state.connection) {
            this.state.connection.start()
            .then(() => {
                console.log('User with userId: ', this.state.connection.connectionId, ' is connected!');
            })
            .catch((error: any) => console.log('Connection failed: ', error));

            this.state.connection.on('SendRoom', (room: { roomName: string}) => {

                var currentRooms = this.state.rooms;
                currentRooms.push(room);
    
                this.setState({
                    rooms: currentRooms
                }); 
                console.log('App received Room: ', this.state.rooms)
            });
        }
    }

    handleChange() {
        this.setState({
            user: this.userRef.current!.value
        });
    }

    handleClick() {
        this.setState({
            hasUser: true
        });
    }

    async sendRoomToAll(newRoomName: string) {
        var room = {
            roomName: newRoomName
        };
        await this.state.connection.invoke('SendRoomToAll', room)
    }
    
    render() {

        if (!this.state.hasUser) {
            return(
                <div className='App-header'>
                    <h2>Välkommen till Hotell Mercer's chat!</h2>
                    <img src={chat} alt='chat icon' className='App-logo'></img>
                    <p>Ange användarnamn för att börja chatta:</p>
                    <input ref={this.userRef} type='text' onChange={this.handleChange}/><br/><br/>
                    <button onClick={this.handleClick}>Starta Chatten!</button>
                </div>
            )
        }
        else {
            return(
                <div >
                    <Chat sendRoom={(roomName: string) => this.sendRoomToAll(roomName)} rooms={this.state.rooms} user={this.state.user} connection={this.state.connection}/>
                </div>
            )
        }  
    }
}