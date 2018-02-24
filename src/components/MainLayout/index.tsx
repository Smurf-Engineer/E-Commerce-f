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
import QuickView from '../../components/QuickView'
import { Container, Header } from './styledComponents'
import SearchResults from '../SearchResults'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  history: any
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  openQuickViewAction: (open: number | null) => void
  openLoginAction: (open: boolean) => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  openLogin: boolean
}

class MainLayout extends React.Component<Props, {}> {
  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    setSearchParam(value)
  }

  render() {
    const {
      children,
      history,
      showSearchResults,
      searchParam,
      productId,
      openLogin,
      openLoginAction
    } = this.props

    return (
      <Layout>
        <Header>
          <MenuBar
            searchFunc={this.onSearch}
            {...{
              history,
              showSearchResults,
              searchParam,
              openLogin,
              openLoginAction
            }}
          />
        </Header>
        <SearchResults
          showResults={showSearchResults}
          searchParam={searchParam}
          closeResults={this.closeResults}
          openResults={this.openResults}
          quickViewAction={this.openQuickView}
          {...{ history }}
        />
        <Content>{children}</Content>
        <Footer>
          <ContactAndLinks />
          <SocialMedia />
        </Footer>
        <QuickView
          open={!!productId}
          handleClose={this.onCloseModal}
          {...{ productId, history }}
        />
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

  openQuickView = (id: number) => {
    const { openQuickViewAction, productId } = this.props
    openQuickViewAction(id)
  }
  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(0)
  }
}

const mapStateToProps = ({ layout }: ReducersObject) => layout.toJS()

const LayoutEnhance = compose(connect(mapStateToProps, { ...LayoutActions }))(
  MainLayout
)
export default LayoutEnhance
