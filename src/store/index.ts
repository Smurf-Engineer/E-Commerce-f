import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

export interface Process {
  browser: boolean
}

const composeStore: any =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const loggerMiddleware = createLogger({
  predicate: () =>
    process.env.NODE_ENV === 'development' && typeof window === 'object'
})

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    fromJS(preloadedState),
    composeStore(applyMiddleware(thunk, loggerMiddleware))
  )

  return store
}

export default configureStore
