import { Component} from "react";

interface Props {
    chat: {
        user: string;
        message: string;
        color: string;
      }[]
}

export class ChatDisplay extends Component<Props, {}> {

    render() {
        return(
            <div className='chatDisplay'>
                <fieldset>
                    <legend>CHAT:</legend>
                    <ul className='chatList'>
                        {this.props.chat.map((message) => <li className= {message.color} key={Math.random()}><strong>{message.user}</strong><br/> {message.message}</li>)}
                    </ul>
                </fieldset>
            </div>
        )
    }
}