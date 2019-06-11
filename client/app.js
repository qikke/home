import React from 'react'
import ReactDom from 'react-dom'
import App from './containers/App'
import { AppContainer } from 'react-hot-loader'

const root = document.getElementById('root')

ReactDom.render(
  <AppContainer>
    <App />
  </AppContainer>,
  root
)

if (module.hot) {
  module.hot.accept('./containers/App.js', () => {
    const NextApp = require('./containers/App.js').default
    ReactDom.render(<NextApp />, root)
  })
}
