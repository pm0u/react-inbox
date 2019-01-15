import React, { Component } from 'react'

class App extends Component {

  state = { messages: []}


  async componentDidMount = () => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await responst.json()
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
