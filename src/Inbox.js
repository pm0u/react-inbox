import React, { Component } from 'react'

class Inbox extends Component {

  renderLabels = (message) => {
    if (message.labels.length > 0) {
      return message.labels.map((label,i) => {
        return (<span key={i} className="label label-warning">{label}</span>)
      })
    }
  }

  renderMessages = () => {
    return this.props.messages.map((message,i) => {
      return (
        <div key={i} className={`row message ${message.read? 'read' : 'unread'}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" />
              </div>
              <div className="col-xs-2">
                <i className="star fa fa-star-o"></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            {this.renderLabels(message)}
            <a href="#">
            {message.subject}
            </a>
          </div>
        </div>
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
