/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'

import { Container, Color, Col, Border } from './styledComponents'
import stitchingColors from '../../../colorList/stitchingColors'
import { StitchingColor } from '../../../types/common'

interface Props {
  onSelectStitchingColor?: (color: StitchingColor) => void
  stitchingColor?: StitchingColor
  disableTooltip?: boolean
}

class ColorPicker extends React.PureComponent<Props> {
  render() {
    const {
      onSelectStitchingColor = () => {},
      stitchingColor = { value: '', name: '' }
    } = this.props
    const setStitchingColor = (color: StitchingColor) => () => {
      // tslint:disable-next-line:curly
      if (color.value !== stitchingColor.value) onSelectStitchingColor(color)
    }
    const colorsList = stitchingColors.map(({ value, name }, index) => (
      <Col key={index}>
        <Border selected={value === stitchingColor.value}>
          <Color
            id={value}
            selected={value === stitchingColor.value}
            color={value}
            onClick={setStitchingColor({ name, value })}
          />
        </Border>
      </Col>
    ))

    return <Container>{colorsList}</Container>
  }
}

export default ColorPicker
