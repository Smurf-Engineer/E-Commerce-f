/**
 * StitchingColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import {
  Container,
  Name,
  Row,
  ColorWheel,
  ColorContainer,
  Color,
  ColorName
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
        <ColorContainer>
          {predyedValue === PREDYED_TRANSPARENT ?
            <ColorWheel src={colorWheel} /> :
            <Color color={predyedCode} />
          }
          <ColorName>
            {predyedValue === PREDYED_TRANSPARENT ? 'Full Print' : predyedValue}
          </ColorName>
        </ColorContainer>
      </Row>
    </Container>
  )
}

export default PredyedColor
