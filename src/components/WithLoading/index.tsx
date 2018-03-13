/**
 * Loading Apollo HOC
 */
import React from 'react'
import { branch, renderComponent } from 'recompose'
import Spin from 'antd/lib/spin'
import { Container } from './styledComponents'

const Loading = () => (
  <Container>
    <Spin />
  </Container>
)

const displayLoadingState = branch(
  ({ data: { loading } }: any) => loading,
  renderComponent(Loading)
)

export default displayLoadingState
