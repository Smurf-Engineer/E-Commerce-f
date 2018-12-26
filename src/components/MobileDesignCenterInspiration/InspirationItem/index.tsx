/**
 * InspirationItem Component - Created by eduardo on 24/12/18.
 */
import * as React from 'react'
import { Container, Image } from './styledComponents'
import { Inspiration } from '../../../types/common'

interface Props {
  inspiration: Inspiration
  setColors: (colors: string[], name: string) => void
}

const InspirationItem = ({
  inspiration: { name, image, colors },
  setColors
}: Props) => {
  const onInspirationClicked = () => {
    setColors([...colors].reverse(), name)
  }
  return (
    <Container onClick={onInspirationClicked}>
      <Image {...{ image }} />
    </Container>
  )
}

export default InspirationItem
