import React from 'react'
import Routes from '../config/router'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Routes key="router" />
    )
  }
}
