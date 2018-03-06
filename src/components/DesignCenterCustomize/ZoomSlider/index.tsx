/**
 * ZoomSlider Component - Created by david on 05/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Slider from 'antd/lib/slider'
import messages from './messages'
import { Container, SliderContainer } from './styledComponents'

interface Props {
  onChangeZoom: (value: any) => void
}

class ZoomSlider extends React.PureComponent<Props, {}> {
  render() {
    const { onChangeZoom } = this.props
    return (
      <Container>
        <SliderContainer>
          <Slider
            onAfterChange={onChangeZoom}
            vertical={true}
            defaultValue={30}
          />
        </SliderContainer>
      </Container>
    )
  }
}

export default ZoomSlider
