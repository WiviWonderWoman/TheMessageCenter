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
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleChange() {
        this.setState({
            message: this.messageRef.current!.value
        });
    }

    handleSend() {
        this.props.sendMessage(this.state.message);
        this.messageRef.current!.value = '';
    }    

    render() {
        var value = 'Skriv till '+this.props.roomName;
        return(
            <div className='chatInput'>
                <input autoComplete="off" id='message' ref={this.messageRef} type='text' onChange={this.handleChange} placeholder={value}></input><br/>
                <button onClick={this.handleSend}>Skicka</button>
            </div>
        )
    }
}