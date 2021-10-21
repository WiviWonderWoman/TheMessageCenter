import { Component, createRef } from "react";
import { ChatInput } from "./ChatInput";

interface Props {
    roomName: string,
    connection: any
}

interface State {
    user: string,
    isClicked: boolean
}

export class Room extends Component<Props, State> {

    state: State = {
        user: '',
        isClicked: false
    }
    // create a ref to store the textInput DOM element
    private userRef = createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.setState({
            isClicked: false
        })
        this.handelChange = this.handelChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        
        this.props.connection.on('Send', (message: { userName: string, message: string}) => {
            console.log(message);
        })
    }

    handelChange() {
        this.setState({
            user: this.userRef.current!.value,
        });
    }

    saveUser() {
        this.setState({
            isClicked: true
        })
        // this.sendMessage(chatMessage);
        console.log('ChatMessage: ',this.userRef.current!.value);
        console.log('State user: ',this.state.user);
    }
    
    async sendMessage(message: string) {
        var chatMessage = {
            user: this.state.user,
            message: message,
        }
        // console.log(chatMessage);

        await this.props.connection.invoke('SendMessageToGroup', this.props.roomName, chatMessage)  
    }

    async leaveRoom() {
        if (this.props.connection) {
            try {
                await this.props.connection.invoke('RemoveFromGroup', this.props.roomName);
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
                <div>
                    <h1>{this.props.roomName}</h1>
                    <label htmlFor='user'>Ange ditt användarnamn:</label><br/><br/>
                    <input id='user' ref={this.userRef} type='text' onChange={this.handelChange} /><br/><br/>
                    <button onClick={this.saveUser}>Spara</button>
                </div>
            )
        }
        else {
            return(
                <div>
                    <ChatInput user={this.state.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} leaveRoom={() => this.leaveRoom()}/>
                    
                </div>
            )
        }
        
    }
}