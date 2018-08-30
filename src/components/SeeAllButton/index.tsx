/**
 * SeeAllButton Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { Container, Text, NextIcon } from './styledComponents'
import nextIcon from '../../assets/rightarrow.svg'
import messages from './messages'

interface Props {
  withFilterWord?: boolean
  onClick?: (event: React.MouseEvent<EventTarget>) => void
  formatMessage: (messageDescriptor: any) => string
}

const SeeAllButton = ({
  onClick,
  withFilterWord = false,
  formatMessage
}: Props) => {
  return (
    <Container {...{ onClick }}>
      <Text>
        {formatMessage(
          withFilterWord ? messages.seeAllFilters : messages.seeAll
        )}
      </Text>
      <NextIcon src={nextIcon} />
    </Container>
  )
}

export default SeeAllButton
