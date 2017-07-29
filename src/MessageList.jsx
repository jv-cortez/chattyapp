import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const posts = this.props.posts.map((post, index) => {
            return <Message
                key={index}
                type={post.type}
                username={post.username}
                content={post.content}
                color={post.color}
            />
        });
        return (
            <main className="messages">
                {posts}
            </main>
        );
    }
}
export default MessageList;