/**
 * ImageItem Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

const ImageItem = (props: Props) => {
  return (
    <Container>
      <FormattedMessage {...messages.title} />
    </Container>
  )
}

export default ImageItem
