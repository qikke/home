import React from 'react'
import { Route } from 'react-router-dom'

import { Home } from '../containers/homePage'
import { Notes } from '../containers/notes'
import Todos from '../containers/todos'

export default () => [
  <Route path="/" component={Home} exact key="home" />,
  <Route path="/notes" component={Notes} key="notes" />,
  <Route path="/todos" component={Todos} key="todos" />
]
