/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import Slider from 'react-slick'
import { FormattedMessage } from 'react-intl'
import MediaQuery from 'react-responsive'
import messages from './messages'
import {
  Container,
  CarouselContent,
  Slide,
  QuoteContent,
  ImageQuote,
  CardQuote,
  TextQuote,
  ScenesFromTitle
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

interface Props {
  fakeWidth: number
}

const ImagesGrid = ({ fakeWidth }: Props) => {
  return (
    <Container>
      {/* TODO: Remove after verify it wount be needed  */}
      {/* <QuoteContent>
        <CardQuote>
          <TextQuote>
            <FormattedMessage {...messages.quote} />
          </TextQuote>
        </CardQuote>
        <MediaQuery
          minWidth={992}
          values={{ width: fakeWidth, deviceWidth: fakeWidth }}
        >
          {matches => {
            if (matches) {
              return (
                <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
              )
            } else {
              return (
                <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/R2C2.jpg" />
              )
            }
          }}
        </MediaQuery>
        </QuoteContent>*/}
      <ScenesFromTitle>
        <FormattedMessage {...messages.scenesFromLabel} />
      </ScenesFromTitle>
      <CarouselContent>
        <Slider {...settings}>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/herbalife-guys.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/rise-women.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-guys.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-ladies.jpg" />
          </div>
        </Slider>
      </CarouselContent>
    </Container>
  )
}

export default ImagesGrid
