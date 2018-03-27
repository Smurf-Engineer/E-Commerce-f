/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import Slider from 'react-rangeslider'
import { Container, Button } from './styledComponents'

interface Props {
  onChangeZoom: (value: number) => void
}

interface State {
  value: number
}

class ZoomSlider extends React.PureComponent<Props, State> {
  state = {
    value: 250
  }

  handleOnChangeValue = (value: number) =>
    this.setState({ value }, () => this.props.onChangeZoom(value))

  handleZoomIn = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value < 150) {
      this.setState(
        ({ value: prevValue }) => ({ value: prevValue + 2 }),
        () => onChangeZoom(this.state.value)
      )
    }
  }

  handleZoomOut = () => {
    const { value } = this.state
    const { onChangeZoom } = this.props

    if (value > 150) {
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
          min={150}
          max={350}
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
