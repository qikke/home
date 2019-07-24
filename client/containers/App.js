import history from '@/utils/history';
import '@c/globalcss/index.scss';
import Header from '@c/header';
import React from 'react';
import Routes from '../config/router';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="main">
        <Header history={history} />
        <Routes key="router" history={history} />
      </div>
    )
  }
}
