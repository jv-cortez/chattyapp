import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Data from '../data.json'; 

class App extends Component {
  
  constructor() {
    super()
    this.state = Data
    this.createMessage = this.createMessage.bind(this)
  }


  createMessage(username, content){
    const message = {
      username, content
    }
    const messageList = this.state.messages.concat(message)
    console.log(messageList)
    this.setState({
        username: username,
        messages: messageList
      })
  }

  render() {
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList posts= {this.state.messages} />
        <ChatBar 
          userName={this.state.currentUser.name} 
          onNewPost={this.createMessage} 
        />
      </div>
    );
  }
}

export default App;
