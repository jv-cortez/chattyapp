import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name:''},
      messages: [],
      usersConnected: 0, 
    };
    this.addMessage = this.addMessage.bind(this);
  }
  //creates message variable from the chatbar input
  addMessage(type, username, content, color) {
    const message = {
      type: type,
      username: username,
      content: content,
      color: color
    };
    this.ws.send(JSON.stringify(message));
  }
  componentDidMount() {
    this.setState({
      messages:[{
        type:'welcomeMessage',
        username: 'ChattyBot',
        content: 'Welcome to Chatty! You\'re Anonymous for now, but you can change that in the \'Username here\' box!'
      }]
    });
    this.ws = new WebSocket ('ws://localhost:3001');
    //receives message from the server
    this.ws.onmessage = (event) => { 
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'postMessage':
          message.type = 'incomingMessage';
          break;
        case 'postNotification':
          message.type = 'incomingNotification';
          message.content = 'A Chatter has changed their name to ' + message.username;
          break;
        case 'updateUserCount':
          this.setState({
            name: message.username,
            content:message.content,
            usersConnected: message.count
          });
          break;
        case 'userDisconnected':
          this.setState({
            name: message.username,
            content:message.content,
            usersConnected: message.count
          });
          break;
        case 'usernameTextColor':
        message.content = message.username + ' changed their username color to  ' + message.color + '!'  
        this.setState({
            color: message.color
          });
        break;  
        default:
          throw new Error ('Unknown type' + message.type);
      }
      const messages = this.state.messages.concat(message);      
      this.setState({
        messages
      });
    };
  }
  render() {
    return (
      <div>
        <nav className = "navbar">
          <a href = "/" className = "navbar-brand">Chatty</a>
          <p className = "userCount"> 
          People online: { this.state.usersConnected }</p>
        </nav>
        <MessageList posts = { this.state.messages } />
        <ChatBar 
          userName = { this.state.currentUser.name }
          onNewPost = { this.addMessage } 
        />
      </div>
    );
  }
}
export default App;