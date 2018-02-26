/**
 * MainLayout Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { InjectedIntl } from 'react-intl'
import Layout from 'antd/lib/layout'
import * as LayoutActions from './actions'
import * as LocaleActions from '../../screens/LanguageProvider/actions'
import { ReducersObject } from '../../store/rootReducer'
import { RegionConfig } from '../../types/common'
import MenuBar from '../../components/MenuBar'
import ContactAndLinks from '../../components/ContactAndLinks'
import SocialMedia from '../../components/SocialMedia'
import QuickView from '../../components/QuickView'
import { Container, Header } from './styledComponents'
import SearchResults from '../SearchResults'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  intl: InjectedIntl
  history: any
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  setRegionAction: (payload: RegionConfig) => void
  openQuickViewAction: (open: number | null) => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
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
      setRegionAction,
      currentRegion,
      currentLanguage,
      currentCurrency,
      intl
    } = this.props
    const { location: { pathname } } = history
    const hideBottom = pathname === '/design-center'
    return (
      <Layout>
        <Header {...{ hideBottom }}>
          <MenuBar
            searchFunc={this.onSearch}
            onChangeLocation={setRegionAction}
            {...{
              history,
              intl,
              showSearchResults,
              searchParam,
              currentRegion,
              currentLanguage,
              currentCurrency,
              hideBottom
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
        {!hideBottom && (
          <Footer>
            <ContactAndLinks />
            <SocialMedia />
          </Footer>
        )}
        <QuickView
          open={!!productId}
          handleClose={this.onCloseModal}
          {...{ productId, history }}
        />
      </Layout>
    )
  }
  closeResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(false)
  }
  openResults = () => {
    const { showSearchResultsAction } = this.props
    showSearchResultsAction(true)
  }
  // TODO AddQuickView Action
  openQuickView = (id: number) => {
    const { openQuickViewAction, productId } = this.props
    openQuickViewAction(id)
  }
  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(0)
  }
}

const mapStateToProps = ({ layout, languageProvider }: ReducersObject) => {
  return { ...layout.toJS(), ...languageProvider.toJS() }
}

const LayoutEnhance = compose(
  connect(mapStateToProps, { ...LayoutActions, ...LocaleActions })
)(MainLayout)
export default LayoutEnhance
