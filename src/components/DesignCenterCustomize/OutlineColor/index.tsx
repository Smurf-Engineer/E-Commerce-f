/**
 * OutlineColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import ColorList from '../ColorList'
import messages from './messages'
import {
  Container,
  Title,
  Row,
  Value,
  Slider,
  Header
} from './styledComponents'

const emptys = ['', '', '', '']

interface Props {
  onSelectStrokeWidth: (width: number) => void
  onSelectStrokeColor: (color: string) => void
  formatMessage: (messageDescriptor: any) => string
}

const OutlineColor = ({
  formatMessage,
  onSelectStrokeWidth,
  onSelectStrokeColor
}: Props) => {
  const marks = [
    formatMessage(messages.thin),
    ...emptys,
    formatMessage(messages.thick)
  ]
  const handleOnSelectStrokeWidth = (value: any) => onSelectStrokeWidth(value)
  return (
    <Container>
      <Header>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <Slider
          {...{ marks }}
          onChange={handleOnSelectStrokeWidth}
          defaultValue={0}
          min={0}
          max={5}
        />
      </Header>
      <ColorList onSelectColor={onSelectStrokeColor} />
    </Container>
  )
}

export default OutlineColor
