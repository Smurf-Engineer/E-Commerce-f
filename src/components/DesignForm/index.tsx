/**
 * DesignForm Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import { Container, Title, Subtitle, Button } from './styledComponents'

interface Props {
  title: string
  subtitle: string
  buttonLabel: string
}

class DesignForm extends React.PureComponent<Props, {}> {
  render() {
    const { title, subtitle, buttonLabel } = this.props
    return (
      <Container>
        <Title>{title}</Title>
        <Button type="ghost">{buttonLabel}</Button>
        <Subtitle>{subtitle}</Subtitle>
      </Container>
    )
  }
}

export default DesignForm
