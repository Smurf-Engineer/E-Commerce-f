/**
 * TextEffect Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

const TextEffect = (props: Props) => {
  return (
    <Container>
      <FormattedMessage {...messages.title} />
    </Container>
  )
}

export default TextEffect
