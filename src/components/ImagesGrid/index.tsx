/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  Text,
  DetailsContent,
  TestimonialsContent
} from './styledComponents'
interface Props {}

const ImagesGrid = () => {
  return (
    <Container>
      <DetailsContent
        dangerouslySetInnerHTML={{
          __html: `
            <div class="yotpo yotpo-pictures-gallery">
            </div>`
        }}
      />
      <TestimonialsContent
        dangerouslySetInnerHTML={{
          __html: `
            <div class="yotpo yotpo-reviews-carousel">
            </div>`
        }}
      />
    </Container>
  )
}

export default ImagesGrid
