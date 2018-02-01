import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const configureStore = () => {
  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(loggerMiddleware))
  )

  return store
}

export default configureStore
