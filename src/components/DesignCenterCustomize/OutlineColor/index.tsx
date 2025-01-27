/**
 * OutlineColor Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import ColorList from '../ColorList'
import messages from './messages'
import { Container, Title, Slider, Header } from './styledComponents'

interface Props {
  strokeWidth: number
  colorsList: any
  onSelectStrokeWidth: (width: number) => void
  onSelectStrokeColor: (color: string) => void
  formatMessage: (messageDescriptor: any) => string
}

const OutlineColor = ({
  formatMessage,
  onSelectStrokeWidth,
  onSelectStrokeColor,
  strokeWidth,
  colorsList
}: Props) => {
  const marks = {
    0: formatMessage(messages.thin),
    1: '',
    2: '',
    3: '',
    4: '',
    5: formatMessage(messages.thick)
  }
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
          value={strokeWidth}
          min={0}
          max={5}
        />
      </Header>
      <ColorList
        onSelectColor={onSelectStrokeColor}
        {...{ colorsList, formatMessage }}
      />
    </Container>
  )
}

export default OutlineColor
