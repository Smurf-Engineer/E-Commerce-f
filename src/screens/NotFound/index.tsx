/**
 * NotFound
 */

import * as React from 'react'
import { compose } from 'react-apollo'
import { Container, Text } from './styledComponents'

interface Props {}

export class NotFound extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Text>NotFound Screen</Text>
      </Container>
    )
  }
}

export default NotFound
