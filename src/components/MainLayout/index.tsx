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
import { Header } from './styledComponents'
import SearchResults from '../SearchResults'

const { Content, Footer } = Layout

interface Props {
  children: React.ReactChild
  intl: InjectedIntl
  history: any
  setSearchParam: (param: string) => void
  showSearchResultsAction: (show: boolean) => void
  setRegionAction: (payload: RegionConfig) => void
  openQuickViewAction: (open: number, yotpoId: string | null) => void
  openLoginAction: (open: boolean) => void
  saveUserToLocal: (user: object) => void
  logoutAction: () => void
  showSearchResults: boolean
  searchParam: string
  productId: boolean
  openLogin: boolean
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
  yotpoId: string
  hideBottomHeader: boolean
  hideFooter: boolean
}

class MainLayout extends React.Component<Props, {}> {
  static defaultProps = {
    hideBottomHeader: false,
    hideFooter: false
  }

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
      yotpoId,
      openLogin,
      openLoginAction,
      setRegionAction,
      currentRegion,
      currentLanguage,
      currentCurrency,
      intl,
      logoutAction,
      saveUserToLocal,
      hideBottomHeader,
      hideFooter
    } = this.props
    return (
      <Layout>
        <Header {...{ hideBottomHeader }}>
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
              openLogin,
              openLoginAction,
              logoutAction,
              saveUserToLocal
            }}
            hideBottom={hideBottomHeader}
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
        {!hideFooter && (
          <Footer>
            <ContactAndLinks formatMessage={intl.formatMessage} />
            <SocialMedia />
          </Footer>
        )}
        <QuickView
          open={!!productId}
          handleClose={this.onCloseModal}
          {...{ productId, history, yotpoId }}
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

  openQuickView = (id: number, yotpoId: string) => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(id, yotpoId)
  }
  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(0, '')
  }
}

const mapStateToProps = ({ layout, languageProvider }: ReducersObject) => {
  return { ...layout.toJS(), ...languageProvider.toJS() }
}

const LayoutEnhance = compose(
  connect(mapStateToProps, { ...LayoutActions, ...LocaleActions })
)(MainLayout)
export default LayoutEnhance
