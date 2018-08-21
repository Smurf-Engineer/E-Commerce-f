/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Slider from 'react-rangeslider'
import { Container, Button } from './styledComponents'

const MIN_ZOOM = 25
const MAX_ZOOM = 200
const MIDDLE = (MAX_ZOOM - MIN_ZOOM) / 2 + MIN_ZOOM

interface Props {
  onChangeZoom: (value: number) => void
}

interface State {
  value: number
}

class ZoomSlider extends React.PureComponent<Props, State> {
  state = {
    value: MIDDLE
  }

  handleOnChangeValue = (value: number) =>
    this.setState({ value }, () => this.props.onChangeZoom(value))

  handleZoomIn = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value < MAX_ZOOM) {
      this.setState(
        ({ value: prevValue }) => ({ value: prevValue + 2 }),
        () => onChangeZoom(this.state.value)
      )
    }
  }

  handleZoomOut = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value > MIN_ZOOM) {
      this.setState(
        ({ value: prevValue }) => ({ value: prevValue - 2 }),
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
