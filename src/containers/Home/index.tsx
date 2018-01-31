import * as React from 'react'
import gql from 'graphql-tag'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import { graphql, compose, QueryProps } from 'react-apollo'
import logo from './react.svg'
import { Container, HomeHeader } from './styledComponents'

type User = {
  id: string
  email: string
}

interface Data extends QueryProps {
  users: [User]
}

interface Props {
  data: Data
}

class Home extends React.Component<Props, {}> {
  onClickMessage = () => message.info('JR Web test message')
  render() {
    return (
      <Container>
        <Button onClick={this.onClickMessage} type="primary">
          Info Message
        </Button>
      </Container>
    )
  }
}

const usersQuery = gql`
  query GetUsers {
    users {
      id
      email
    }
  }
`
const HomeEnhance = compose(
  // someOther HOC like connect
  graphql<Data>(usersQuery)
)(Home)

export default HomeEnhance
