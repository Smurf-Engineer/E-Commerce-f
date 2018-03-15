import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../../config/routes'
import LanguageProvider from '../../screens/LanguageProvider'
import { translationMessages } from '../../locale'
import './theme.ant'
import './App.css'

const App = (props: any) => (
  <LanguageProvider messages={translationMessages}>
    <Switch>
      {routes.map(route => <Route key={route.name} {...route} />)}
    </Switch>
  </LanguageProvider>
)

export default App
