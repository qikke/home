import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      a: 0
    }
    this.xx = this.xx.bind(this)
  }

  xx () {
    this.setState({ a: 2 })
  }

  render () {
    return (
      <h1 onClick={this.xx}>HEELO,2</h1>
    )
  }
}
