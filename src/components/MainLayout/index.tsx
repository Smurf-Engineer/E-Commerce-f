/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import Layout from 'antd/lib/layout'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import { Container, Header } from './styledComponents'
import SearchResults from '../SearchResults'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  history: any
}

class MainLayout extends React.Component<Props, {}> {
  state = {
    openResults: true
  }
  render() {
    const { children, history } = this.props
    return (
      <Layout>
        <Header>
          <MenuBar {...{ history }} />
        </Header>
        <SearchResults
          showResults={this.state.openResults}
          searchParam={'asd'}
          closeResults={this.closeResults}
          {...{ history }}
        />
        <Content>{children}</Content>
        <Footer>
          <ContactAndLinks />
          <SocialMedia />
        </Footer>
      </Layout>
    )
  }
  closeResults = () => {
    const { openResults } = this.state
    this.setState({ openResults: !openResults })
  }
}

export default MainLayout
