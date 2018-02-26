/**
 * ColorList Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

interface Props {}

const ColorList = (props: Props) => {
  return (
    <Container>
        <FormattedMessage {...messages.title} />
      </Container>
  )
}

export default ColorList