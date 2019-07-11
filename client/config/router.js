import React from 'react';
import {Route} from 'react-router-dom';
import {Home} from '../containers/homePage';
import {Notes} from '../containers/notes';
import Sprit from '../containers/sprit';


export default () => [
  <Route path="/" component={Home} exact key="home" />,
  <Route path="/notes" component={Notes} key="notes" />,
  <Route path="/sprit" component={Sprit} key="sprit" />,
  // <Route path="/todos" component={Todos} key="todos" />
]
