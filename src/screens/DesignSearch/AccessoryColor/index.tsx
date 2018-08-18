/**
 * AccessoryColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import {
  Container,
  Name,
  Stitching,
  ColorLabel,
  Oval
} from './styledComponents'
import { StitchingColor, AccesoryColor } from '../../../types/common'
import { BLACK } from '../../DesignCenter/constants'

interface Props {
  name: string
  stitchingColor?: StitchingColor
  color?: AccesoryColor
}

const AccessoryColor = ({ name, stitchingColor, color }: Props) => {
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  const accessColor = color === BLACK ? '#000000' : '#ffffff'
  return (
    <Container>
      <Name>{name}</Name>
      {stitchingColor ? (
        <Stitching>
          <ColorLabel>{stitchingName}</ColorLabel>
          <Oval color={stitchingValue} />
        </Stitching>
      ) : (
        <Oval color={accessColor} />
      )}
    </Container>
  )
}

export default AccessoryColor
