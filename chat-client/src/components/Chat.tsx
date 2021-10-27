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
        this.handleRoomChoice = this.handleRoomChoice.bind(this);
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

    handleRoomChoice(room: string) {
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
                console.log('Failed to join room: ', error);
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
                });
            } 
            catch (error) {
                console.log('Failed to join room: ', error);
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
                    <div className='App-header'>
                        <img src={chat} alt='chat icon' className='App-logo'></img>
                        <h2>Välj chatrum</h2>
                    </div>
                        <div className='roomMenu'>
                        {this.props.rooms.map((room) => <button onClick={() => this.handleRoomChoice(room.roomName)} key={room.roomName}>{room.roomName}</button>)}
                    </div>
                    <div className='roomMenu'>
                    <p className='input'>Eller skapa ett nytt:</p>
                        <input  ref={this.roomRef} type='text' onChange={this.handleChange}/>
                        <button onClick={this.handleClick}>Skapa</button>
                    </div>
                </>
            )
        }

        else {
            return(
                <>
                    <div className='App-header'>
                        <h1>{this.state.roomName}</h1>
                        <img src={chat} alt='chat icon' className='App-logo'></img>
                    </div>
                    <Room connection={this.props.connection} roomName={this.state.roomName} user={this.props.user} leaveRoom={(roomName: string) => this.removeUser(roomName, this.props.user)} />
                </>
            )
        }
    }
}