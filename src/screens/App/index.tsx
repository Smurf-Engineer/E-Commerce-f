import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../../config/routes'
import LanguageProvider from '../../screens/LanguageProvider'
import LogRocket from 'logrocket'
import { translationMessages } from '../../locale'
import './theme.ant'
import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

LogRocket.init('thy42y/jakroo')

const App = (props: any) => (
  <LanguageProvider messages={translationMessages}>
    <Switch>
      {routes.map(route => (
        <Route key={route.name} {...route} />
      ))}
    </Switch>
  </LanguageProvider>
)

export default App
