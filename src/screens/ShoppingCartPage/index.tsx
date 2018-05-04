/**
 * ShoppingCartPage Screen - Created by gustavomedina on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl, FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Input from 'antd/lib/input'
import Collapse from 'antd/lib/collapse'
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
  CheckoutButton,
  ZipCodeInputWrapper,
  CollapseWrapper,
  CodeDivider
} from './styledComponents'

const ShareLinkInput = Input.Search
const Panel = Collapse.Panel

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
    const formatMessage = intl.formatMessage
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
            <ZipCodeInputWrapper>
              <ShareLinkInput
                id="url"
                placeholder={formatMessage(messages.zipCodePlaceholder)}
                enterButton={formatMessage(messages.estimate)}
                size="default"
                maxLength="5"
                // value={designURL}
                // onSearch={this.copyToClipboard}
                onChange={() => {}}
              />
            </ZipCodeInputWrapper>
            <CodeDivider />
            <CollapseWrapper>
              <Collapse bordered={false}>
                <Panel header={formatMessage(messages.discountCode)} key="1">
                  <ZipCodeInputWrapper>
                    <ShareLinkInput
                      id="url"
                      enterButton={formatMessage(messages.apply)}
                      placeholder={formatMessage(messages.promoCodePlaceholder)}
                      size="default"
                      // value={designURL}
                      // onSearch={this.copyToClipboard}
                      onChange={() => {}}
                    />
                  </ZipCodeInputWrapper>
                  <ZipCodeInputWrapper>
                    <ShareLinkInput
                      id="url"
                      enterButton={formatMessage(messages.apply)}
                      placeholder={formatMessage(messages.giftPlaceholder)}
                      size="default"
                      // value={designURL}
                      // onSearch={this.copyToClipboard}
                      onChange={() => {}}
                    />
                  </ZipCodeInputWrapper>
                </Panel>
              </Collapse>
            </CollapseWrapper>
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
