/**
 * AccessoryColor Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import get from 'lodash/get'
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
import { BLACK, WHITE } from '../../../screens/DesignCenter/constants'

interface Props {
  name: string
  id?: string
  stitchingColor?: StitchingColor
  stitchingLabel?: string
  goToStitching?: () => void
  colorSelected?: AccesoryColor
  allowSelection?: boolean
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

const AccessoryColor = ({
  id = '',
  name,
  stitchingColor,
  stitchingLabel,
  goToStitching,
  colorSelected = BLACK,
  allowSelection = true,
  onAccessoryColorSelected = () => { }
}: Props) => {
  // tslint:disable:curly
  const onSelectBlack = () => {
    if (colorSelected !== BLACK && allowSelection)
      onAccessoryColorSelected(BLACK, id)
  }
  const onSelectWhite = () => {
    if (colorSelected !== WHITE && allowSelection)
      onAccessoryColorSelected(WHITE, id)
  }
  // tslint:enable:curly
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  return (
    <div>
      <Container>
        <Name>{name}</Name>
        {stitchingColor ? (
          <Stitching onClick={goToStitching}>
            <ColorLabel>{stitchingLabel || stitchingName}</ColorLabel>
            <Oval color={stitchingValue} />
            <Arrow type="right" />
          </Stitching>
        ) : (
            <Colors>
              <OvalSelected
                onClick={onSelectBlack}
                selected={colorSelected === BLACK}
              >
                <Oval color={'#000'} />
              </OvalSelected>
              <OvalSelected
                onClick={onSelectWhite}
                selected={colorSelected === WHITE}
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
