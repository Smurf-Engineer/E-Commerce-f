import * as React from 'react'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import { QueryProps, compose, graphql } from 'react-apollo'
import { ReducersObject } from '../../store/rootReducer'
import { usersQuery } from './data'
import * as homeActions from './actions'
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
  someKey: string
  defaultAction: () => void
}

class Home extends React.Component<Props, {}> {
  onClickMessage = () => {
    const { defaultAction } = this.props
    defaultAction()
    message.info('JR Web test message')
  }
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

const mapStateToProps = (state: ReducersObject) => state.home.toJS()

const HomeEnhance = compose(
  graphql<Data>(usersQuery),
  connect(mapStateToProps, { ...homeActions })
)(Home)

export default HomeEnhance
