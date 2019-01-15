import React, { Component } from 'react'
import Message from './Message'

class Inbox extends Component {

  renderMessages = () => {
    return this.props.messages.map((message,i) => {
      return (
        <Message {...message} />
      )
    })
  }

  render() {
    return (
      <>
      {this.renderMessages()}
      </>
    );
  }

}

export default Inbox
