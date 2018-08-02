/**
 * StitchingColors Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

const StitchingColors = (props: Props) => {
  return (
    <Container>
      <FormattedMessage {...messages.title} />
    </Container>
  )
}

export default StitchingColors
