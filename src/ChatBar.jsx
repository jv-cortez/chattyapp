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
  //function to handle user's chosen username text color
  handleColorChange(event){
    this.setState({
      color: event.target.value
    }, () => {
      this.props.onNewPost('usernameTextColor', this.state.user,'',this.state.color);
    });
  }
  //function to handle input from chat message or content
  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }
  //user,content, and color choice are sent to client-side App.jsx file when enter is pressed 
  onPost(keyPressed) {
    const enterPressed = keyPressed.key;
    if (enterPressed === 'Enter') {
      this.props.onNewPost('postMessage',this.state.user, this.state.content, this.state.color);
      this.setState({
        content:''
      });
      //when a message is sent and is already at the bottom of the window, this code will scroll the window down automatically 
      window.scrollTo(0,document.body.scrollHeight);
    }
  }
  //sets inputted username to state
  onUserContent(event) {
    this.setState({
      user: event.target.value
    });
  }
  //sends username text and color to client-side App.jsx when enter is pressed
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