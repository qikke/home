import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './homePage'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      [<Route path="/" component={Home} exact key="home" />]
    )
  }
}
