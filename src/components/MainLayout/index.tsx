/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Layout from 'antd/lib/layout'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import { Container, Header } from './styledComponents'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  history: any
}

const MainLayout = ({ children, history }: Props) => {
  return (
    <Layout>
      <Header>
        <MenuBar {...{ history }} />
      </Header>
      <Content>{children}</Content>
      <Footer>
        <ContactAndLinks />
        <SocialMedia />
      </Footer>
    </Layout>
  )
}

export default MainLayout
