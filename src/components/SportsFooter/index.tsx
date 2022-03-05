/**
 * SportsFooter Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import { Container, Title, Text } from './styledComponents'
import messages from './messages'
import Span from '../Common/UnderlinedLink'

interface Props {
  formatMessage: (messageDescriptor: any) => string
  history?: any
  currentRegion: string
  currentLanguage: string
  currentCurrency?: string
}
const sports = [
  {
    name: 'Road Bike',
    path: '/road-bike'
  },
  {
    name: 'Mountain Bike',
    path: '/mountain-bike'
  },
  {
    name: 'Indoor',
    path: '/indoor'
  },
  {
    name: 'Triathlon',
    path: '/triathlon'
  },
  {
    name: 'Active',
    path: '/active'
  },
  {
    name: 'Nordic Ski',
    path: '/nordic'
  },
]
const SportsFooter = ({ formatMessage, currentRegion, currentCurrency, currentLanguage }: Props) => {
  const openUrl = (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = evt
    if (id) {
      const path = `${id}/${currentRegion}?lang=${currentLanguage || 
        'en'}&currency=${currentCurrency}`
      window.location.replace(path)
    }
  }
  return (
    <Container>
      <Title>{formatMessage(messages.title)}</Title>
      {sports.map(({ name: linkName, path }, key: number) =>
        <Text {...{ key }} onClick={openUrl} id={path}>
          <Span id={path} noClick={true} link={path}>{linkName}</Span>
        </Text>
      )}
    </Container>
  )
}

export default SportsFooter
