import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../containers/homePage'
import { Notes } from '../containers/notes'

export default () => [
  <Route path="/" component={Home} exact key="home" />,
  <Route path="/notes" component={Notes} key="notes" />
]
