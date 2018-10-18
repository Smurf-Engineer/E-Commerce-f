import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '../../config/routes'
import LanguageProvider from '../../screens/LanguageProvider'
// TODO: TEST
// import LogRocket from 'logrocket'
// import config from '../../config'
import { translationMessages } from '../../locale'
import './theme.ant'
import './App.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// LogRocket.init(config.logRocketKey || '')
setTimeout(() => {
  console.log('---------------------------')
  console.log('Hi!!!')
  console.log('---------------------------')
  // tslint:disable-next-line:align
}, 1000)

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
