import React from 'react'

import './home.less'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.imgRefs = React.createRef()
  }

  componentDidMount () {}

  render () {
    return (
      <div className="xx" ref={this.imgRefs}>
        <h1>H,</h1>
        <img src={require('../../assets/img/logo.png')} width="50" height="50"></img>
      </div>
    )
  }
}

export default Home
