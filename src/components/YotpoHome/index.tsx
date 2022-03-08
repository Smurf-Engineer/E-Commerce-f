/**
 * YotpoHome Component
 */
import * as React from 'react'
import { Container, YotpoHomeContainer, YotpoReviews } from './styledComponents'

interface Props {
  sportRoute?: string
}

declare global {
  interface Window {
    yotpo: any
  }
}

class YotpoHome extends React.Component<Props, any> {
  componentDidUpdate() {
    if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
      window.yotpo.refreshWidgets()
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
      window.yotpo.refreshWidgets()
    }
  }

  getHomeContainer = () => {
    let component
    try {
      const { sportRoute } = this.props
      switch (sportRoute) {
        case 'road-bike':
          component = 
            <div
              class="yotpo yotpo-pictures-widget"
              data-gallery-id="62216ea40e65803c12186ed7"
            />
          break
        case 'triathlon':
          component =
            <div
              class="yotpo yotpo-pictures-widget"
              data-gallery-id="5d24a0e0dbcbdf035572d99a"
            />
          break
        case 'mountain-bike':
          component =
            <div
              class="yotpo yotpo-pictures-widget"
              data-gallery-id="62216e5586d1927c03767974"
            />
          break
        case 'nordic':
          component =
            <div
              class="yotpo yotpo-pictures-widget"
              data-gallery-id="5d24a82784f4bc50b6b7fb7a"
            />
          break
        default:
          component =
            <div
              class="yotpo yotpo-pictures-gallery"
              data-layout-rows="1"
              data-spacing="1"
              data-source="all"
              data-title="0"
              data-hover-color="#ffffff"
              data-hover-opacity="0.8"
              data-hover-icon="true"
              data-cta-text="CUSTOMIZE"
              data-cta-color="#2f84ed"
              data-yotpo-element-id="2"
            />
          break
      }
    } catch (e) {
      console.error(e)
    }
    return component
  }

  getReviews = () => {
    let component
    try {
      component = 
        <div
          class="yotpo yotpo-reviews-carousel"
          data-background-color="transparent"
          data-mode="most_recent"
          data-type="both"
          data-count="9"
          data-show-bottomline="1"
          data-autoplay-enabled="1"
          data-autoplay-speed="3000"
          data-show-navigation="1"
          data-yotpo-element-id="1"
          style={{ marginRight: '5%', marginLeft: '5%' }}
        />
    } catch (e) {
      console.error(e)
    }
    return component
  }

  render() {
    const homeContainer = this.getHomeContainer()
    const reviewsContainer = this.getReviews()
    return (
      <Container>
        <YotpoHomeContainer>
          {homeContainer}
        </YotpoHomeContainer>
        <YotpoReviews>
          {reviewsContainer}
        </YotpoReviews>
      </Container>
    )
  }
}

export default YotpoHome
