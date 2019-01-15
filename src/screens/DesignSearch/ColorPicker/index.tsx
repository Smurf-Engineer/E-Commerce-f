/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'

import { Container, Color, Col, Border } from './styledComponents'
import stitchingColors from '../../../colorList/stitchingColors'
import { StitchingColor } from '../../../types/common'
import { BLACK, WHITE } from '../../DesignCenter/constants'

interface Props {
  stitchingColor?: StitchingColor
  color?: string
  isStitching?: boolean
  onSelectStitchingColor?: (color: StitchingColor) => void
  onSelectColor?: (color: string) => void
}

class ColorPicker extends React.PureComponent<Props> {
  render() {
    const {
      stitchingColor = { value: '', name: '' },
      isStitching,
      onSelectStitchingColor = () => {},
      onSelectColor = () => {},
      color
    } = this.props
    const listOfColors = isStitching
      ? stitchingColors
      : [{ name: '', value: WHITE }, { name: '', value: BLACK }]
    const setStitchingColor = (
      stitchingSelectedColor: StitchingColor
    ) => () => {
      // tslint:disable-next-line:curly
      if (stitchingSelectedColor.value !== stitchingColor.value)
        onSelectStitchingColor(stitchingSelectedColor)
    }
    const setColor = (selectedColor: string) => () => {
      // tslint:disable-next-line:curly
      if (selectedColor !== stitchingColor.value) onSelectColor(selectedColor)
    }
    const colorsList = listOfColors.map(({ value, name }, index) => (
      <Col key={index}>
        <Border selected={value === stitchingColor.value || value === color}>
          <Color
            id={value}
            selected={value === stitchingColor.value || value === color}
            color={value}
            onClick={
              isStitching ? setStitchingColor({ name, value }) : setColor(value)
            }
          />
        </Border>
      </Col>
    ))

    return <Container>{colorsList}</Container>
  }
}

export default ColorPicker
