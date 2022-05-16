/**
 * YotpoReviews Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import {
  Container,
  YotpoReviewsContainer,
  YotpoCarouselContainer,
  Separator
} from './styledComponents'
import ReactDOM from 'react-dom'
import messages from './messages'

interface Props {
  yotpoId: string
  name: string
  formatMessage?: (messageDescriptor: any) => string
  productDetail?: boolean
  noCarousel?: boolean
  hideFeatured?: boolean
}

declare global {
  interface Window {
    yotpo: any
  }
}

class YotpoReviews extends React.Component<Props, any> {
  yotpo: any
  yotpoGallery: any
  // componentDidUpdate() {
  //   if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
  //     window.yotpo.refreshWidgets()
  //   }
  // }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
      window.yotpo.refreshWidgets()
    }
  }

  updateYotpoWidget = (id: string) => {
    try {
      const yotpoReviews = ReactDOM.findDOMNode(this.yotpo) as Element
      yotpoReviews.setAttribute('class', 'yotpo yotpo-main-widget')
      yotpoReviews.setAttribute('data-product-id', id)
      yotpoReviews.setAttribute('data-price', 'Product Price')
      yotpoReviews.setAttribute('data-currency', 'Price Currency')
      yotpoReviews.setAttribute('data-name', 'Product Title')

      const yotpoCarousel = ReactDOM.findDOMNode(this.yotpoGallery) as Element
      yotpoCarousel.setAttribute('class', 'yotpo yotpo-slider yotpo-size-7')
      yotpoCarousel.setAttribute('data-product-id', id)
      yotpoCarousel.setAttribute('data-yotpo-element-id', '3')

      if (window.yotpo.inview) {
        window.yotpo.refreshWidgets()
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    const { children, formatMessage, name, hideFeatured, yotpoId, productDetail } = this.props
    return productDetail ? (
      <Container {...{ name }}>
        {children}
        {!hideFeatured &&
          <YotpoCarouselContainer>
            <div
              class="yotpo yotpo-slider yotpo-size-7"
              data-product-id={yotpoId}
              data-yotpo-element-id="3"
            />
          </YotpoCarouselContainer>
        }
        {formatMessage &&
          <Separator>
            {formatMessage(messages.customerReview)}
          </Separator>
        }
        <YotpoReviewsContainer innerRef={this.props.innerRef}>
          <div
            class="yotpo yotpo-main-widget"
            data-product-id={yotpoId}
            data-price="Product Price"
            data-currency="Price Currency"
            data-name="Product Title"
          />
        </YotpoReviewsContainer>
      </Container>
    ) : (
      <Container {...{ name }}>
        {!hideFeatured &&
          <YotpoCarouselContainer>
            <div
              class="yotpo yotpo-slider yotpo-size-7"
              data-product-id={yotpoId}
              data-yotpo-element-id="3"
            />
          </YotpoCarouselContainer>
        }
        {children}
        <YotpoReviewsContainer innerRef={this.props.innerRef}>
          <div
            class="yotpo yotpo-main-widget"
            data-product-id={yotpoId}
            data-price="Product Price"
            data-currency="Price Currency"
            data-name="Product Title"
          />
        </YotpoReviewsContainer>
      </Container>
    )
  }
}

export default React.forwardRef((props, ref) => 
  <YotpoReviews 
    innerRef={ref} {...props}
  />
)
