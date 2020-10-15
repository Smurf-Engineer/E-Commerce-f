/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'

import { Container, Color, Col, Border, ColorWheel } from './styledComponents'
import colorWheel from '../../../assets/Colorwheel.svg'
import { PredyedColor } from '../../../types/common'
import { PREDYED_TRANSPARENT } from '../../../constants'

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
          {name === PREDYED_TRANSPARENT ?
            <ColorWheel
              id={name}
              src={colorWheel}
              selected={name === predyedValue}
              color={code}
              onClick={setColor(name)}
            /> :
            <Color
              id={name}
              selected={name === predyedValue}
              color={code}
              onClick={setColor(name)}
            />
          }
        </Border>
      </Col>
    ))

    return <Container>{colorsList}</Container>
  }
}

export default ColorPicker
