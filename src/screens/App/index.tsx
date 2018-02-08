import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from 'antd/lib/layout'
import MenuBar from '../../components/MenuBar'
import Home from '../Home'
import Designer from '../Designer'
import routes from '../../config/routes'
import { Header } from './styledComponents'
import './theme.ant'
import './App.css'

const { Content, Footer } = Layout

const App = () => (
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
      <div>FOOTER</div>
    </Footer>
  </Layout>
)

export default App
