/**
 * StitchingColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import {
  Container,
  Name,
  Stitching,
  ColorLabel,
  Oval,
  Row
} from './styledComponents'
import Popover from 'antd/lib/popover'
import ColorPicker from '../ColorPicker'
import { StitchingColor } from '../../../types/common'

interface Props {
  name: string
  stitchingColor: StitchingColor
  onSelectStitchingColor?: (stitchingColor: StitchingColor) => void
}

const StitchingColor = ({
  name,
  stitchingColor,
  onSelectStitchingColor
}: Props) => {
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  return (
    <Container>
      <Popover
        content={
          <div>
            <ColorPicker
              {...{ onSelectStitchingColor, stitchingColor }}
              isStitching={true}
            />
          </div>
        }
        trigger="hover"
        placement="right"
      >
        <Row>
          <Name>{name}</Name>
          <Stitching>
            <ColorLabel>{stitchingName}</ColorLabel>
            <Oval color={stitchingValue} />
          </Stitching>
        </Row>
      </Popover>
    </Container>
  )
}

export default StitchingColor
