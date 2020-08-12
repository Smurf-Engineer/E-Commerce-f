/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Slider from 'react-rangeslider'
import { Container, Button } from './styledComponents'

const MIN_ZOOM = 50
const MAX_ZOOM = 400
const STEP = 2

interface Props {
  value: number
  onChangeZoom: (value: number) => void
}

class ZoomSlider extends React.PureComponent<Props, {}> {

  handleOnChangeValue = (value: number) => this.props.onChangeZoom(value)

  handleZoomIn = () => {
    const { onChangeZoom, value } = this.props

    if (value < MAX_ZOOM) {
      onChangeZoom(value + STEP)
    }
  }

  handleZoomOut = () => {
    const { onChangeZoom, value } = this.props
    if (value > MIN_ZOOM) {
      onChangeZoom(value - STEP)
    }
  }

  render() {
    const { value } = this.props
    return (
      <Container>
        <Button onClick={this.handleZoomIn}>+</Button>
        <Slider
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          value={value}
          tooltip={false}
          orientation="vertical"
          onChange={this.handleOnChangeValue}
        />
        <Button onClick={this.handleZoomOut}>-</Button>
      </Container>
    )
  }
}

export default ZoomSlider
