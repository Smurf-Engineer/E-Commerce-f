/**
 * SeeAllButton Component - Created by david on 09/02/18.
 */
import * as React from 'react'
import { Container, Text, NextIcon } from './styledComponents'
import nextIcon from '../../assets/rightarrow.svg'

interface Props {
  onClick?: (event: React.MouseEvent<EventTarget>) => void
}

const SeeAllButton = ({ onClick }: Props) => {
  return (
    <Container {...{ onClick }}>
      <Text>See All</Text>
      <NextIcon src={nextIcon} />
    </Container>
  )
}

export default SeeAllButton
