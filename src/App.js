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

  updateMessages = async (messageIds, command, param, value) => {
    // messageIds = [1,2,3] || 1
    // command = ( star     || delete    || read       || addLabel    || removeLabel  )
    // param = (   NA       || id        || read       || label       || label        )
    // value = (   NA       || messageId || true/false || 'labelText' || 'labelText'  )
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
    const json = await response.json()
    console.log(json)
  }

  changeProp = (e) => {
    e.persist()
    const msgIndex = e.target.id - 1
    const type = e.target.dataset.fieldtype
    this.setState(prevState => {
      return { messages: [...prevState.messages.slice(0, msgIndex),
                        { ...prevState.messages[msgIndex], [type]: !prevState.messages[msgIndex][type] },
                        ...prevState.messages.slice(msgIndex + 1)] }
    }, (type === 'starred')? () => this.updateMessages([msgIndex+1], 'star') : null )
  }

  render() {
    return (
      <main>
      <div className='container'>
          <Toolbar messages={this.state.messages}/>
          <Inbox changeProp={this.changeProp} messages={this.state.messages}/>
        </div>
      </main>
    )
  }
}

export default App
