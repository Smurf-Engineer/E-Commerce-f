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
import Popover from 'antd/lib/popover'
import colorWheel from '../../../assets/Colorwheel.svg'
import PredyedPicker from '../PredyedPicker'
import { PredyedColor, StitchingColor } from '../../../types/common'
import { PREDYED_TRANSPARENT } from '../../../constants'

interface Props {
  name: string
  predyedValue: string
  predyedCode: string
  predyedColors: PredyedColor[]
  onSelectPredyed?: (predyedValue: string) => void
}

const StitchingColor = ({
  name,
  predyedValue,
  predyedColors,
  predyedCode,
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
            <ColorLabel>{predyedValue === PREDYED_TRANSPARENT ? 'Full Print' : predyedValue}</ColorLabel>
            {predyedValue === PREDYED_TRANSPARENT ?
              <ColorWheel src={colorWheel} /> :
              <Oval color={predyedCode} />
            }
          </Stitching>
        </Row>
      </Popover>
    </Container>
  )
}

export default StitchingColor
