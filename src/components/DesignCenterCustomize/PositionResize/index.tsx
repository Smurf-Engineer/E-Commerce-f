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

interface Props {
  text?: string
  value: number
  handleChange: (value: number) => void
}

export class PositionResize extends React.PureComponent<Props, {}> {
  render() {
    const { data, handleChange } = this.props
    const { width, height, horizontal, vertical, rotation } = data
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
              value={horizontal}
              formatter={rawValue => `${rawValue} px`}
              parser={valueParse => valueParse && valueParse.replace('-', '-0')}
              min={-20}
              max={100}
              step={1}
              onChange={handleChange}
            />
          </InputBlock>
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.vertical} />
              <SmallIcon invert={true} type="arrows-alt" />
            </Subtitle>
            <NumberInput
              value={vertical}
              formatter={rawValue => `${rawValue} px`}
              parser={valueParse => valueParse && valueParse.replace('-', '-0')}
              min={-20}
              max={100}
              step={1}
              onChange={handleChange}
            />
          </InputBlock>
          <InputBlock maxWidth={true}>
            <Subtitle>
              <FormattedMessage {...messages.rotation} />
            </Subtitle>
            <NumberInput
              value={rotation}
              formatter={rawValue => `${rawValue}º`}
              parser={valueParse => valueParse && valueParse.replace('-', '-0')}
              min={-20}
              max={100}
              step={1}
              onChange={handleChange}
            />
          </InputBlock>
        </InputContainer>
        <InputContainer alignStart={true}>
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.width} />
            </Subtitle>
            <NumberInput
              value={width}
              formatter={rawValue => `${rawValue} px`}
              parser={valueParse => valueParse && valueParse.replace('-', '-0')}
              min={-20}
              max={100}
              step={1}
              onChange={handleChange}
            />
          </InputBlock>
          <LockIcon enabled={true} type="lock" />
          <InputBlock>
            <Subtitle>
              <FormattedMessage {...messages.height} />
            </Subtitle>
            <NumberInput
              value={height}
              formatter={rawValue => `${rawValue} px`}
              parser={valueParse => valueParse && valueParse.replace('-', '-0')}
              min={-20}
              max={100}
              step={1}
              onChange={handleChange}
            />
          </InputBlock>
        </InputContainer>
      </Container>
    )
  }
}

export default PositionResize
