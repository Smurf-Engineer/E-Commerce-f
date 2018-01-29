import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home/'
import Designer from './containers/Designer'
import './App.css'

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/designer" component={Designer} />
  </Switch>
)

export default App
