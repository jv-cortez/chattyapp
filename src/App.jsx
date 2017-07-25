import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  render() {
    return (
      <div>
          <body>
            <MessageList />
            <ChatBar />
          </body>
      </div>
    );
  }
}
export default App;
