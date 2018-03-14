import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { fromJS } from 'immutable'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

const composeStore: any =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const configureStore = (preloadStore = {}) => {
  const store = createStore(
    rootReducer,
    fromJS(preloadStore),
    composeStore(applyMiddleware(loggerMiddleware))
  )

  return store
}

export default configureStore
