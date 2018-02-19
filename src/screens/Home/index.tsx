/**
 * Home Actions - Created by david on 08/10/17.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import zenscroll from 'zenscroll'
import { compose, graphql } from 'react-apollo'
import { QueryProps } from '../../types/common'
import { RouteComponentProps } from 'react-router-dom'
import { ReducersObject } from '../../store/rootReducer'
import * as homeActions from './actions'
import Button from '../../components/Button'
import QuickView from '../../components/QuickView'
import Layout from '../../components/MainLayout'
import {
  Container,
  HomeHeader,
  SearchBackground,
  HelpContainer,
  NeedHelp,
  GetStartedButton,
  SearchContainer,
  SearchBarContent
} from './styledComponents'
import { Prices } from '../../types/common'
import { ProductData } from '../../components/QuickView/mocks'
import SearchResults from '../../components/SearchResults'
import SearchBar from '../../components/SearchBar'
import { AnyAction } from '../../types/common'
import BackgroundImg from '../../assets/FE1I5781.jpg'

type User = {
  id: string
  email: string
}

interface Props extends RouteComponentProps<any> {
  someKey?: string
  productId: number
  openQuickViewAction: (id: number | null) => void
  defaultAction: (someKey: string) => void
  setSearchParam: (param: string) => void
  showSearchResultsHome: (show: boolean) => void
  showSearchResults: boolean
  searchString: string
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true
  }
  private stepInput: any

  handleOnQuickView = (id: number) => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(id)
  }

  onCloseModal = () => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(null)
  }

  openResults = () => {
    const { showSearchResults, showSearchResultsHome } = this.props
    showSearchResultsHome(true)
  }
  closeResults = () => {
    const { showSearchResults, showSearchResultsHome } = this.props
    showSearchResultsHome(false)
  }
  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    zenscroll.to(this.stepInput, 700)
    setSearchParam(value)
  }

  render() {
    const { openQuickView } = this.state
    const {
      history,
      showSearchResults,
      setSearchParam,
      searchString,
      productId
    } = this.props

    return (
      <Layout {...{ history }}>
        <Container>
          <SearchContainer>
            <SearchBackground src={BackgroundImg} />
            <SearchBarContent>
              <SearchBar search={this.onSearch} />
              <HelpContainer>
                <NeedHelp>Not sure? We'll help you find out.</NeedHelp>
                <GetStartedButton size="large">GET STARTED</GetStartedButton>
              </HelpContainer>
            </SearchBarContent>
          </SearchContainer>
          <div
            ref={input => {
              this.stepInput = input
            }}
          >
            <SearchResults
              searchParam={searchString}
              showResults={showSearchResults}
              closeResults={this.closeResults}
              openResults={this.openResults}
              quickViewAction={this.handleOnQuickView}
              {...{ history }}
            />
          </div>
          <QuickView
            open={!!productId}
            title={'THE TOUR BIKE JERSEY'}
            data={ProductData}
            handleClose={this.onCloseModal}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ home }: ReducersObject) => home.toJS()

const HomeEnhance = compose(connect(mapStateToProps, { ...homeActions }))(Home)

export default HomeEnhance
