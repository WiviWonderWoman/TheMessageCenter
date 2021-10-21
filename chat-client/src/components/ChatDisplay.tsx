import { Component} from "react";

interface Props {
    chat: {
        user: string;
        message: string;
      }[]
}

export class ChatDisplay extends Component<Props, {}> {

    render() {
        return(
            <div>
                <ul className='chatList'>
                    {this.props.chat.map((message) => <li key={Math.random()}> {message.user}:<br/> {message.message}</li>)}
                </ul>
            </div>
        )
    }
}