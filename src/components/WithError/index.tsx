/**
 * Loading Apollo HOC
 */
import React from 'react'
import { branch, renderComponent } from 'recompose'
import { Container, Title, Message } from './styledComponents'

const Error = () => (
  <Container>
    <Title>Oops!</Title>
    <Message>Something went wrong</Message>
  </Container>
)

const displayErrorState = branch(
  ({ data: { error } }: any) => !!error,
  renderComponent(Error)
)

export default displayErrorState
