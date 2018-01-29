import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home/'
import Designer from './containers/Designer'
import routes from './routes'
import './App.css'

const App = () => (
  <Switch>{routes.map(route => <Route key={route.name} {...route} />)}</Switch>
)

export default App
