/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import Slider from 'react-slick'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  DetailsContent,
  TestimonialsContent,
  CarouselContent,
  Slide,
  QuoteContent,
  ImageQuote,
  CardQuote,
  TextQuote
} from './styledComponents'

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false
}

const ImagesGrid = () => {
  return (
    <Container>
      <QuoteContent>
        <CardQuote>
          <TextQuote>
            <FormattedMessage {...messages.quote} />
          </TextQuote>
        </CardQuote>
        <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
      </QuoteContent>
      <CarouselContent>
        <Slider {...settings}>
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/herbalife-guys.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/rise-women.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-guys.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-ladies.jpg" />
        </Slider>
      </CarouselContent>
      <DetailsContent
        dangerouslySetInnerHTML={{
          __html: `<div class="yotpo yotpo-pictures-gallery"
            data-layout-rows="2" 
            data-spacing="1" 
            data-source="all" 
            data-title="0" 
            data-hover-color="#ffffff" 
            data-hover-opacity="0.8" 
            data-hover-icon="true" 
            data-cta-text="CUSTOMIZE" 
            data-cta-color="#2f84ed"
            data-yotpo-element-id="2">
            </div>`
        }}
      />
      <TestimonialsContent
        dangerouslySetInnerHTML={{
          __html: `
            <div 
            class="yotpo yotpo-reviews-carousel"
            data-background-color="transparent"
            data-mode="top_rated"
            data-type="both"
            data-count="9"
            data-show-bottomline="1"
            data-autoplay-enabled="1"
            data-autoplay-speed="3000"
            data-show-navigation="1"
            data-yotpo-element-id="1"
            style="max-width: 100%;"
            >
            </div>
            `
        }}
      />
    </Container>
  )
}

export default ImagesGrid
