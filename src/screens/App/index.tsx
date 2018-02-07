import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home'
import Designer from '../Designer'
import routes from '../../config/routes'
import './theme.ant'
import './App.css'

const App = () => (
  <Switch>{routes.map(route => <Route key={route.name} {...route} />)}</Switch>
)

export default App
