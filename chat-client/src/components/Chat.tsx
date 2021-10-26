import { Component, createRef } from "react";
import chat from "../images/chat.png";
import { Room } from "./Room";

interface Props {
    user: string,
    connection: any,
    rooms: {
        roomName: string;
      }[],
      sendRoom: Function
}

interface State {
    roomName: string,
    hasRoomName: boolean
}

export class Chat extends Component<Props, State> {

    state: State ={
        roomName: '',
        hasRoomName: false
    }

    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handelRoomChoice = this.handelRoomChoice.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.joiningRoom = this.joiningRoom.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }
    // create a ref to store the textInput DOM element
    private roomRef = createRef<HTMLInputElement>();

    handleChange() {
        this.setState({
            roomName: this.roomRef.current!.value
        });
    }

    handelRoomChoice(room: string) {
        console.log(room);
        this.joiningRoom(room, this.props.user);
        this.setState({
            roomName: room,
            hasRoomName: true
        });
    }

    handleClick() {
        console.log('Room: ',this.state.roomName);
        this.props.sendRoom(this.state.roomName);
        this.joiningRoom(this.state.roomName, this.props.user);
        this.setState({
            hasRoomName: true
        });
    }

    async joiningRoom(roomName: string, userName: string) {
        if (this.props.connection) {
            try {
                await this.props.connection.invoke('AddToGroup', roomName, userName);
            } 
            catch (error) {
                console.log('Failed to join room: ', error)
            }
        }
        else {
            alert('No connection to server.');
        }
    }

    async removeUser(roomName: string, userName: string) {
        if (this.props.connection) {
            try {
                await this.props.connection.invoke('RemoveFromGroup', roomName, userName);
                this.setState({
                    roomName: '',
                    hasRoomName: false
                })
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
        if (!this.state.hasRoomName) {
            return(
                <>
                    <h1>Välkommen till Hotell Mercer's chat!</h1>
                    <img src={chat} alt='chat icon' className='App-logo'></img>
                    <p>Välj chatrum för att börja chatta:</p>
                    {this.props.rooms.map((room) => <button onClick={() => this.handelRoomChoice(room.roomName)} key={room.roomName}>{room.roomName}</button>)}
                    <p>Ange namn på chatrum för att börja chatta:</p>
                    <input ref={this.roomRef} type='text' onChange={this.handleChange}/><br/><br/>
                    <button onClick={this.handleClick}>Börja Chatten!</button>
                </>
            )
        }

        else {
            return(
                <>
                    <Room connection={this.props.connection} roomName={this.state.roomName} user={this.props.user} leaveRoom={(roomName: string, userName: string) => this.removeUser(roomName, this.props.user)} />
                </>
            )
        }
    }
}