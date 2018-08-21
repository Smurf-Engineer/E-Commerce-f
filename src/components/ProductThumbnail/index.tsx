/**
 * ProductThumbnail Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose } from 'react-apollo'
import filter from 'lodash/filter'
import {
  Container,
  Footer,
  Type,
  Description,
  InfoContainer,
  Label,
  Price,
  ImgIcon
} from './styledComponents'
import ImageSlide from './ProductSlide'
import { ImageType, PriceRange } from '../../types/common'
import colorWheelIcon from '../../assets/Colorwheel.svg'

interface Props {
  id: number
  type?: string
  images?: ImageType
  image?: string
  description?: string
  priceRange?: PriceRange[]
  labelButton?: string | React.ReactNode
  isTopProduct: boolean
  collections?: number
  footer?: React.ReactNode
  gender?: number
  hideCustomButton?: boolean
  hideQuickView?: boolean
  yotpoId: string
  designId?: string
  history: any
  isStoreThumbnail?: boolean
  teamStoreShortId?: string
  customizable?: boolean
  customizableLabel?: string
  myLockerList?: boolean
  currentCurrency: string
  disableSlider?: boolean
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number, yotpoId: string) => void
}

class ProductThumbnail extends React.Component<Props, {}> {
  state = {
    isHovered: false,
    currentImage: 0
  }

  handleOnHover = () => this.setState({ isHovered: true })

  handleOnBlur = () => this.setState({ isHovered: false })

  handleOnPressBack = () => {
    let { currentImage } = this.state
    currentImage -= 1
    if (currentImage < 0) {
      return
    }
    this.setState({ currentImage })
  }

  handleOnPressNext = () => {
    const { images } = this.props
    let { currentImage } = this.state
    const keys = Object.keys(images || {})
    currentImage += 1
    if (currentImage >= keys.length - 1) {
      return
    }
    this.setState({ currentImage })
  }

  handleOnPressCustomize = () => {
    const { onPressCustomize, id } = this.props
    onPressCustomize(id)
  }

  handleOnPressQuickView = () => {
    const { onPressQuickView, id, yotpoId } = this.props
    onPressQuickView(id, yotpoId)
  }

  getUrlProduct = () => {
    const {
      id,
      yotpoId,
      teamStoreShortId,
      gender,
      myLockerList,
      designId
    } = this.props
    if (teamStoreShortId) {
      return `/teamstore-product-page?store=${teamStoreShortId}&id=${id}&yotpoId=${yotpoId}`
    }
    if (myLockerList) {
      return `/custom-product?${designId && `id=${designId}`}`
    }
    return `/product?id=${id}&yotpoId=${yotpoId}${
      gender ? `&gender=${gender}` : ''
    }`
  }

  handlePressThumbnail = () => {
    const { history } = this.props
    history.push(this.getUrlProduct())
  }

  render() {
    const {
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      footer,
      labelButton,
      image,
      hideCustomButton,
      hideQuickView,
      customizable,
      currentCurrency,
      customizableLabel,
      myLockerList,
      disableSlider
    } = this.props
    const { isHovered, currentImage } = this.state

    const currencyPrices =
      priceRange &&
      filter(priceRange, {
        abbreviation: currentCurrency
      })

    const price =
      currencyPrices &&
      currencyPrices.length &&
      `$${currencyPrices[0].price} - $${
        currencyPrices[currencyPrices.length - 1].price
      }`

    let urlProduct = this.getUrlProduct()
    return (
      <Container>
        <ImageSlide
          {...{
            isTopProduct,
            isHovered,
            images,
            currentImage,
            labelButton,
            image,
            hideCustomButton,
            hideQuickView,
            urlProduct,
            myLockerList,
            currentCurrency,
            disableSlider,
            customizable
          }}
          onMouseEnter={this.handleOnHover}
          onMouseLeave={this.handleOnBlur}
          onPressQuickView={this.handleOnPressQuickView}
          onPressBack={this.handleOnPressBack}
          onPressNext={this.handleOnPressNext}
          onPressCustomize={this.handleOnPressCustomize}
          onPressThumbnail={this.handlePressThumbnail}
        />
        {footer ? (
          footer
        ) : (
          <Footer>
            <Type>{type}</Type>
            <Description>{description}</Description>
            <InfoContainer customizable={!!customizable}>
              {customizable && (
                <Label>
                  <ImgIcon src={colorWheelIcon} />
                  {customizableLabel}
                </Label>
              )}
              <Price>{price}</Price>
            </InfoContainer>
          </Footer>
        )}
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
