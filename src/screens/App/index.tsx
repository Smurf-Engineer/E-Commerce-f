import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../../config/routes'
import { Header } from './styledComponents'
import './theme.ant'
import './App.css'

const App = (props: any) => (
  <Switch>{routes.map(route => <Route key={route.name} {...route} />)}</Switch>
)

export default App
