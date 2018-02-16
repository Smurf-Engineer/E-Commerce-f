/**
 * Home Actions - Created by david on 08/10/17.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import message from 'antd/lib/message'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { ReducersObject } from '../../store/rootReducer'
import * as homeActions from './actions'
import Button from '../../components/Button'
import QuickView from '../../components/QuickView'
import Layout from '../../components/MainLayout'
import { Container, HomeHeader } from './styledComponents'
import { Prices } from '../../types/common'
import { ProductData } from '../../components/QuickView/mocks'
import SwipeableViews from 'react-swipeable-views'

type User = {
  id: string
  email: string
}

interface Props extends RouteComponentProps<any> {
  someKey?: string
  defaultAction: (someKey: string) => void
}

export class Home extends React.Component<Props, {}> {
  state = {
    openQuickView: false
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
    const { history } = this.props
    return (
      <Layout {...{ history }}>
        <Container>
          <Button onClick={this.onClickButton} label="Info Message" />
          <QuickView
            open={openQuickView}
            title={'THE TOUR BIKE JERSEY'}
            data={ProductData}
            handleClose={this.onCloseModal}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = ({ home }: ReducersObject) => home.toJS()

const HomeEnhance = compose(connect(mapStateToProps, { ...homeActions }))(Home)

export default HomeEnhance
