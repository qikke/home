import history from '@/utils/history';
import '@c/globalcss/index.scss';
import Header from '@c/header';
import SwitchAnimate from '@c/switch';
import React from 'react';
import {Router} from 'react-router-dom';
import Routes from '../config/router';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isRouter:false
    }
  }
  componentDidMount(){
    // var loading = document.getElementById("pageloading")
    // document.body.removeChild(loading)
    // loading = null
  }
  isRoute(){
    this.setState({
        isRouter:true
    })
  }
  clearAnimate(n){
    this.setState({
        isRouter:n
    })   
  }
  render () {
    return (
      <Router history={history}>
        <div className="main">
          <Header history={history} isRoute={this.isRoute.bind(this)} />
          <Routes key="router" />
          {this.state.isRouter?<SwitchAnimate type = 'leave' callback={this.clearAnimate.bind(this)}/>:''}
        </div>
      </Router>
    )
  }
}
