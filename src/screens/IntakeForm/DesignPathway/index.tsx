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
import FromDesignImage from '../../../assets/locker_view.svg'
import ExistingArtwork from '../../../assets/existing_artwork.svg'

import { Message } from '../../../types/common'

interface Props {
  isMobile: boolean
  loggedIn: boolean
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  fromScratch: () => void
  fromDesign: () => void
  existingArtwork: () => void
}

const MobileMenu = ({ formatMessage, loggedIn, fromDesign, fromScratch, existingArtwork }: Props) => {
  return (
    <Container>
      <DesignsCardsContainer>
        <Card onClick={fromScratch}>
          <CardTitle>
            <img src={FromScratch} />
          </CardTitle>
          <Text>{formatMessage(messages.fromScratch)}</Text>
          <Button>
            {formatMessage(messages.select)}
          </Button>
        </Card>
        <Card onClick={fromDesign}>
          <CardTitle>
            <img src={FromDesignImage} />
          </CardTitle>
          <Text>{formatMessage(messages.fromDesign)}</Text>
          <Button>
            {formatMessage(messages[loggedIn ? 'select' : 'login'])}
          </Button>
        </Card>
        <Card onClick={existingArtwork}>
          <CardTitle>
            <img src={ExistingArtwork} />
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
