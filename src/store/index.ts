import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

// declare global {
//   interface Window {
//     devToolsExtension: any
//     __REDUX_DEVTOOLS_EXTENSION__: any
//   }
// }

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

// const loadDevTools = () =>
//   process.env.NODE_ENV === 'development' && window.devToolsExtension
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//     : (f: any) => f

const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(loggerMiddleware))
  )

  return store
}

export default configureStore
