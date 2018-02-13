import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from 'antd/lib/layout'
import MenuBar from '../../components/MenuBar'
import Home from '../Home'
import Designer from '../Designer'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import routes from '../../config/routes'
import { Header } from './styledComponents'
import './theme.ant'
import './App.css'

const { Content, Footer } = Layout

const App = (props: any) => {
  return (
    <Layout>
      <Header>
        <MenuBar />
      </Header>
      <Content>
        <Switch>
          {routes.map(route => <Route key={route.name} {...route} />)}
        </Switch>
      </Content>
      <Footer>
        <ContactAndLinks />
        <SocialMedia />
      </Footer>
    </Layout>
  )
}

export default App
