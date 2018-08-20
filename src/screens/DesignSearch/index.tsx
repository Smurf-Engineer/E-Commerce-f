/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import Search from 'antd/lib/input/Search'
import Spin from 'antd/lib/spin'
import * as designSearchActions from './actions'
import messages from './messages'
import {
  Container,
  Header,
  LogoIcon,
  DesignerLink,
  Content,
  Title,
  ContentHeader,
  Subtitle,
  LoadErrContainer
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import OrderFiles from './OrderFiles'
import { OrderSearchResult } from '../../types/common'
import { orderSearchQuery } from './data'

interface Props {
  history: any
  client: any
  loading: boolean
  order?: OrderSearchResult
  notFound: boolean
  // redux actions
  resetDataAction: () => void
  setLoadingAction: () => void
  setNotFoundAction: () => void
  setOrderAction: (order: OrderSearchResult) => void
}

export class DesignSearch extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  render() {
    const { loading, notFound, order } = this.props

    let loadErrContent = <Spin />
    if (notFound) {
      loadErrContent = <FormattedMessage {...messages.notFound} />
    }
    const orderContent = order && <OrderFiles {...{ order }} />
    const content =
      loading || notFound ? (
        <LoadErrContainer>{loadErrContent}</LoadErrContainer>
      ) : (
        orderContent
      )
    return (
      <Container>
        <Header>
          <ContentHeader>
            <LogoIcon src={logo} />
            <DesignerLink onClick={this.goToDesignerTool}>
              <FormattedMessage {...messages.designerTool} />
            </DesignerLink>
          </ContentHeader>
        </Header>
        <Content>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Subtitle>
            <FormattedMessage {...messages.addCode} />
          </Subtitle>
          <Search
            placeholder="Product Code"
            onSearch={this.handleOnSearch}
            enterButton={true}
            size="large"
          />
          {content}
        </Content>
      </Container>
    )
  }

  goToDesignerTool = () => {
    const { history } = this.props
    history.push('designer-tool')
  }

  handleOnSearch = async (code: string) => {
    const {
      client: { query },
      setLoadingAction,
      setNotFoundAction,
      setOrderAction
    } = this.props

    setLoadingAction()
    try {
      const data = await query({
        query: orderSearchQuery,
        variables: { code },
        fetchPolicy: 'network-only'
      })
      setOrderAction(data.data.order)
    } catch (e) {
      setNotFoundAction()
    }
  }
}

const mapStateToProps = (state: any) => state.get('designSearch').toJS()

const DesignSearchEnhance = compose(
  connect(
    mapStateToProps,
    { ...designSearchActions }
  ),
  withApollo
)(DesignSearch)

export default DesignSearchEnhance
