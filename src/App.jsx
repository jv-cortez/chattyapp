import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//add api??? emojis??? able to add imgs, figure out location
// should scroll down when messages are at the end of the page, there is some extra space behind the chatbar that users can scroll down to
//mysterious empty div shows up near the top
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentUser: {name:''},
      messages: [],
      usersConnected: 0 
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
    this.setState({
      messages:[{
        type:'welcomeMessage',
        username: 'ChattyBot',
        content: 'Welcome to Chatty! You\'re Anonymous for now, but you can change that in the \'Username here\' box!'
      }]
    })
    this.ws = new WebSocket ('ws://localhost:3001');
    this.ws.onmessage = (event) => { 
      const message =JSON.parse(event.data)
      switch(message.type) {
        case 'postMessage':
          message.type = 'incomingMessage';
          break;
        case 'postNotification':
          message.type = 'incomingNotification';
          message.content = this.state.currentUser.name + ' changed their name to ' + message.username;
          break;
        case 'updateUserCount':
          this.setState({
            name: message.username,
            content:message.content,
            usersConnected: message.count
          })
          break;
        case 'userDisconnected':
        this.setState({
          name: message.username,
          content:message.content,
          usersConnected: message.count
        })
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
          <p className="userCount"> People online: {this.state.usersConnected}</p>
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
