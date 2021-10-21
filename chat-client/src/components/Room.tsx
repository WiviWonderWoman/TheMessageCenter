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

            var currentChat = this.state.chat;
            currentChat.push(message);

            this.setState({
                hasMessages: true,
                chat: currentChat
            }); 
            // console.log('State chat: ', this.state.chat,' State hasMessage: ', this.state.hasMessages);
        })
    }

    handleLeave() {
        this.props.leaveRoom(this.props.roomName);
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
                <div>
                    <div>
                        <ChatInput user={this.props.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} />
                    </div>
                    <div>
                        <button onClick={this.handleLeave}>Lämna</button>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div>
                    <div>
                        <ChatInput user={this.props.user} roomName={this.props.roomName} sendMessage={(message: string) => this.sendMessage(message)} />
                    </div>
                    <div>
                        <button onClick={this.handleLeave}>Lämna</button>
                    </div>
                    <div>
                        <ChatDisplay chat={this.state.chat}/>
                    </div>
                </div>
            )
        }
        
    }
}