import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
    render() {
        const posts = this.props.posts.map((post, index) => {
            return <Message
                key={index}
                username={post.username}
                content={post.content} />
        });
        return (
            <main className="messages">
                {posts}
            </main>

        )
    }
}

export default MessageList;