/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Slider from 'react-rangeslider'
import messages from './messages'
// import './styles.css'
import { Container, SliderContainer } from './styledComponents'

interface Props {
  onChangeZoom: (value: any) => void
}

class ZoomSlider extends React.PureComponent<Props, {}> {
  state = {
    value: 50
  }

  handleOnChangeValue = (value: number) =>
    this.setState({ value }, () => this.props.onChangeZoom(value))

  render() {
    const { value } = this.state
    const { onChangeZoom } = this.props
    return (
      <Container>
        <Slider
          min={25}
          max={70}
          value={value}
          tooltip={false}
          orientation="vertical"
          onChange={this.handleOnChangeValue}
        />
      </Container>
      // <Container>
      //   {/* <input
      //     type="range"
      //     min={1}
      //     max={100}
      //     value={value}
      //     className="slider"
      //     onChange={this.handleOnChangeValue}
      //     id="myRange"
      //   /> */}
      //   {/* <SliderContainer>
      //     <Slider
      //       onAfterChange={onChangeZoom}
      //       min={20}
      //       max={80}
      //       vertical={true}
      //       defaultValue={50}
      //     />
      //   </SliderContainer> */}
      // </Container>
    )
  }
}

export default ZoomSlider
