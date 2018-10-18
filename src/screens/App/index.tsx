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

let testVar
// LogRocket.init(config.logRocketKey || '')
for (let index = 0; index < Number.MAX_SAFE_INTEGER; index++) {
  // TODO: TEST
  testVar = index * 2
}

console.log(testVar)

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
