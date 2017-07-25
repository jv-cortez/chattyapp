import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
    render(){
        return(
            <div className="message">
                <nav className="navbar">
                    <a href="/" className="navbar-brand">Chatty</a>
                </nav>
                <Message />
            </div>
        
        )
    }
}

export default MessageList;