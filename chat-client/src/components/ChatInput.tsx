import { Component, createRef } from "react";

type Props = {
    user: string,
    roomName: string,
    sendMessage: Function
}

interface State {
    message: string
}

export class ChatInput extends Component<Props, State> {

    // create a ref to store the textInput DOM element
    private messageRef = createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props);
        this.handelChange = this.handelChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handelChange() {
        this.setState({
            message: this.messageRef.current!.value
        });
    }

    handleClick() {
        this.props.sendMessage(this.state.message);
        // console.log('ChatMessage: ',this.messageRef.current!.value);
        // console.log('State message: ', this.state.message);
        this.messageRef.current!.value = '';
    }    

    render() {
        return(
            <div>
                <h1>{this.props.roomName}</h1>
                <p> Inloggad som: {this.props.user}</p>
                <label htmlFor='message'>Börja chatta:</label><br/><br/>
                <input id='message' ref={this.messageRef} type='text'  onChange={this.handelChange}></input><br/><br/>
                <button onClick={this.handleClick}>Skicka</button>
            </div>
        )
    }
}