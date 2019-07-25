// import history from '@/utils/history';
import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
// import {BrowserRouter} from 'react-router-dom';
import './components/globalcss/init.scss';
import App from './containers/App';
import store from './Store.js';

const root = document.getElementById('root')

window.onerror = (...arg) => {
  console.log(arg[4].stack)
  return true
}

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      {/* <BrowserRouter history={history}> */}
        <Provider store={store}>
          <Component />
        </Provider>
      {/* </BrowserRouter> */}
    </AppContainer>,
    root
  )
}

const createApp = (App) => {
  class Main extends React.Component {
    render () {
      return <App />
    }
  }
  return Main
}

render(createApp(App))

if (module.hot) {
  module.hot.accept('./containers/App.js', () => {
    const NextApp = require('./containers/App.js').default
    render(createApp(NextApp))
  })
}
