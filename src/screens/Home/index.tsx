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
  defaultAction: (someKey: string) => void
  setSearchParam: (param: string) => void
  showSearchResultsHome: (show: boolean) => void
  showSearchResults: boolean
  searchParam: string
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true
  }
  private stepInput: any

  onClickButton = () => {
    const { openQuickView } = this.state
    this.setState({ openQuickView: !openQuickView })
  }

  onCloseModal = () => {
    this.setState({ openQuickView: false })
  }

  closeResults = () => {
    const { showSearchResults, showSearchResultsHome } = this.props
    showSearchResultsHome(!showSearchResults)
  }

  onSearch = (value: string) => {
    const { setSearchParam } = this.props
    console.log(this.stepInput)
    zenscroll.to(this.stepInput, 700)
    setSearchParam(value)
  }

  render() {
    const { openQuickView, openResults } = this.state
    const {
      history,
      showSearchResults,
      setSearchParam,
      searchParam
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
              searchParam={searchParam}
              showResults={showSearchResults}
              closeResults={this.closeResults}
              {...{ history }}
            />
          </div>
          <Button onClick={this.onClickButton} label="Info Message" />
          <QuickView
            open={openQuickView}
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
