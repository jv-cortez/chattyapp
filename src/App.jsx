import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
//add api??? emojis??? able to add imgs, figure out location
// should scroll down when messages are at the end of the page
//content should delete after pressing enter in the content input
//set interval message that loads after 5 secs when the user connects 

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
            <p className="userCount"> {this.state.usersConnected} People online</p>
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
