/**
 * ProductThumbnail Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import filter from 'lodash/filter'
import get from 'lodash/get'
import {
  Container,
  Footer,
  Type,
  Description,
  InfoContainer,
  GendersContainer,
  MenIcon,
  WomenIcon,
  Label,
  Price,
  BuyNow,
  ImgIcon,
  RetailColors
} from './styledComponents'
import messages from './messages'
import { Product } from '../../types/common'
import ImageSlide from './ProductSlide'
import { saveInLocalStorage } from './api'
import { ImageType, PriceRange, ProductColors } from '../../types/common'
import colorWheelIcon from '../../assets/Colorwheel.svg'

const LIMIT_PRICE_RANGE = 3
const WHITENAME = 'White'

interface Props {
  id: number
  type?: string
  product: Product
  images?: ImageType
  image?: string
  description?: string
  priceRange?: PriceRange[]
  labelButton?: string | React.ReactNode
  isTopProduct: boolean
  itemId?: string
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
  reversePriceRange?: boolean
  backgroundColor?: string
  colors: ProductColors[]
  proDesign: boolean
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number, yotpoId: string, gender: number) => void
  onPressThumbnail: () => void
}

class ProductThumbnail extends React.Component<Props, {}> {
  state = {
    isHovered: false,
    currentImage: 0
  }

  handleOnHover = () => this.setState({ isHovered: true })

  handleOnBlur = () => this.setState({ isHovered: false })

  handleOnPressBack = () => {
    const { images } = this.props
    let { currentImage } = this.state
    const keys = Object.keys(images || {})
    const index = keys.indexOf('genderId')
    if (index !== -1) {
      keys.splice(index, 1)
    }
    currentImage -= 1
    if (currentImage < 0) {
      currentImage = keys.length - 2
    }
    this.setState({ currentImage })
  }

  handleOnPressNext = () => {
    const { images } = this.props
    let { currentImage } = this.state
    const keys = Object.keys(images || {})
    const index = keys.indexOf('genderId')
    if (index !== -1) {
      keys.splice(index, 1)
    }
    currentImage += 1
    if (currentImage >= keys.length - 1) {
      currentImage = 0
    }
    this.setState({ currentImage })
  }

  handleOnPressCustomize = () => {
    const { onPressCustomize, id } = this.props
    onPressCustomize(id)
  }

  handleOnPressQuickView = () => {
    const { onPressQuickView, id, yotpoId, gender } = this.props
    onPressQuickView(id, yotpoId, gender || 0)
  }

  getUrlProduct = () => {
    const { id, yotpoId, gender, itemId, myLockerList, designId } = this.props
    if (designId && itemId) {
      return `/custom-product?id=${designId}${itemId && `&item=${itemId}`}`
    }
    if (myLockerList) {
      return `/custom-product?${designId && `id=${designId}`}`
    }
    return `/product?id=${id}&modelId=${yotpoId}${
      gender ? `&gender=${gender}` : ''
    }`
  }

  handlePressThumbnail = () => {
    const { history, onPressThumbnail } = this.props
    if (onPressThumbnail) {
      onPressThumbnail()
    }
    history.push(this.getUrlProduct())
  }
  handleOnBuyNow = async () => {
    const { product, history } = this.props
    const details = [
      {
        fit: get(product, 'fitStyles[0]', ''),
        size: get(product, 'sizeRange[0]', ''),
        gender: get(product, 'genders[0]', ''),
        color: get(product, 'colors[0]', ''),
        quantity: 1
      }
    ]
    const itemToAdd = Object.assign(
      {},
      { product },
      {
        itemDetails: details
      },
      { designId: '' },
      { designName: '' },
      { designImage: '' },
      { designCode: '' },
      { teamStoreId: '' }
    )
    await saveInLocalStorage(itemToAdd, history)
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
      product,
      hideCustomButton,
      hideQuickView,
      customizable,
      currentCurrency,
      customizableLabel,
      myLockerList,
      disableSlider,
      backgroundColor,
      colors,
      reversePriceRange,
      proDesign
    } = this.props
    const { isHovered, currentImage } = this.state

    const currencyPrices =
      priceRange &&
      filter(priceRange, {
        abbreviation: currentCurrency
      })

    const symbol = get(currencyPrices, '[0].shortName', '')

    let lastPriceIndex = LIMIT_PRICE_RANGE

    if (currencyPrices && currencyPrices.length < LIMIT_PRICE_RANGE) {
      lastPriceIndex = currencyPrices.length - 1
    }

    let price = ''

    if (currencyPrices && currencyPrices.length) {
      const basePrice = currencyPrices[0].price
      const lastPrice = currencyPrices[lastPriceIndex].price

      price = `${symbol} ${basePrice}`

      if (customizable) {
        if (reversePriceRange) {
          price = `${symbol} ${lastPrice} - ${basePrice}`
        } else {
          price += ` - ${lastPrice}`
        }
      }
    }

    let urlProduct = this.getUrlProduct()
    const colorList =
      colors &&
      colors.map(({ image: imageColor, name }: ProductColors, index) => (
        <ImgIcon withBorder={name === WHITENAME} src={imageColor} key={index} />
      ))

    const colorOptions = customizable ? (
      <Label>
        <ImgIcon src={colorWheelIcon} />
        {customizableLabel}
      </Label>
    ) : (
      <RetailColors>
        {colorList}
        <BuyNow onClick={this.handleOnBuyNow}>
          <FormattedMessage {...messages.buyNow} />
        </BuyNow>
      </RetailColors>
    )
    let menAvailable = false
    let womenAvailable = false
    if (product && !!product.genders) {
      product.genders.forEach(gender => {
        if (gender.name === 'Men') {
          menAvailable = true
        }
        if (gender.name === 'Women') {
          womenAvailable = true
        }
      })
    }
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
            customizable,
            backgroundColor,
            proDesign
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
            <Type>
              {type}
              <GendersContainer>
                {menAvailable && <MenIcon type="man" />}
                {womenAvailable && <WomenIcon type="woman" />}
              </GendersContainer>
            </Type>
            <Description>{description}</Description>
            <InfoContainer>
              {colorOptions}
              <Price>{price}</Price>
            </InfoContainer>
          </Footer>
        )}
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
