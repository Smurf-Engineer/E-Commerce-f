/**
 * DesignPathway Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  DesignsCardsContainer,
  Card,
  CardTitle,
  Button,
  Text
} from './styledComponents'
import FromScratch from '../../../assets/from_scratch.svg'
import FromScratchMobile from '../../../assets/from_scratch_mobile.svg'
import ExistingArtwork from '../../../assets/existing_artwork.svg'
import ExistingArtworkMobile from '../../../assets/existing_artwork_mobile.svg'

import { Message } from '../../../types/common'

interface Props {
  isMobile: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  fromScratch: () => void
  existingArtwork: () => void
}

const MobileMenu = ({ isMobile, formatMessage, fromScratch, existingArtwork }: Props) => {
  return (
    <Container>
      <DesignsCardsContainer>
        <Card onClick={fromScratch}>
          <CardTitle>
            <img src={isMobile ? FromScratchMobile : FromScratch} />
          </CardTitle>
          <Text>{formatMessage(messages.fromScratch)}</Text>
          <Button>
            {formatMessage(messages.select)}
          </Button>
        </Card>
        <Card onClick={existingArtwork}>
          <CardTitle>
            <img src={isMobile ? ExistingArtworkMobile : ExistingArtwork} />
          </CardTitle>
          <Text>{formatMessage(messages.existingArtowrk)}</Text>
          <Button>
            {formatMessage(messages.select)}
          </Button>
        </Card>
      </DesignsCardsContainer>
    </Container>
  )
}

export default MobileMenu
