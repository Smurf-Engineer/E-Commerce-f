/**
 * Home Actions - Created by david on 08/10/17.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { compose, graphql } from 'react-apollo'
import { ReducersObject } from '../../store/rootReducer'
import { usersQuery } from './data'
import * as homeActions from './actions'
import Button from '../../components/Button'
import { Container, HomeHeader } from './styledComponents'

type User = {
  id: string
  email: string
}

interface Data {
  users: [User]
}

interface Props {
  data?: Data
  someKey?: string
  defaultAction: (someKey: string) => void
}

export class Home extends React.Component<Props, {}> {
  onClickMessage = () => {
    const { defaultAction } = this.props
    defaultAction('Some Updated value')
    message.info('JR Web test message')
  }
  render() {
    return (
      <Container>
        <Button onClick={this.onClickMessage} label="Info Message" />
      </Container>
    )
  }
}

const mapStateToProps = ({ home }: ReducersObject) => home.toJS()

const HomeEnhance = compose(
  graphql<Data>(usersQuery),
  connect(mapStateToProps, { ...homeActions })
)(Home)

export default HomeEnhance
