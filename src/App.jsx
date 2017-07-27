import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentUser: {name:''},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }
  addMessage(username, content){
    var message = {
      username:username,
      content:content
    }
    this.ws.send(JSON.stringify(message));
  }
  componentDidMount() {
    this.ws = new WebSocket ('ws://localhost:3001');
    this.ws.onmessage = (event) => { 
      console.log("event ", event);
      let messages = [];
      messages = this.state.messages.concat(JSON.parse(event.data));
      this.setState({
        messages: messages
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
