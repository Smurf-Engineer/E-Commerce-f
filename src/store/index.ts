import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

declare global {
  interface Window {
    __DEV___: any
  }
}

const loggerMiddleware = createLogger({
  predicate: () => window.__DEV___
})

const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(loggerMiddleware))
  )

  return store
}

export default configureStore
