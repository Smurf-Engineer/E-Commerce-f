/**
 * ColorPicker Component - Created by eduardo on 11/01/19.
 */
import * as React from 'react'

import { Container, Color, Col, ColorModal } from './styledComponents'
import { ProductColors } from '../../../types/common'

interface Props {
  productColors: ProductColors[]
  selectedColor?: number
  onSelectColor: (color: ProductColors) => void
}

class ColorPicker extends React.PureComponent<Props> {
  state = {
    opened: false
  }
  openColors = (sta: boolean) => () => {
    this.setState({ opened: sta })
  }
  handleSelectColor = (item: ProductColors) => () => {
    const { onSelectColor } = this.props
    this.openColors(false)()
    onSelectColor(item)
  }
  render() {
    const { opened } = this.state
    const { selectedColor, productColors } = this.props
    const colorsList = productColors.map((item, index) => (
      <Col key={index}>
        <Color
          id={item.name}
          selected={item.id === selectedColor}
          src={item.image}
          onClick={this.handleSelectColor(item)}
        />
      </Col>
    ))
    const selected = productColors.find(({ id }) => id === selectedColor)
    return (
      <Container>
        <Color
          id={selected.name}
          src={selected.image}
          onClick={this.openColors(!opened)}
        />
        <ColorModal selected={opened}>{colorsList}</ColorModal>
      </Container>
    )
  }
}

export default ColorPicker
