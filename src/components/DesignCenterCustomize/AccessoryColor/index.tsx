/**
 * AccessoryColor Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import {
  Container,
  Divider,
  Name,
  Stitching,
  ColorLabel,
  Oval,
  Arrow,
  Colors,
  OvalSelected
} from './styledComponents'
import { StitchingColor } from '../../../types/common'

interface Props {
  name: string
  stitchingColor?: StitchingColor
  goToStitching?: () => void
  colorSelected?: 'black' | 'white'
}

const AccessoryColor = ({
  name,
  stitchingColor,
  goToStitching,
  colorSelected = 'white'
}: Props) => {
  return (
    <div>
      <Container>
        <Name>{name}</Name>
        {stitchingColor ? (
          <Stitching onClick={goToStitching}>
            <ColorLabel>{stitchingColor.name}</ColorLabel>
            <Oval color={stitchingColor.value} />
            <Arrow type="right" />
          </Stitching>
        ) : (
          <Colors>
            <OvalSelected selected={colorSelected === 'black'}>
              <Oval color={'#000'} />
            </OvalSelected>
            <OvalSelected
              selected={colorSelected === 'white'}
              marginLeft={'8px'}
            >
              <Oval />
            </OvalSelected>
          </Colors>
        )}
      </Container>
      <Divider />
    </div>
  )
}

export default AccessoryColor
