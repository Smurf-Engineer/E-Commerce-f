/**
 * TextTab Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  InputContainer,
  InputBlock,
  NumberInput,
  Subtitle,
  Title,
  SmallIcon,
  LockIcon
} from './styledComponents'
import { PositionSize } from '../../../types/common'

interface Props {
  activeEl: PositionSize
  handleChange: (data: PositionSize) => void
}

interface State {
  aspectLock: boolean
}

export class PositionResize extends React.PureComponent<Props, State> {
  state = {
    aspectLock: true
  }

  changeValue = (value: number | undefined, name: string) => {
    if (!isNaN(value)) {
      const { handleChange, activeEl } = this.props
      handleChange({ ...activeEl, [name]: value })
    }
  }

  changeWidth = (value: number | undefined) => {
    if (value) {
      const { aspectLock } = this.state
      const { handleChange, activeEl } = this.props
      const { height: originalHeight, width: originalWidth } = activeEl
      let height = originalHeight
      if (aspectLock) {
        height = value * (height / originalWidth)
      }
      handleChange({ ...activeEl, height, width: value })
    }
  }

  changeHeight = (value: number | undefined) => {
    if (value) {
      const { aspectLock } = this.state
      const { handleChange, activeEl } = this.props
      const { height: originalHeight, width: originalWidth } = activeEl
      let width = originalWidth
      if (aspectLock) {
        width = value * (width / originalHeight)
      }
      handleChange({ ...activeEl, width, height: value })
    }
  }

  changeLock = () => {
    this.setState(({ aspectLock }) => ({
      aspectLock: !aspectLock
    }))
  }

  render() {
    const { aspectLock } = this.state
    const { activeEl } = this.props
    const { width, height, horizontal, vertical, rotation } = activeEl || {}
    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <InputContainer>
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.horizontal} />
              <SmallIcon type="arrows-alt" />
            </Subtitle>
            <NumberInput
              size="large"
              value={horizontal}
              formatter={rawValue => `${rawValue} px`}
              parser={value => value.replace(' px', '')}
              step={1}
              precision={1}
              onChange={val => this.changeValue(val, 'horizontal')}
            />
          </InputBlock>
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.vertical} />
              <SmallIcon invert={true} type="arrows-alt" />
            </Subtitle>
            <NumberInput
              size="large"
              value={vertical}
              formatter={rawValue => `${rawValue} px`}
              parser={value => value.replace(' px', '')}
              step={1}
              precision={1}
              onChange={val => this.changeValue(val, 'vertical')}
            />
          </InputBlock>
          <InputBlock noMargin={true} maxWidth={true}>
            <Subtitle>
              <FormattedMessage {...messages.rotation} />
            </Subtitle>
            <NumberInput
              size="large"
              value={rotation}
              min={0}
              max={360}
              formatter={rawValue => `${rawValue}º`}
              parser={value => value.replace('º', '')}
              step={0.5}
              precision={1}
              onChange={val => this.changeValue(val, 'rotation')}
            />
          </InputBlock>
        </InputContainer>
        <InputContainer>
          <InputBlock noMargin={true}>
            <Subtitle>
              <FormattedMessage {...messages.width} />
            </Subtitle>
            <NumberInput
              size="large"
              value={width}
              formatter={rawValue => `${rawValue} px`}
              parser={value => value.replace(' px', '')}
              step={0.1}
              precision={1}
              onChange={this.changeWidth}
            />
          </InputBlock>
          <LockIcon
            enabled={aspectLock}
            type={aspectLock ? 'lock' : 'unlock'}
            onClick={this.changeLock}
          />
          <InputBlock noMargin={true}>
            <Subtitle>
              <FormattedMessage {...messages.height} />
            </Subtitle>
            <NumberInput
              size="large"
              value={height}
              formatter={rawValue => `${rawValue} px`}
              parser={value => value.replace(' px', '')}
              step={0.1}
              precision={1}
              onChange={this.changeHeight}
            />
          </InputBlock>
        </InputContainer>
      </Container>
    )
  }
}

export default PositionResize
