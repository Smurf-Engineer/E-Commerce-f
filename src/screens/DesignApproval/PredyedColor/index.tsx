/**
 * StitchingColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import {
  Container,
  Name,
  Stitching,
  ColorLabel,
  Oval,
  Row,
  ColorWheel
} from './styledComponents'
import colorWheel from '../../../assets/Colorwheel.svg'
import { PredyedColor } from '../../../types/common'
import { PREDYED_TRANSPARENT } from '../../../constants'

interface Props {
  name: string
  predyedValue: string
  predyedCode: string
}

const PredyedColor = ({
  name,
  predyedValue,
  predyedCode,
}: Props) => {
  return (
    <Container>
      <Row>
        <Name>{name}</Name>
        <Stitching>
          <ColorLabel>{predyedValue === PREDYED_TRANSPARENT ? 'Full Print' : predyedValue}</ColorLabel>
          {predyedValue === PREDYED_TRANSPARENT ?
            <ColorWheel src={colorWheel} /> :
            <Oval color={predyedCode} />
          }
        </Stitching>
      </Row>
    </Container>
  )
}

export default PredyedColor
