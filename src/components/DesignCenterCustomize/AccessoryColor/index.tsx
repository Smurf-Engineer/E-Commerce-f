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

interface Props {
  name: string
  colorName?: string
  stitching?: boolean
  stitchingColor?: string
  goToStitching?: () => void
  colorSelected?: 'black' | 'white'
}

const AccessoryColor = ({
  name,
  stitching = false,
  colorName = '',
  stitchingColor,
  goToStitching,
  colorSelected = 'black'
}: Props) => {
  return (
    <div>
      <Container>
        <Name>{name}</Name>
        {stitching ? (
          <Stitching onClick={goToStitching}>
            <ColorLabel>{colorName}</ColorLabel>
            <Oval color={stitchingColor} />
            <Arrow type="right" />
          </Stitching>
        ) : (
          <Colors>
            <OvalSelected selected={colorSelected === 'black'}>
              <Oval color={'#000'} />
            </OvalSelected>
            <OvalSelected selected={colorSelected === 'white'}>
              <Oval marginLeft={'8px'} />
            </OvalSelected>
          </Colors>
        )}
      </Container>
      <Divider />
    </div>
  )
}

export default AccessoryColor
