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
  Row
} from './styledComponents'
import Popover from 'antd/lib/popover'
import PredyedPicker from '../PredyedPicker'
import { PredyedColor, StitchingColor } from '../../../types/common'

interface Props {
  name: string
  predyedValue: string
  predyedColors: PredyedColor[]
  onSelectPredyed?: (predyedValue: string) => void
}

const StitchingColor = ({
  name,
  predyedValue,
  predyedColors,
  onSelectPredyed
}: Props) => {
  return (
    <Container>
      <Popover
        content={
          <div>
            <PredyedPicker
              {...{ onSelectPredyed, predyedValue, predyedColors }}
            />
          </div>
        }
        trigger="hover"
        placement="right"
      >
        <Row>
          <Name>{name}</Name>
          <Stitching>
            <ColorLabel>{predyedValue}</ColorLabel>
            <Oval color={predyedValue} />
          </Stitching>
        </Row>
      </Popover>
    </Container>
  )
}

export default StitchingColor
