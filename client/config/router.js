import React from 'react';
import {Route} from 'react-router-dom';
// import asycnComponent from '../components/AsyncComponent';
import {Home} from '../containers/homePage';
const AysncSprit = React.lazy(() => import('../containers/sprit'));
const AysncNotes = React.lazy(() => import('../containers/notes'));

export default () => [
  <Route path="/" component={Home} exact key="home" />,
  <Route path="/notes" component={AysncNotes} key="notes" />,
  <Route path="/sprit" component={AysncSprit} key="sprit" />,
  // <Route path="/todos" component={Todos} key="todos" />
]
