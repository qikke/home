import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

const modulesFiles = require.context('./redux', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const reducer = combineReducers(modules)

const { composeWithDevTools } = require('redux-devtools-extension')


const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = composeWithDevTools(
  applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);