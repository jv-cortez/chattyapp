import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();
    this.state = {
      content:''
    }
    this.onContent = this.onContent.bind(this)
    this.onPost = this.onPost.bind(this)
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    })
  }

  onPost(keyPressed) {
    const enterPressed = keyPressed.key
    console.log("oP", enterPressed);
    if (enterPressed === 'Enter') {
      this.props.onNewPost(this.props.userName, this.state.content);
    }
  }

  render() {
    return (
       <div>  
        <footer className="chatbar">
            <input
              className="chatbar-username"
              placeholder={this.props.userName}
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