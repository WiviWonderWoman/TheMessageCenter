import { Component } from "react";
import { ChatDisplay } from "./ChatDisplay";
import { ChatInput } from "./ChatInput";

interface Props {
    roomName: string,
    connection: any,
    user: string,
    sendMessage: Function,
    leaveRoom: Function
}

interface State {
    chat: {
        user: string;
        message: string;
        color: string;
      }[]
}

export class Room extends Component<Props, State> {

    state: State = {
        chat: []
    }

    constructor(props: Props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    componentDidMount() {
        this.props.connection.on('Send', (message: { user: string, message: string}) => {
            var incommingMessage = {
                user: '',
                message: '',
                color: ''};

            if (message.user === this.props.user) {
                incommingMessage = {
                user:'Du: ',
                message: message.message,
                color: 'orange'
                }; 
            } else {
                incommingMessage = {
                    user: message.user,
                    message: message.message,
                    color: ''
                }; 
            }
            var currentChat = this.state.chat;
            currentChat.push(incommingMessage);
            this.setState({
                chat: currentChat
            }); 
        })
    }

    handleLeave() {
        this.props.leaveRoom(this.props.roomName, this.props.user);
    }
    
    handleSend(message: string) {
        this.props.sendMessage(message);
    }

    render() {
        return(
            <>
                <div className='user'>
                    <p> Inloggad som: {this.props.user}</p>
                    <button onClick={this.handleLeave}>Lämna {this.props.roomName}</button>
                </div>
                <div className='room'>
                    <ChatDisplay chat={this.state.chat}/>
                    <ChatInput user={this.props.user} roomName={this.props.roomName} sendMessage={(message: string) => this.handleSend(message)} />
                </div>
            </>
        )
    }
}