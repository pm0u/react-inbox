import React, { Component } from 'react'
import Toolbar from './Toolbar'
import Inbox from './Inbox'

class App extends Component {

  state = { messages: [] }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    this.setState(prevState => {
      return { messages }
    })
  }

  countUnread = () => {
    return this.state.messages.reduce((accum, curr) => {
      if (curr.read === false) accum++
      return accum
    }, 0)
  }

  updateMessages = (messageIds, command, param, value) => {
    // messageIds = [1,2,3] || 1
    // command = ( star     || delete    || read       || addLabel    || removeLabel  )
    // param = (   NA       || NA        || read       || label       || label        )
    // value = (   NA       || NA        || true/false || 'labelText' || 'labelText'  )
    return async () => {
      const response = await fetch('http://localhost:8082/api/messages', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
        },
        body: JSON.stringify({
          command,
          [param]: value,
          'messageIds': messageIds
        })
      })
      //const json = await response.json()
      //console.log(json)
    }
  }

  delMsg = () => {
    const msgIds = this.state.messages.filter(message => message.selected).map(message=> message.id)

    this.setState(prevState => {
      const newMsgs = prevState.messages.filter(message => !msgIds.includes(message.id))
      return {messages: newMsgs}
    }, this.updateMessages(msgIds,'delete'))


  }

  addLabel = (e) => {
    const label = e.target.value
    const msgIds = []
    e.target.selectedIndex=0

    this.setState(prevState => {
      return {
        messages: prevState.messages.map(message => {
          if (message.selected) {
            message.labels.push(label)
            msgIds.push(message.id)
          }
          return message
        })
      }
    }, this.updateMessages(msgIds, 'addLabel', 'label', label))
  }

  removeLabel = (e) => {
    const label = e.target.value
    const msgIds = []
    e.target.selectedIndex=0

    this.setState(prevState => {
      const newMessages = prevState.messages.map(message => {
        if (message.selected) {
          message.labels = message.labels.filter(msgLabel => msgLabel !== label)
          msgIds.push(message.id)
        }
        return message
      })
      return { messages: newMessages }
    }, this.updateMessages(msgIds,'removeLabel', 'label', label))

  }

  changeReadState = (e) => {
    const newReadState = e.target.id === 'read' ? true : false
    const messageIds = this.state.messages.filter(message => message.selected).map(message => message.id)
    this.setState(prevState => {
      const newMessages = prevState.messages.map(message => {
        if (message.selected) {
          message.read = newReadState
        }
        return message
      })
      return { messages: newMessages }
    }, this.updateMessages(messageIds, 'read', 'read', newReadState))
  }

  toggleAllSelect = () => {
    if (this.state.messages.some(message => message.selected)) {
      this.setState(prevState => {
        return { messages: prevState.messages.map(message => ({ ...message, selected: false })) }
      })
    } else {
      this.setState(prevState => {
        return { messages: prevState.messages.map(message => ({ ...message, selected: true })) }
      })
    }
  }

  changeProp = (e) => {
    e.persist()
    const msgIndex = e.target.id - 1
    const type = e.target.dataset.fieldtype
    this.setState(prevState => {
      return {
        messages: [...prevState.messages.slice(0, msgIndex),
          { ...prevState.messages[msgIndex],
            [type]: !prevState.messages[msgIndex][type]
          },
          ...prevState.messages.slice(msgIndex + 1)
        ]
      }
    }, (type === 'starred') ? this.updateMessages([msgIndex + 1], 'star') : null)
  }

  render() {
    return (
      <main>
      <div className='container'>
          <Toolbar delMsg={this.delMsg} changeReadState={this.changeReadState} toggleAllSelect={this.toggleAllSelect} countUnread={this.countUnread} messages={this.state.messages} addLabel={this.addLabel} removeLabel={this.removeLabel}/>
          <Inbox changeProp={this.changeProp} messages={this.state.messages}/>
        </div>
      </main>
    )
  }
}

export default App
