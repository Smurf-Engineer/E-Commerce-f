/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  Separator,
  SlideImageContainer,
  SlideVideo,
  SlideImage,
  ImageContainer,
  RelatedProductsContainer,
  SlideImageMobile,
  ListContainer,
  StoreLabel
} from './styledComponents'
import messages from './messages'
import config from '../../config/index'
import YotpoReviews from '../YotpoReviews'
import { ProductFile, Product, QueryProps, Design, TeamStoreResultType, TeamStoreType } from '../../types/common'
import { getFileExtension } from '../../utils/utilsFiles'
import { RelatedProducts } from '../RelatedProducts'
import { APPROVED, MP4_EXTENSION } from '../../constants'
import { History } from 'history'
import { compose, graphql } from 'react-apollo'
import { getRelatedDesigns, getRelatedProducts, getSingleTeamStore } from './data'
import { connect } from 'react-redux'
import get from 'lodash/get'
import ProductList from '../DesignsCatalogueThumbnailList'
import RelatedProductsUser from '../RelatedProductsUser'
import moment from 'moment'
import find from 'lodash/find'
const LIMIT = 50

interface Data extends QueryProps {
  products: [Product]
}

interface DataStore extends QueryProps {
  teamStores: TeamStoreResultType
  getTeamStore: TeamStoreType
}

interface DataDesign extends QueryProps {
  designs: [Design]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number, yotpoId: string | null) => void
  yotpoId: string
  mediaFiles: ProductFile[]
  data: Data
  name: string
  dispatch: any
  showMedia: boolean
  hideFeatured: boolean
  resellerComission: number
  resellerStatus: string
  designId: string
  productDetail: boolean
  dataDesigns: DataDesign
  teamStoreShortId: string
  teamStoreData: DataStore
  history: History
  currentCurrency: string
  moreTag?: string
}
const YotpoSection = ({
  yotpoId,
  mediaFiles,
  data,
  moreTag,
  name,
  showMedia,
  hideFeatured = false,
  history,
  productDetail,
  formatMessage,
  dispatch,
  resellerComission,
  resellerStatus,
  designId,
  dataDesigns,
  teamStoreData,
  openQuickView,
  teamStoreShortId,
  currentCurrency,
  innerRef
}: Props) => {
  const products = get(data, 'products', [])
  if (teamStoreShortId && hideFeatured && teamStoreData) {
    const getTeamStore = get(teamStoreData, 'getTeamStore', {}) as TeamStoreType
    const teamSizeId = get(getTeamStore, 'team_size_id', 0)
    const teamStoreOwner = get(getTeamStore, 'owner', false)
    const display = get(getTeamStore, 'display', false)
    const teamStoreName = get(getTeamStore, 'name', '')
    const totalDesigns = get(getTeamStore, 'totalDesigns', 0)
    const fixedPrice = get(getTeamStore, 'fixedPrice', false)
    const onDemandMode = get(getTeamStore, 'onDemandMode', false)
    const isResellerStore = get(getTeamStore, 'isResellerStore', false)
    const itemsArray = getTeamStore ? getTeamStore.items || [] : []
    const items = itemsArray.filter((item) => item.design && item.design && item.design.shortId !== designId)
    const priceRanges = getTeamStore ? getTeamStore.priceRanges || [] : []
    const targetRange: any = find(priceRanges, { id: teamSizeId }) || 1
    const isResellerOwner =
        resellerStatus === APPROVED && teamStoreOwner && isResellerStore
    const handleOnOpenQuickView = (id: number, yotpoIdNumber: string) => {
      openQuickView(id, yotpoIdNumber)
    }
    return (
      <Container>
        <YotpoReviews ref={innerRef} {...{ yotpoId, name, hideFeatured }}>
          {teamStoreShortId && teamStoreData && getTeamStore && getTeamStore.id &&
            <ListContainer>
              <StoreLabel>
                {formatMessage(messages.moreTeamProducts)}
              </StoreLabel>
              <ProductList
                {...{
                  targetRange,
                  formatMessage,
                  isResellerOwner,
                  resellerComission,
                  isResellerStore,
                  onDemandMode,
                  currentCurrency,
                  display,
                  teamStoreName,
                  closed,
                  fixedPrice,
                  totalDesigns,
                }}
                withoutPadding={false}
                openQuickView={handleOnOpenQuickView}
                designs={items}
                teamStoreShortId={teamStoreShortId}
                targentPrice={targetRange.name}
                currentRange={priceRanges[1]}
                limit={LIMIT}
                offset={0}
                handleChangePage={() => {}}
                currentPage={0}
                fromYotpo={true}
              />
            </ListContainer>
          }
          {mediaFiles && !!mediaFiles.length && (!hideFeatured || showMedia) && (
            <div>
              <Separator>
                <FormattedMessage {...messages.features} values={{ name }} />
              </Separator>
              {mediaFiles.map(image => (
                <SlideImageContainer>
                  {getFileExtension(image.url) === MP4_EXTENSION ? (
                    <SlideVideo autoPlay={true}>
                      <source src={image.url} type="video/mp4" />
                    </SlideVideo>
                  ) : (
                      <ImageContainer>
                        <SlideImage src={image.url} />
                        <SlideImageMobile src={image.urlMobile} />
                      </ImageContainer>
                    )}
                </SlideImageContainer>
              ))}
            </div>
          )}
          {/* {!!products.length && (
            <RelatedProductsContainer>
              <RelatedProducts
                products={data.products}
                title={`${formatMessage(messages.more)} ${moreTag}`}
                currentCurrency={currentCurrency || config.defaultCurrency}
                {...{ history, formatMessage, dispatch }}
              />
            </RelatedProductsContainer>
          )} */}
          <Separator>
            <FormattedMessage {...messages.customerReview} />
          </Separator>
        </YotpoReviews>
      </Container>
    )
  } else if (designId && hideFeatured) {
    const designs = get(dataDesigns, 'designs', [])
    return (
      <Container>
        <YotpoReviews ref={innerRef} {...{ yotpoId, name, hideFeatured }}>
          {!!designs.length && (
            <RelatedProductsContainer>
              <RelatedProductsUser
                products={designs}
                currentCurrency={currentCurrency || config.defaultCurrency}
                {...{ history, formatMessage, dispatch }}
              />
            </RelatedProductsContainer>
          )}
          {mediaFiles && !!mediaFiles.length && (!hideFeatured || showMedia) && (
            <div>
              <Separator>
                <FormattedMessage {...messages.features} values={{ name }} />
              </Separator>
              {mediaFiles.map(image => (
                <SlideImageContainer>
                  {getFileExtension(image.url) === MP4_EXTENSION ? (
                    <SlideVideo autoPlay={true}>
                      <source src={image.url} type="video/mp4" />
                    </SlideVideo>
                  ) : (
                      <ImageContainer>
                        <SlideImage src={image.url} />
                        <SlideImageMobile src={image.urlMobile} />
                      </ImageContainer>
                    )}
                </SlideImageContainer>
              ))}
            </div>
          )}
          {/* {!!products.length && (
            <RelatedProductsContainer>
              <RelatedProducts
                products={data.products}
                title={`${formatMessage(messages.more)} ${moreTag}`}
                currentCurrency={currentCurrency || config.defaultCurrency}
                {...{ history, formatMessage, dispatch }}
              />
            </RelatedProductsContainer>
          )} */}
          <Separator>
            <FormattedMessage {...messages.customerReview} />
          </Separator>
        </YotpoReviews>
      </Container>
    )
  } else {
    return (
      <Container>
        <YotpoReviews ref={innerRef} {...{ formatMessage, productDetail, yotpoId, name, hideFeatured }}>
          {!!products.length && (
            <RelatedProductsContainer {...{ productDetail }}>
              <RelatedProducts
                products={data.products}
                title={`${formatMessage(messages.more)} ${moreTag}`}
                currentCurrency={currentCurrency || config.defaultCurrency}
                {...{ history, formatMessage, dispatch }}
              />
            </RelatedProductsContainer>
          )}
          {mediaFiles && !!mediaFiles.length && (!hideFeatured || showMedia) && (
            <div>
              <Separator>
                <FormattedMessage {...messages.features} values={{ name }} />
              </Separator>
              {mediaFiles.map(image => (
                <SlideImageContainer>
                  {getFileExtension(image.url) === MP4_EXTENSION ? (
                    <SlideVideo autoPlay={true}>
                      <source src={image.url} type="video/mp4" />
                    </SlideVideo>
                  ) : (
                      <ImageContainer>
                        <SlideImage src={image.url} />
                        <SlideImageMobile src={image.urlMobile} />
                      </ImageContainer>
                    )}
                </SlideImageContainer>
              ))}
            </div>
          )}
          {!productDetail &&
            <Separator>
              <FormattedMessage {...messages.customerReview} />
            </Separator>
          }
        </YotpoReviews>
      </Container>
    )
  }
}

type OwnProps = {
  productId?: number
  relatedItemTag?: string
  hideFeatured?: boolean
  teamStoreShortId?: string
  designId?: string
}

const mapDispatchToProps = (dispatch: any) => ({ dispatch })

const YotpoSectionEnhance = compose(
  graphql<Data>(getRelatedProducts, {
    options: ({ productId, relatedItemTag, teamStoreShortId }: OwnProps) => ({
      variables: {
        productId,
        relatedItemTag
      },
      skip: !productId || !relatedItemTag || teamStoreShortId
    })
  }),
  graphql<Data>(getRelatedDesigns, {
    options: ({ designId, hideFeatured, teamStoreShortId }: OwnProps) => ({
      variables: {
        designId
      },
      skip: !hideFeatured || !designId || !!teamStoreShortId
    }),
    name: 'dataDesigns'
  }),
  graphql<Data>(getSingleTeamStore, {
    options: ({ teamStoreShortId, hideFeatured }: OwnProps) => {
      return {
        variables: {
          teamStoreId: teamStoreShortId,
          skipCode: true,
          date: {
            day: moment().date(),
            month: moment().month(),
            year: moment().year(),
          },
          offset: LIMIT,
        },
        skip: !hideFeatured || !teamStoreShortId,
        fetchPolicy: 'network-only',
      }
    },
    name: 'teamStoreData'
  }),
  connect(mapDispatchToProps)
)(YotpoSection)

export default React.forwardRef((props, ref) => 
  <YotpoSectionEnhance innerRef={ref} {...props} />
)
