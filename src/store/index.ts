import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

const composeStore: any =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    fromJS(preloadedState),
    composeStore(applyMiddleware(loggerMiddleware))
  )

  return store
}

export default configureStore
