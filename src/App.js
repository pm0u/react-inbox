import React, { Component } from 'react'
import Toolbar from './Toolbar'
import Inbox from './Inbox'

class App extends Component {

  state = { messages: []}


  componentDidMount = async () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    this.setState(prevState => {
      return { messages }
    })
  }


  render() {
    return (
      <main>
        <div className='container'>
        <Toolbar />
        <Inbox />
        </div>
      </main>
    )
  }
}

export default App
