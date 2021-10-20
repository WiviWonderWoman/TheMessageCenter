import { Component } from "react";


export class Chat extends Component<{},{}> {

    render() {
        return(
            <div className='App-header'>
                <h1>Chat</h1> 
                <p>Följande chat rum finns tillgängliga:</p> 
                <button>Allmänt</button>
                <button>Reception</button>
                <button>Kök</button>
                <button>Städ</button>
            </div>
        )
    }
}