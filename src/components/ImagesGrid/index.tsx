/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
// TODO: Remove commented code after verify it wont be needed at all
// import MediaQuery from 'react-responsive'
import messages from './messages'
import {
  Container,
  // CarouselContent, TODO: See if this is going to be necessary, is from carousel
  // Slide, TODO: See if this is going to be necessary, is from carousel
  //  QuoteContent,
  //  ImageQuote,
  //  CardQuote,
  //  TextQuote,
  ScenesFromTitle
} from './styledComponents'
import FeaturedCategory from '../FeaturedCategory'
import { ProductTiles } from '../../types/common'

// TODO: See if this is going to be necessary, is from carousel
// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 800,
//   autoplay: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   initialSlide: 0,
//   arrows: false
// }

interface Props {
  history: any
  browserName?: string
  productTiles: ProductTiles[]
}

const ImagesGrid = ({ productTiles, history, browserName }: Props) => {
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
      <FeaturedCategory {...{ history, browserName, productTiles }} />
      <ScenesFromTitle withoutCarouselContent={true}>
        <FormattedMessage {...messages.scenesFromLabel} />
      </ScenesFromTitle>
      {/* TODO: See if this is going to be needed */}
      {/* <CarouselContent>
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
      </CarouselContent> */}
    </Container>
  )
}

export default ImagesGrid
