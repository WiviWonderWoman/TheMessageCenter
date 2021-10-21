import { Component, createRef } from "react";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";

interface Props {
    roomName: string,
    connection: any
}

interface State {
    user: string,
    userIsSaved: boolean,
    hasMessages: boolean,
    chat: {
        user: string;
        message: string;
      }[]
}

export class Room extends Component<Props, State> {

    state: State = {
        user: '',
        userIsSaved: false,
        hasMessages: false,
        chat: []
    }
    // create a ref to store the textInput DOM element
    private userRef = createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        // this.setState({
        //     isClicked: false
        // })
        this.handelChange = this.handelChange.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        
        this.props.connection.on('Send', (message: { user: string, message: string}) => {

            var currentChat = this.state.chat;
            currentChat.push(message);

            this.setState({
                hasMessages: true,
                chat: currentChat
            }); 

            console.log('State chat: ', this.state.chat,' State hasMessage: ', this.state.hasMessages);
        })
    }

    handelChange() {
        this.setState({
            user: this.userRef.current!.value,
        });
    }

    saveUser() {
        this.setState({
            userIsSaved: true
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
        await this.props.connection.invoke('SendMessageToGroup', this.props.roomName, chatMessage);
    }

    async removeUser() {
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
        if (!this.state.userIsSaved) {
            return(
                <div>
                    <h1>{this.props.roomName}</h1>
                    <label htmlFor='user'>Ange ditt användarnamn:</label><br/><br/>
                    <input id='user' ref={this.userRef} type='text' onChange={this.handelChange} /><br/><br/>
                    <button onClick={this.saveUser}>Spara</button>
                </div>
            )
        }
        else if (!this.state.hasMessages){
            return(
                <div>
                    <ChatInput user={this.state.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} leaveRoom={() => this.removeUser()}/>
                </div>
            )
        }
        else if (this.state.userIsSaved && this.state.hasMessages) {
            return(
                <div>
                    <div>
                        <ChatInput user={this.state.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} leaveRoom={() => this.removeUser()}/>
                    </div>
                    <div>
                        <ChatDisplay chat={this.state.chat}/>
                    </div>
                </div>
            )
        }
        
    }
}