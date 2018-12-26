/**
 * InspirationItem Component - Created by miguelcanobbio on 14/08/18.
 */
import * as React from 'react'
import { Container, Image, Title } from './styledComponents'
import { Inspiration } from '../../../types/common'

interface Props {
  inspiration: Inspiration
  setColors: (colors: string[], name: string) => void
  hideBottomSheet: () => void
}

const InspirationItem = ({
  inspiration: { name, image, colors },
  setColors,
  hideBottomSheet
}: Props) => {
  const onInspirationClicked = () => {
    hideBottomSheet()
    setColors([...colors].reverse(), name)
  }
  return (
    <Container onClick={onInspirationClicked}>
      <Image src={image} />
      <Title>{name}</Title>
    </Container>
  )
}

export default InspirationItem
