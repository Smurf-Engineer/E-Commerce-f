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
  LockIcon,
  MirrorButton
} from './styledComponents'
import { PositionSize } from '../../../types/common'
import mirrorButton from '../../../assets/mirrorbutton.svg'

const DECIMAL_REGEX = /\D/g

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

  changeValue = (value: number | undefined = 0, name: string) => {
    const { handleChange, activeEl } = this.props
    handleChange({ ...activeEl, [name]: value })
  }

  changeWidth = (width: number | undefined = 1) => {
    const { aspectLock } = this.state
    const { handleChange, activeEl } = this.props
    const { height: originalHeight, width: originalWidth } = activeEl
    let height = originalHeight
    if (aspectLock) {
      height = width * (height / originalWidth)
    }
    handleChange({ ...activeEl, height, width })
  }

  changeHeight = (height: number | undefined = 1) => {
    const { aspectLock } = this.state
    const { handleChange, activeEl } = this.props
    const { height: originalHeight, width: originalWidth } = activeEl
    let width = originalWidth
    if (aspectLock) {
      width = height * (width / originalHeight)
    }
    handleChange({ ...activeEl, width, height })
  }

  horizontalMirror = () => {
    const { activeEl, handleChange } = this.props
    const { width } = activeEl
    handleChange({ ...activeEl, width: width * -1 })
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
              formatter={rawValue => `${Math.round(rawValue)} px`}
              parser={value => value.replace(DECIMAL_REGEX, '')}
              precision={0}
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
              formatter={rawValue => `${Math.round(rawValue)} px`}
              parser={value => value.replace(DECIMAL_REGEX, '')}
              precision={0}
              onChange={val => this.changeValue(val, 'vertical')}
            />
          </InputBlock>
        </InputContainer>
        <InputContainer>
          <InputBlock>
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
              precision={0}
              onChange={val => this.changeValue(val, 'rotation')}
            />
          </InputBlock>
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.mirror} />
            </Subtitle>
            <MirrorButton onClick={this.horizontalMirror} src={mirrorButton} />
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
              formatter={rawValue => `${rawValue} cm`}
              parser={value => value.replace(DECIMAL_REGEX, '')}
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
              formatter={rawValue => `${rawValue} cm`}
              parser={value => value.replace(DECIMAL_REGEX, '')}
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
