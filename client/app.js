import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App'
import { AppContainer } from 'react-hot-loader'

const root = document.getElementById('root')

const render = (Component) => {
  ReactDom.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
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
