import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      user:'Anonymous',
      content:'',
      color:''
    };
    this.handleColorChange=this.handleColorChange.bind(this);
    this.onContent = this.onContent.bind(this);
    this.onPost = this.onPost.bind(this);
    this.onUserContent = this.onUserContent.bind(this);
    this.onUserPost = this.onUserPost.bind(this);
  }
  handleColorChange(event){
    this.setState({
      color: event.target.value
    }, () => {
      this.props.onNewPost('usernameTextColor', this.state.user,'',this.state.color);
    });
  }
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }
  onPost(keyPressed) {
    const enterPressed = keyPressed.key;
    if (enterPressed === 'Enter') {
      this.props.onNewPost('postMessage',this.state.user, this.state.content, this.state.color);
      this.setState({
        content:''
      });
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
  onUserContent(event) {
    this.setState({
      user: event.target.value,
    });
  }
  onUserPost(keyPressed) {
    const enterPressed = keyPressed.key;
    if (enterPressed === 'Enter') {
      this.props.onNewPost('postNotification',this.state.user,'',this.state.color);
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
              <select className="chatbar-userColorSelect" onChange={this.handleColorChange}>
              <option defaultValue value="pickAColor">
              Username color</option>
              <option value="Red">Red</option>
              <option value="Purple">Purple</option> 
              <option value="Orange">Orange</option>
              <option value="Lime">Lime</option>
            </select> 
            <input 
              className="chatbar-message" 
              onInput={this.onContent}
              onKeyUp={this.onPost}
              placeholder="Type a message and hit ENTER"
              value={this.state.content}
            />
        </footer>
      </div>
    );
  }
}
export default ChatBar;