import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asycnComponent from '../components/AsyncComponent';
import Home from '../containers/homePage';
const AysncSprit = asycnComponent(() => import('../containers/sprit'));
const AysncNotes = asycnComponent(() => import('../containers/notes'));
const AysncUpload = asycnComponent(() => import('../containers/upload'));
const AysncBlog = asycnComponent(() => import('../containers/blog'));
const AysncNewBlog = asycnComponent(() => import('../containers/newBlog'));

export default () => (
  <Switch>
    <Route path="/" component={Home} exact key="home" />,
    <Route path="/blog" component={AysncBlog} exact key="blog" />,
    <Route path="/new" component={AysncNewBlog} exact key="new" />,
    <Route path="/edit" component={AysncNewBlog} exact key="edit" />,
    <Route path="/notes" component={AysncNotes} key="notes" />,
    <Route path="/sprit" component={AysncSprit} key="sprit" />,
    <Route path="/upload" component={AysncUpload} key="upload" />
  </Switch>
)
