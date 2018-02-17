/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import Layout from 'antd/lib/layout'
import * as LayoutActions from './actions'
import { ReducersObject } from '../../store/rootReducer'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import { Container, Header } from './styledComponents'
import SearchResults from '../SearchResults'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  history: any
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  showSearchResults: boolean
  searchParam: string
}

class MainLayout extends React.Component<Props, {}> {
  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    console.log(this.props)
    setSearchParam(value)
  }

  render() {
    const { children, history, showSearchResults, searchParam } = this.props
    return (
      <Layout>
        <Header>
          <MenuBar
            searchFunc={this.onSearch}
            {...{ history, showSearchResults, searchParam }}
          />
        </Header>
        <SearchResults
          showResults={showSearchResults}
          searchParam={searchParam}
          closeResults={this.closeResults}
          openResults={this.openResults}
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
    const { showSearchResults, showSearchResultsAction } = this.props
    showSearchResultsAction(false)
  }
  openResults = () => {
    const { showSearchResults, showSearchResultsAction } = this.props
    showSearchResultsAction(true)
  }
}

const mapStateToProps = ({ layout }: ReducersObject) => layout.toJS()

const LayoutEnhance = compose(connect(mapStateToProps, { ...LayoutActions }))(
  MainLayout
)
export default LayoutEnhance
