import * as React from 'react'
import { Container } from './styledComponents'

interface Props {
  childrens: React.ReactNode[]
  onClick?: () => void
}

class UnfoldList extends React.Component<Props, {}> {
  render() {
    const { childrens } = this.props
    return (
      <Container>
        {childrens.map((child) => child)}
      </Container>
    )
  }
}

export default UnfoldList
