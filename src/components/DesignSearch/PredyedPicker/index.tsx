/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'

import { Container, Color, Col, Border } from './styledComponents'
import { PredyedColor } from '../../../types/common'

interface Props {
  predyedValue: string,
  onSelectPredyed: (predyedValue: string) => void,
  predyedColors: PredyedColor[]
}

class ColorPicker extends React.PureComponent<Props> {
  render() {
    const {
      predyedValue,
      onSelectPredyed = () => { },
      predyedColors
    } = this.props
    const setColor = (selectedColor: string) => () => {
      // tslint:disable-next-line:curly
      if (predyedValue !== selectedColor) onSelectPredyed(selectedColor)
    }
    const colorsList = predyedColors.map(({ name, code }, index) => (
      <Col key={index}>
        <Border selected={name === predyedValue}>
          <Color
            id={name}
            selected={name === predyedValue}
            color={code}
            onClick={setColor(name)}
          />
        </Border>
      </Col>
    ))

    return <Container>{colorsList}</Container>
  }
}

export default ColorPicker
