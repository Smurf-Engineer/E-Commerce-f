/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Layout from '../../components/MainLayout'
import * as shoppingCartPageActions from './actions'
import messages from './messages'
import {
  Container,
  SideBar,
  Content,
  Title,
  SummaryTitle,
  Divider,
  OrderItem,
  TotalOrderItem,
  ButtonWrapper,
  CheckoutButton
} from './styledComponents'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = () => {}

  render() {
    const { intl, history } = this.props
    // const formatMessage = intl.formatMessage
    return (
      <Layout {...{ history, intl }}>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        {/* <EmptyContainer>
          <EmptyItems>
            <EmptyTitle>
              <FormattedMessage {...messages.emptyTitle} />
            </EmptyTitle>
            <EmptyDescription>
              <FormattedMessage {...messages.emptyMessage} />
            </EmptyDescription>
            <StyledEmptyButton type="danger" onClick={this.handleClick}>
              {formatMessage(messages.browse)}
            </StyledEmptyButton>
          </EmptyItems>
        </EmptyContainer> */}
        <Container>
          <SideBar>
            <SummaryTitle>
              <FormattedMessage {...messages.summaryTitle} />
            </SummaryTitle>
            <OrderItem>
              <FormattedMessage {...messages.subtotal} />
              <div>{`USD$0`}</div>
            </OrderItem>
            <Divider />
            <OrderItem>
              <FormattedMessage {...messages.taxes} />
              <div>{`USD$0`}</div>
            </OrderItem>
            <OrderItem>
              <FormattedMessage {...messages.shipping} />
              <div>{`USD$0`}</div>
            </OrderItem>
            <Divider />
            <TotalOrderItem>
              <FormattedMessage {...messages.total} />
              <div>{`USD$0`}</div>
            </TotalOrderItem>
            <ButtonWrapper>
              <CheckoutButton type="primary" onClick={this.handleCheckout}>
                <FormattedMessage {...messages.checkout} />
              </CheckoutButton>
            </ButtonWrapper>
          </SideBar>
          <Content>
            <Container />
          </Content>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('shoppingCartPage').toJS()

const ShoppingCartPageEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...shoppingCartPageActions })
)(ShoppingCartPage)

export default ShoppingCartPageEnhance
