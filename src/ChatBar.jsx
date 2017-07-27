import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();
    this.state = {
      user:'',
      content:''
    }
    this.onContent = this.onContent.bind(this)
    this.onPost = this.onPost.bind(this)
    this.onUserContent = this.onUserContent.bind(this)
    this.onUserPost = this.onUserPost.bind(this)
  }
  onContent(event) {
    this.setState({
      content: event.target.value
    })
  }
  onPost(keyPressed) {
    const enterPressed = keyPressed.key
    if (enterPressed === 'Enter') {
      this.props.onNewPost('postMessage',this.state.user, this.state.content);
    }
  }
  onUserContent(event) {
    this.setState({
      user: event.target.value,
    })
  }
  onUserPost(keyPressed) {
    const enterPressed = keyPressed.key;
    if (enterPressed === 'Enter') {
      this.props.onNewPost('postNotification',this.state.user);
    }
  }
  render() {
    return (
       <div>  
        <footer className="chatbar">
            <input
              className="chatbar-username"
              onInput={this.onUserContent}
              onKeyUp={this.onUserPost}
              placeholder= "Username here"
            />
            <input 
              className="chatbar-message" 
              onInput={this.onContent}
              onKeyUp={this.onPost}
              placeholder="Type a message and hit ENTER"
            />
        </footer>
      </div>
    )
  }
}
export default ChatBar;