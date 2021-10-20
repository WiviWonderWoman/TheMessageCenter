import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import '../index.css';
import { CleaningChatRoom } from "./CleaningChatRoom";
import { GeneralChatRoom } from "./GeneralChatRoom";
import { KitchenChatRoom } from "./KitchenChatRoom";

export class Chat extends Component<{},{}> {

    render() {
        return(
            <div className='App-header'>
                <h1>Chat</h1> 
                <p>Följande chat rum finns tillgängliga:</p> 
                <nav>
                    <ul className='navbar'>
                        <li><Link to={'/general'} className='navlink'>Allmänt</Link></li>
                        <li><Link to={'/kitchen'} className='navlink'>Kök</Link></li>
                        <li><Link to={'/cleaning'} className='navlink'>Städ</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path={'/general'}>
                        <GeneralChatRoom/>
                    </Route>
                    <Route exact path={'/kitchen'}>
                        <KitchenChatRoom/>
                    </Route>
                    <Route exact path={'/cleaning'}>
                        <CleaningChatRoom/>
                    </Route>
                </Switch>
            </div>
        )
    }
}