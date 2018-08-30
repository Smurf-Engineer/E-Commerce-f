/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Slider from 'react-rangeslider'
import { Container, Button } from './styledComponents'
import { INITIAL_ZOOM } from '../DesignCenterCustomize/Render3D/config'

const MIN_ZOOM = 50
const MAX_ZOOM = 400
const STEP = 2

interface Props {
  onChangeZoom: (value: number) => void
}

interface State {
  value: number
}

class ZoomSlider extends React.PureComponent<Props, State> {
  state = {
    value: INITIAL_ZOOM * 100
  }

  handleOnChangeValue = (value: number) =>
    this.setState({ value }, () => this.props.onChangeZoom(value))

  handleZoomIn = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value < MAX_ZOOM) {
      this.setState(
        ({ value: prevValue }) => ({ value: prevValue + STEP }),
        () => onChangeZoom(this.state.value)
      )
    }
  }

  handleZoomOut = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value > MIN_ZOOM) {
      this.setState(
        ({ value: prevValue }) => ({ value: prevValue - STEP }),
        () => onChangeZoom(this.state.value)
      )
    }
  }

  render() {
    const { value } = this.state
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
