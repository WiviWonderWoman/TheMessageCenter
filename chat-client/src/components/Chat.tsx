import { Component, createRef } from "react";
import chat from "../images/chat.png";
import { Room } from "./Room";

interface Props {
    user: string,
    connection: any
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

    handleClick() {
        console.log('Room: ',this.state.roomName);
        this.joiningRoom(this.state.roomName);
        this.setState({
            hasRoomName: true
        });
    }

    async joiningRoom(roomName: string) {
        if (this.props.connection) {
            try {
                await this.props.connection.invoke('AddToGroup', roomName);
            } 
            catch (error) {
                console.log('Failed to join room: ', error)
            }
        }
        else {
            alert('No connection to server.');
        }
    }

    async removeUser(roomName: string) {
        if (this.props.connection) {
            try {
                await this.props.connection.invoke('RemoveFromGroup', roomName);
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
                    <p>Ange namn på chatrum för att börja chatta:</p>
                    <input ref={this.roomRef} type='text' onChange={this.handleChange}/><br/><br/>
                    <button onClick={this.handleClick}>Börja Chatten!</button>
                </>
            )
        }

        else {
            return(
                <>
                    <Room connection={this.props.connection} roomName={this.state.roomName} user={this.props.user} leaveRoom={(roomName: string) => this.removeUser(roomName)} />
                </>
            )
        }
    }
}