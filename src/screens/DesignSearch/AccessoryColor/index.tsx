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
import Popover from 'antd/lib/popover'
import ColorPicker from '../ColorPicker'
import { StitchingColor, AccesoryColor } from '../../../types/common'
import { BLACK } from '../../DesignCenter/constants'
import * as Colors from '../../../theme/colors'

interface Props {
  name: string
  stitchingColor?: StitchingColor
  color?: AccesoryColor
  onSelectStitchingColor?: (stitchingColor: StitchingColor) => void
}

const AccessoryColor = ({
  name,
  stitchingColor,
  color,
  onSelectStitchingColor
}: Props) => {
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  const accessColor = color === BLACK ? Colors.BLACK : Colors.WHITE
  return (
    <Container>
      <Popover
        content={
          <div>
            <ColorPicker {...{ stitchingColor, onSelectStitchingColor }} />
          </div>
        }
        trigger="hover"
        placement="right"
      >
        <Name>{name}</Name>
        {stitchingColor ? (
          <Stitching>
            <ColorLabel>{stitchingName}</ColorLabel>
            <Oval color={stitchingValue} />
          </Stitching>
        ) : (
          <Oval color={accessColor} />
        )}
      </Popover>
    </Container>
  )
}

export default AccessoryColor
