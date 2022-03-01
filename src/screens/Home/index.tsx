/**
 * Home - Created by david on 08/10/17.
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
import get from 'lodash/get'
import moment from 'moment'
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
  SlideImageMobile,
  DeliveryInfo,
  Calendar,
  Month,
  Day,
  OrderInfo,
  HeaderInfo,
  NumberOfDays,
  OrderingInfo,
  DeliveryContainer,
  HeaderInfoTitle,
  RedirectDiv,
  JakrooLogo,
  LabelRedirect,
} from './styledComponents'
import {
  getDesignLabInfo,
  getFeaturedImages,
  getFeaturedProducts,
  getMainHeaderImages,
  getShortenURLQuery,
  profileSettingsQuery,
} from './data'
import SearchResults from '../../components/SearchResults'
import leftArrow from '../../assets/leftarrowwhite.svg'
import rightArrow from '../../assets/rightarrowwhite.svg'
import jakrooLogoWhite from '../../assets/jakroo_logo.svg'
import { MAIN_TITLE, MP4_EXTENSION } from '../../constants'
import SearchBar from '../../components/SearchBar'
import ImagesGrid from '../../components/ImagesGrid'
import YotpoHome from '../../components/YotpoHome'
import FeaturedProducts from '../../components/FeaturedProducts'
import messages from './messages'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import config from '../../config/index'
import {
  QueryProps,
  ProductTiles,
  Product,
  HomepageImagesType,
  HeaderImagePlaceHolder,
  HomepageCarousel,
  ProductFile,
  DeliveryDays,
  IProfileSettings,
  User,
  ShortenedURL,
} from '../../types/common'
import { Helmet } from 'react-helmet'
import CarouselItem from '../../components/CarouselItem'
import { getFileExtension } from '../../utils/utilsFiles'
import Spin from 'antd/lib/spin'

interface Data extends QueryProps {
  files: any
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface ShortenData extends QueryProps {
  shortenURL: ShortenedURL
}

export interface DesignLab extends QueryProps {
  designInfo?: DeliveryDays
}

const arrowLeft = <Arrow src={leftArrow} />
const arrowRight = <Arrow src={rightArrow} />

interface Props extends RouteComponentProps<any> {
  data: Data
  someKey?: string
  client: any
  productId: number
  loading: boolean
  profileData: ProfileData
  user: User
  shortenURLData: ShortenData
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
  featuredProductsData: Product[]
  homepageImages: HomepageImagesType[]
  mainHeaderData: HomepageImagesType[]
  featuredImagesData: HomepageImagesType[]
  secondaryFeaturedImages: HomepageImagesType[]
  title: string
  carouselSettings: HomepageCarousel
  dataDesignLabInfo: DesignLab
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false,
    openResults: true,
  }
  private stepInput: any

  async componentDidMount() {
    const {
      dispatch,
      match: { params },
      client: { query },
    } = this.props
    const { getHomepage } = thunkActions
    dispatch(getHomepage(query, params.sportRoute))
  }

  componentDidUpdate() {
    const { shortenURLData } = this.props
    const url = get(shortenURLData, 'shortenURL.url', '')
    if (!!url && !!url.trim()) {
      window.location.replace(url)
    }
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

  getMetaData = (sportRoute: string) => {
    {/* tslint:disable:max-line-length */}
    const { title = MAIN_TITLE } = this.props
    let metaData
    switch (sportRoute) {
      case 'road-bike':
        metaData =
          <Helmet title="Custom Cycling Jerseys for Teams & Clubs - JAKROO">
            <meta name="description" content="Start customizing your cycling kit today! 2 week delivery. Wide product selection. Custom Team Store. Design online select Jakroo Pro Design" />
            <meta name="keywords" content="custom cycling jerseys, custom race suits, custom time trial suits, custom team kits, online jersey designer, pro design by jakroo" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Cycling" />
            <meta name="og:title" content="Custom Cycling Jerseys for Teams & Clubs - JAKROO" />
            <meta name="og:url" content="https://jakroo.com/road-bike" />
            <meta name="og:type" content="article" />
            <meta name="og:description" content="Start customizing your cycling team kit today! 2 week delivery. Wide product selection. Custom Team Store. Design online select Jakroo Pro Design" />
            <link rel="canonical" href="https://www.jakroo.com/" />
            <link rel="author" href="https://www.jakroo.com/" />
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/us?lang=en&currency=usd" />
          </Helmet>
        break
    
      default:
        metaData =
          <Helmet {...{ title }}>
            <meta name="description" content="Custom apparel by Jakroo - Get your custom order started today! Delivered in 2 weeks or less.Two ways to customize your kit" />
            <meta name="keywords" content="custom team apparel, made to order, online jersey designer, customized cycling kits, personalized cycling jerseys" />
            <meta name="Content-Language" content="en" />
            <meta name="page-topic" content="Sport" />
            <meta name="page-type" content="Custom Jerseys" />
            <link rel="canonical" href="https://www.jakroo.com/" />
            <link rel="author" href="https://www.jakroo.com/" />
            <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/gb?lang=en&currency=gbp" />
            <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/us?lang=en&currency=usd" />
            <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/ca?lang=en&currency=cad" />
            <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/au?lang=en&currency=aud" />
            <link rel="alternate" hrefLang="en" href="https://jakroo.com/us?lang=en&currency=usd" />
          </Helmet>
        break
    }
    return metaData
    {/* tslint:enable:max-line-length */}
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
      match,
      mainHeaderData,
      featuredImagesData,
      productTiles,
      featuredBanners,
      featuredProductsData,
      profileData,
      homepageImages,
      secondaryFeaturedImages,
      user,
      carouselSettings: {
        slideTransition,
        slideDuration,
        secondarySlideTransition,
        secondarySlideDuration,
      },
      dataDesignLabInfo,
    } = this.props
    const { formatMessage } = intl
    const browserName = get(clientInfo, 'browser.name', '')
    const { params } = match || {}
    const shortUrl = params.region || ''
    const sportRoute = params.sportRoute || ''
    if (!!shortUrl && shortUrl.length > 0 && shortUrl.charAt(0) === '~') {
      return (
        <RedirectDiv>
          <JakrooLogo src={jakrooLogoWhite} />
          <LabelRedirect>
            {formatMessage(messages.redirectMessage)}
          </LabelRedirect>
          <Spin size="large" />
        </RedirectDiv>
      )
    }
    const deliveryDaysResponse = get(
      dataDesignLabInfo,
      'deliveryDays.days',
      null
    )
    const reseller = get(profileData, 'profileData.reseller', {})
    const deliveryDate = get(dataDesignLabInfo, 'deliveryDate.date', null)
    const loading = get(featuredImagesData, 'loading', true)
    const mainHeaderImages = get(mainHeaderData, 'getHomepageContent.mainHeaderImages', [])
    const featuredImages = get(featuredImagesData, 'getHomepageContent.featuredImages', [])
    const featuredProducts = get(featuredProductsData, 'getHomepageContent.featuredProducts', [])
  
    const today = new Date()
    return (
      <Layout {...{ history, intl }} style={layoutStyle}>
        {this.getMetaData(sportRoute)}
        <Container {...{ loading }}>
          <SearchContainer>
            {featuredImages && featuredImages.length > 0 ?
              featuredImages.map(
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
            : null}
            {mainHeaderImages.length ? (
              <CarouselContainer>
                <Carousel
                  autoplaySpeed={slideDuration}
                  fade={slideTransition === 'fade'}
                  prevArrow={arrowLeft}
                  nextArrow={arrowRight}
                  autoplay={true}
                  pauseOnHover={false}
                >
                  {mainHeaderImages.map(
                    (item: HeaderImagePlaceHolder, index: number) => (
                      <div>
                        <CarouselItem
                          key={index}
                          onClick={this.handleGoToUrl(item.url)}
                          {...{ item }}
                        />
                      </div>
                    )
                  )}
                </Carousel>
              </CarouselContainer>
            ) : null}
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
            {searchString ? (
              <SearchResults
                searchParam={searchString}
                showResults={showSearchResults}
                closeResults={this.closeResults}
                openResults={this.openResults}
                quickViewAction={this.handleOnQuickView}
                currentCurrency={currentCurrency || config.defaultCurrency}
                {...{ history, SearchResults, user }}
              />
            ) : null}
          </div>
          {!!deliveryDaysResponse && (
            <DeliveryContainer>
              <DeliveryInfo>
                <OrderInfo>
                  {formatMessage(messages.orderDate)}
                  <Calendar currentMonth={true}>
                    <Month currentMonth={true}>
                      {moment(today).format('MMMM')}
                    </Month>
                    <Day>{today.getDate()}</Day>
                  </Calendar>
                </OrderInfo>
                <HeaderInfo>
                  <HeaderInfoTitle>
                    {formatMessage(messages.currentTurnaround)}
                  </HeaderInfoTitle>
                  <NumberOfDays>
                    {`${deliveryDaysResponse} ${formatMessage(messages.days)}`}
                  </NumberOfDays>
                </HeaderInfo>
                <OrderInfo>
                  {formatMessage(messages.deliveryDate)}
                  <Calendar>
                    <Month>{moment(deliveryDate).format('MMMM')}</Month>
                    <Day>{moment(deliveryDate).format('DD')}</Day>
                  </Calendar>
                </OrderInfo>
              </DeliveryInfo>
              <OrderingInfo>
                {formatMessage(messages.orderingNote)}
              </OrderingInfo>
            </DeliveryContainer>
          )}
          {featuredProducts && !!featuredProducts.length && (
            <FeaturedProducts
              formatMessage={intl.formatMessage}
              openQuickView={this.handleOnQuickView}
              currentCurrency={currentCurrency || config.defaultCurrency}
              {...{ history, featuredProducts, reseller }}
            />
          )}
          {homepageImages.length ? (
            <CarouselContainer>
              <Carousel
                autoplaySpeed={secondarySlideDuration}
                fade={secondarySlideTransition === 'fade'}
                prevArrow={arrowLeft}
                nextArrow={arrowRight}
                autoplay={true}
                pauseOnHover={false}
                dots={true}
              >
                {homepageImages.map(
                  (item: HeaderImagePlaceHolder, index: number) => (
                    <div>
                      <CarouselItem
                        key={index}
                        onClick={this.handleGoToUrl(item.url)}
                        {...{ item }}
                      />
                    </div>
                  )
                )}
              </Carousel>
            </CarouselContainer>
          ) : null}
          {secondaryFeaturedImages && secondaryFeaturedImages.length > 0 ? 
            secondaryFeaturedImages.map(
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
            : null}
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
                <SlideVideo autoPlay={true}>
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
          <ImageRow>
            <ImageSkeleton />
            <ImageSkeleton />
          </ImageRow>
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

type OwnProps = {
  user?: User
  match?: any
}

const HomeEnhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl,
  withApollo,
  graphql(getFeaturedImages, {
    options: ({ match }: OwnProps) => {
      const { params } = match || {}
      return {
        fetchPolicy: 'network-only',
        variables: { sportRoute: params.sportRoute },
      }
    },
    name: 'featuredImagesData',
  }),
  graphql(getMainHeaderImages, {
    options: ({ match }: OwnProps) => {
      const { params } = match || {}
      return {
        fetchPolicy: 'network-only',
        variables: { sportRoute: params.sportRoute },
      }
    },
    name: 'mainHeaderData',
  }),
  graphql(getFeaturedProducts, {
    options: ({ match }: OwnProps) => {
      const { params } = match || {}
      return {
        fetchPolicy: 'network-only',
        variables: { sportRoute: params.sportRoute },
      }
    },
    name: 'featuredProductsData',
  }),
  graphql(getShortenURLQuery, {
    options: ({ match }: OwnProps) => {
      const { params } = match || {}
      return {
        fetchPolicy: 'network-only',
        variables: { id: params.region },
        skip: !match,
      }
    },
    name: 'shortenURLData',
  }),
  graphql(profileSettingsQuery, {
    options: ({ user }: OwnProps) => {
      return {
        fetchPolicy: 'network-only',
        skip: !user,
      }
    },
    name: 'profileData',
  }),
  graphql<DesignLab>(getDesignLabInfo, {
    options: () => ({
      fetchPolicy: 'network-only',
    }),
    name: 'dataDesignLabInfo',
  })
)(Home)

export default HomeEnhance
