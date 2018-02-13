/**
 * Home Actions - Created by david on 08/10/17.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { compose, graphql } from 'react-apollo'
import { QueryProps } from '../../types/common'
import { ReducersObject } from '../../store/rootReducer'
import { usersQuery } from './data'
import * as homeActions from './actions'
import Button from '../../components/Button'
import QuickView from '../../components/QuickView'
import { Container, HomeHeader } from './styledComponents'
import { Prices } from '../../types/common'
import { ProductData } from '../../components/QuickView/mocks'
import SwipeableViews from 'react-swipeable-views'

type User = {
  id: string
  email: string
}

interface Data extends QueryProps {
  users: [User]
}

interface Props {
  data?: Data
  someKey?: string
  defaultAction: (someKey: string) => void
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false
  }
  onClickMessage = () => {
    const { defaultAction, data } = this.props
    defaultAction('Some Updated value')
    message.info('JR Web test message')
  }

  onClickButton = () => {
    const { openQuickView } = this.state
    this.setState({ openQuickView: !openQuickView })
  }

  onCloseModal = () => {
    this.setState({ openQuickView: false })
  }

  render() {
    const { openQuickView } = this.state
    return (
      <Container>
        <Button onClick={this.onClickMessage} label="Info Message" />
        <Button onClick={this.onClickButton} label="Info Message" />
        <QuickView
          open={openQuickView}
          title={'THE TOUR BIKE JERSEY'}
          data={ProductData}
          handleClose={this.onCloseModal}
        />
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
