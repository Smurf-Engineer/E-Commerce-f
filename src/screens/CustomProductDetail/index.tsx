/**
 * CustomProductDetail Screen - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import * as customProductDetailActions from './actions'
import messages from './messages'
import { GetDesignByIdQuery } from './data'
import {
  Container,
  Content,
  ImagePreview,
  ProductData,
  TitleRow,
  TitleSubtitleContainer,
  Title,
  Subtitle,
  EditDesignButton,
  PricesRow,
  AvailablePrices,
  Description,
  AvailableLabel
} from './styledComponents'
import Layout from '../../components/MainLayout'
import ImagesSlider from '../../components/ImageSlider'
import { QueryProps, DesignType } from '../../types/common'
import ThreeDRender from '../TeamstoreProductPage/Product3D'
import PriceQuantity from '../../components/PriceQuantity'
import Ratings from '../../components/Ratings'

interface Data extends QueryProps {
  design: DesignType
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  setLoadingModel: (loading: boolean) => void
  addItemToCartAction: (item: any) => void
}

export class CustomProductDetail extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      history,
      location: { search },
      setLoadingModel,
      data: { design }
    } = this.props

    const { formatMessage } = intl

    const queryParams = queryString.parse(search)

    const designId = queryParams.id
    const name = get(design, 'name', '')
    const designImage = get(design, 'image')
    const colors = get(design, 'colors')
    const svgUrl = get(design, 'svg', '')
    const product = get(design, 'product', null)

    const images = get(product, 'images', [])
    const genderId = get(product, 'genderId', 0)
    const genders = get(product, 'genders', [])
    const type = get(product, 'type', '')
    const yotpoAverageScore = get(product, 'yotpoAverageScore')
    const description = get(product, 'description')

    const genderIndex = findIndex(images, { genderId })

    const thumbnails = images && (images[genderIndex] || images[0])

    const renderPrices =
      product &&
      product.priceRange.map(({ price, quantity }, index: number) => (
        <AvailablePrices key={index}>
          <PriceQuantity {...{ index, price, quantity }} />
        </AvailablePrices>
      ))

    const maleGender = get(genders, '0.name', '')
    const femaleGender = get(genders, '1.name', '')

    const genderMessage =
      femaleGender && maleGender
        ? formatMessage(messages.unisexGenderLabel)
        : formatMessage(messages.oneGenderLabel)

    return (
      <Layout {...{ history, intl }}>
        <Container>
          {design && (
            <Content>
              <ImagePreview>
                <ImagesSlider
                  onLoadModel={setLoadingModel}
                  threeDmodel={<ThreeDRender {...{ colors, svgUrl }} />}
                  customProduct={true}
                  customImage={designImage}
                  images={thumbnails}
                />
              </ImagePreview>
              <ProductData>
                <TitleRow>
                  <TitleSubtitleContainer>
                    <Title>{name}</Title>
                    <Subtitle>{type.toLocaleUpperCase()}</Subtitle>
                  </TitleSubtitleContainer>
                  <EditDesignButton onClick={this.gotToEditDesign(designId)}>
                    {formatMessage(messages.editDesign)}
                  </EditDesignButton>
                </TitleRow>
                <PricesRow>{renderPrices}</PricesRow>
                <Ratings
                  stars={5}
                  starDimension={'15px'}
                  rating={get(yotpoAverageScore, 'averageScore', 0)}
                  totalReviews={get(yotpoAverageScore, 'total', 0)}
                />
                <Description>{description}</Description>
                <AvailableLabel>{genderMessage}</AvailableLabel>
              </ProductData>
            </Content>
          )}
        </Container>
      </Layout>
    )
  }

  gotToEditDesign = (designId: string) => () => {
    const { history } = this.props
    history.push(`/design-center?designId=${designId}`)
  }
}

const mapStateToProps = (state: any) => state.get('customProductDetail').toJS()

type OwnProps = {
  location?: any
}

const CustomProductDetailEnhance = compose(
  injectIntl,
  graphql<Data>(GetDesignByIdQuery, {
    options: (ownprops: OwnProps) => {
      const {
        location: { search }
      } = ownprops
      const queryParams = queryString.parse(search)
      return {
        variables: {
          designId: queryParams ? queryParams.id : null
        }
      }
    }
  }),
  connect(
    mapStateToProps,
    { ...customProductDetailActions }
  )
)(CustomProductDetail)

export default CustomProductDetailEnhance
