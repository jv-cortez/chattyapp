import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//need to add anonymous label if a username isn't provided
//add api??? emojis???
//change color. this type of orange is gross

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentUser: {name:'Anonymous'},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(type, username, content){
    var message = {
      type: type,
      username: username,
      content: content
    }
    this.ws.send(JSON.stringify(message)); //client message
  }
  componentDidMount() {
    this.ws = new WebSocket ('ws://localhost:3001');
    this.ws.onmessage = (event) => { 
      const message =JSON.parse(event.data)
      switch(message.type) {
        case 'postMessage':
          message.type = 'incomingMessage';
          message.username = this.state.currentUser.name
          break;
        case 'postNotification':
          message.type = 'incomingNotification';
          message.content = this.state.currentUser.name + ' changed their name to ' + message.username;
          break;
        default:
          throw new Error ('Unknown type' + message.type);
      }
      const messages = this.state.messages.concat(message);      
      this.setState({
        messages
      })
    }
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
          onNewPost={this.addMessage} 
        />
      </div>
    );
  }
}

export default App;
