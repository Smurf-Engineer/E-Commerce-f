/**
 * Home - Created by david on 08/10/17.
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import get from 'lodash/get'
import * as thunkActions from './thunkActions'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
import * as homeActions from './actions'
import Layout from '../../components/MainLayout'
import Carousel from 'react-slick'
import {
  Container,
  // TODO: Comented code to hide everything related with fitting widget, it'll be implemented in phase 2 of Jakroo
  //  HelpContainer,
  //  NeedHelp,
  //  GetStartedButton,
  SearchContainer,
  SearchBarContent,
  // PropositionTilesContainer,
  // PropositionTile,
  // SubText,
  LoadingContainer,
  ImageSkeleton,
  Spinner,
  ImageRow,
  SkeletonDiv,
  layoutStyle,
  CarouselContainer,
  Arrow,
  SlideImageContainer,
  SlideVideo,
  ImageContainer,
  SlideImage,
  SlideImageMobile
} from './styledComponents'
import SearchResults from '../../components/SearchResults'
import leftArrow from '../../assets/leftarrowwhite.svg'
import rightArrow from '../../assets/rightarrowwhite.svg'
import { MAIN_TITLE, MP4_EXTENSION } from '../../constants'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'
import YotpoHome from '../../components/YotpoHome'
import FeaturedProducts from '../../components/FeaturedProducts'
// import messages from './messages'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import config from '../../config/index'
import {
  QueryProps,
  ProductTiles,
  Product,
  HomepageImagesType,
  HeaderImagePlaceHolder,
  HomepageCarousel,
  ProductFile
} from '../../types/common'
import { Helmet } from 'react-helmet'
import CarouselItem from '../../components/CarouselItem'
import { getFileExtension } from '../../utils/utilsFiles'

interface Data extends QueryProps {
  files: any
}

const arrowLeft = <Arrow src={leftArrow} />
const arrowRight = <Arrow src={rightArrow} />

interface Props extends RouteComponentProps<any> {
  data: Data
  someKey?: string
  client: any
  productId: number
  loading: boolean
  openQuickViewAction: (id: number | null) => void
  defaultAction: (someKey: string) => void
  setSearchParam: (param: string) => void
  showSearchResultsHome: (show: boolean) => void
  showSearchResults: boolean
  searchString: string
  dispatch: any
  intl: InjectedIntl
  fakeWidth: number
  currentCurrency: string
  clientInfo: any
  headerImageMobile: string
  headerImage: string
  headerImageLink: string
  featuredBanners: ProductFile[]
  productTiles: ProductTiles[]
  featuredProducts: Product[]
  homepageImages: HomepageImagesType[]
  mainHeaderImages: HomepageImagesType[]
  title: string
  carouselSettings: HomepageCarousel
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true
  }
  private stepInput: any

  async componentDidMount() {
    const {
      dispatch,
      match: { params },
      client: { query }
    } = this.props
    const { getHomepage } = thunkActions
    dispatch(getHomepage(query, params.sportRoute))
  }

  handleOnQuickView = (id: number, yotpoId: string, gender: number) => {
    const { dispatch } = this.props
    dispatch(openQuickViewAction(id, yotpoId, gender))
  }

  onCloseModal = () => openQuickViewAction(0, '', 0)

  openResults = () => {
    const { dispatch } = this.props
    const { showSearchResultsHome } = homeActions
    dispatch(showSearchResultsHome(true))
  }
  closeResults = () => {
    const { dispatch } = this.props
    const { showSearchResultsHome } = homeActions
    dispatch(showSearchResultsHome(false))
  }
  onSearch = (value: string) => {
    const { dispatch } = this.props
    const { setSearchParam } = homeActions
    zenscroll.to(this.stepInput, 700)
    dispatch(setSearchParam(value))
  }

  handleOnGetStarted = () => {
    const { history } = this.props
    history.push('/fit-widget')
  }

  handleGoTo = () => {
    const { history, headerImageLink } = this.props
    if (headerImageLink) {
      history.push(`/${headerImageLink}`)
    }
  }
  handleGoToUrl = (link?: string) => () => {
    const { history } = this.props
    if (link) {
      history.push(`/${link}`)
    }
  }

  render() {
    const {
      history,
      showSearchResults,
      searchString,
      intl,
      fakeWidth,
      currentCurrency,
      clientInfo,
      mainHeaderImages,
      productTiles,
      featuredBanners,
      featuredProducts,
      loading,
      homepageImages,
      carouselSettings: {
        slideTransition,
        slideDuration,
        secondarySlideTransition,
        secondarySlideDuration
      },
      title = MAIN_TITLE
    } = this.props
    const { formatMessage } = intl
    const browserName = get(clientInfo, 'browser.name', '')

    const searchResults = searchString ? (
      <SearchResults
        searchParam={searchString}
        showResults={showSearchResults}
        closeResults={this.closeResults}
        openResults={this.openResults}
        quickViewAction={this.handleOnQuickView}
        currentCurrency={currentCurrency || config.defaultCurrency}
        {...{ history, SearchResults }}
      />
    ) : null

    const featured = featuredProducts && !!featuredProducts.length && (
      <FeaturedProducts
        formatMessage={intl.formatMessage}
        openQuickView={this.handleOnQuickView}
        currentCurrency={currentCurrency || config.defaultCurrency}
        {...{ history, featuredProducts }}
      />
    )
    const mainHeaderItems = mainHeaderImages.map(
      (item: HeaderImagePlaceHolder, index: number) => (
        <div>
          <CarouselItem
            key={index}
            onClick={this.handleGoToUrl(item.url)}
            {...{ item }}
          />
        </div>
      )
    )
    const secondaryHeaderItems = homepageImages.map(
      (item: HeaderImagePlaceHolder, index: number) => (
        <div>
          <CarouselItem
            key={index}
            onClick={this.handleGoToUrl(item.url)}
            {...{ item }}
          />
        </div>
      )
    )
    return (
      <Layout {...{ history, intl }} style={layoutStyle}>
        <Helmet {...{ title }} />
        <Container {...{ loading }}>
          <SearchContainer>
            {mainHeaderItems.length && (
              <CarouselContainer>
                <Carousel
                  autoplaySpeed={slideDuration}
                  fade={slideTransition === 'fade'}
                  prevArrow={arrowLeft}
                  nextArrow={arrowRight}
                  autoplay={true}
                  pauseOnHover={false}
                >
                  {mainHeaderItems}
                </Carousel>
              </CarouselContainer>
            )}
            <SearchBarContent>
              <SearchBar search={this.onSearch} {...{ formatMessage }} />
              {/* TODO: Commented for phase 1, will be implemented in Jakroo phase 2
              <HelpContainer>
                <NeedHelp>
                  <FormattedMessage {...messages.helpFind} />
                </NeedHelp>
                <GetStartedButton
                  size="large"
                  onClick={this.handleOnGetStarted}
                >
                  <FormattedMessage {...messages.startButton} />
                </GetStartedButton>
              </HelpContainer>*/}
            </SearchBarContent>
          </SearchContainer>
          <div
            ref={(input) => {
              this.stepInput = input
            }}
          >
            {searchResults}
          </div>
          {featured}
          {secondaryHeaderItems.length && (
            <CarouselContainer>
              <Carousel
                autoplaySpeed={secondarySlideDuration}
                fade={secondarySlideTransition === 'fade'}
                prevArrow={arrowLeft}
                nextArrow={arrowRight}
                autoplay={true}
                pauseOnHover={false}
              >
                {secondaryHeaderItems}
              </Carousel>
            </CarouselContainer>
          )}
          {/* <PropositionTilesContainer>
            <PropositionTile>
              <FormattedMessage {...messages.flexibleLabel} />
              <SubText>{formatMessage(messages.collectionOrCustom)}</SubText>
            </PropositionTile>
            <PropositionTile>
              <FormattedMessage {...messages.fastDeliveryLabel} />
              <SubText>{formatMessage(messages.twoWeeksOrLess)}</SubText>
            </PropositionTile>
            <PropositionTile>
              <FormattedMessage {...messages.easyLabel} />
              <SubText>{formatMessage(messages.priceDrop)}</SubText>
            </PropositionTile>
          </PropositionTilesContainer> */}
          {featuredBanners.map(({ url, urlMobile }: ProductFile) => (
            <SlideImageContainer>
              {getFileExtension(url || '') === MP4_EXTENSION ? (
                <SlideVideo controls={true}>
                  <source src={url} type="video/mp4" />
                </SlideVideo>
              ) : (
                <ImageContainer>
                  <SlideImage src={url} />
                  <SlideImageMobile src={urlMobile} />
                </ImageContainer>
              )}
            </SlideImageContainer>
          ))}
          <ImagesGrid {...{ fakeWidth, history, browserName, productTiles }} />
          <YotpoHome />
        </Container>
        <LoadingContainer {...{ loading }}>
          <Spinner size="large" />
          <ImageSkeleton fullSize={true} />
          <SkeletonDiv title={false} />
          <SkeletonDiv />
          <ImageRow>
            <ImageSkeleton />
            <ImageSkeleton />
          </ImageRow>
          <SkeletonDiv title={false} />
        </LoadingContainer>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const home = state.get('home').toJS()
  const responsive = state.get('responsive').toJS()
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()
  return { ...home, ...responsive, ...langProps, ...app }
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const HomeEnhance = compose(
  injectIntl,
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home)

export default HomeEnhance
