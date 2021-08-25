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
  Text,
  Title,
  TextDiv
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
          <TextDiv>
            <Title>{formatMessage(messages.getInspired)}</Title>
            <Text>{formatMessage(messages.fromScratch)}</Text>
          </TextDiv>
          <Button>
            {formatMessage(messages.select)}
          </Button>
        </Card>
        <Card onClick={fromDesign}>
          <CardTitle>
            <img src={FromDesignImage} />
          </CardTitle>
          <TextDiv>
            <Title>{formatMessage(messages.addMatching)}</Title>
            <Text>{formatMessage(messages.fromDesign)}</Text>
          </TextDiv>
          <Button>
            {formatMessage(messages[loggedIn ? 'select' : 'login'])}
          </Button>
        </Card>
        <Card onClick={existingArtwork}>
          <CardTitle>
            <img src={ExistingArtwork} />
          </CardTitle>
          <TextDiv>
            <Title>{formatMessage(messages.artTemplate)}</Title>
            <Text>{formatMessage(messages.existingArtowrk)}</Text>
          </TextDiv>
          <Button>
            {formatMessage(messages.select)}
          </Button>
        </Card>
      </DesignsCardsContainer>
    </Container>
  )
}

export default MobileMenu
