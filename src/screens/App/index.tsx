import * as React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import routes from '../../config/routes'
import LanguageProvider from '../../screens/LanguageProvider'
import LogRocket from 'logrocket'
import { translationMessages } from '../../locale'
import './theme.ant'
import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import config from '../../config'

LogRocket.init(config.logrocketId || '')

const App = (props: any) => (
  <LanguageProvider messages={translationMessages}>
    <Switch>
      {routes.map(({ name, path, component }) => (
        <Route key={name} component={withRouter(component)} {...{ path }} />
      ))}
    </Switch>
  </LanguageProvider>
)

export default App
