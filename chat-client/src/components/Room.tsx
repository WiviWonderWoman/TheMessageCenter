import { Component } from "react";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";

interface Props {
    roomName: string,
    connection: any,
    user: string,
    leaveRoom: Function
}

interface State {
    hasMessages: boolean,
    chat: {
        user: string;
        message: string;
        color: string;
      }[]
}

export class Room extends Component<Props, State> {

    state: State = {
        hasMessages: false,
        chat: []
    }

    constructor(props: Props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        
        this.props.connection.on('Send', (message: { user: string, message: string}) => {
            var incommingMessage = {
                user: '',
                message: '',
                color: ''
            };

            if (message.user === this.props.user) {
               incommingMessage = {
                   user:'Du: ',
                   message: message.message,
                   color: 'orange'
               } 
            }
            else {
                incommingMessage = {
                    user: message.user,
                    message: message.message,
                    color: ''
                } 
            }
            var currentChat = this.state.chat;
            currentChat.push(incommingMessage);

            this.setState({
                hasMessages: true,
                chat: currentChat
            }); 
            // console.log('State chat: ', this.state.chat,' State hasMessage: ', this.state.hasMessages);
        })
    }

    handleLeave() {
        this.props.leaveRoom(this.props.roomName, this.props.user);
    }
    
    async sendMessage(message: string) {
        var chatMessage = {
            user: this.props.user,
            message: message,
        }
        await this.props.connection.invoke('SendMessageToGroup', this.props.roomName, chatMessage);
    }

    render() {
         if (!this.state.hasMessages){
            return(
                <>
                    <div className='user'>
                        <p> Inloggad som: {this.props.user}</p>
                        <button onClick={this.handleLeave}>Lämna {this.props.roomName}</button>
                    </div>
                    <div className='room' >
                        <ChatInput user={this.props.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} />
                    </div>
                </>
            )
        }
        else {
            return(
                <>
                    <div className='user'>
                        <p> Inloggad som: {this.props.user}</p>
                        <button onClick={this.handleLeave}>Lämna {this.props.roomName}</button>
                    </div>
                    <div className='room'>
                        <ChatDisplay chat={this.state.chat}/>
                        <ChatInput user={this.props.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} />
                    </div>
                </>
            )
        }
        
    }
}