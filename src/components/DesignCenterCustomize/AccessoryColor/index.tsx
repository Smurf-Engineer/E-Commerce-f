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
import { StitchingColor, AccesoryColor } from '../../../types/common'

interface Props {
  name: string
  id?: string
  stitchingColor?: StitchingColor
  goToStitching?: () => void
  colorSelected?: AccesoryColor
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

const AccessoryColor = ({
  id = '',
  name,
  stitchingColor,
  goToStitching,
  colorSelected = 'white',
  onAccessoryColorSelected = () => {}
}: Props) => {
  const onSelectBlack = () => onAccessoryColorSelected('black', id)
  const onSelectWhite = () => onAccessoryColorSelected('white', id)
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
            <OvalSelected
              onClick={onSelectBlack}
              selected={colorSelected === 'black'}
            >
              <Oval color={'#000'} />
            </OvalSelected>
            <OvalSelected
              onClick={onSelectWhite}
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
