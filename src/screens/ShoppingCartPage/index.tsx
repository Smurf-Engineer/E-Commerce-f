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
import * as thunkActions from './thunkActions'
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
  CodeDivider,
  CartList,
  EmptyContainer,
  EmptyItems,
  EmptyTitle,
  EmptyDescription,
  StyledEmptyButton
} from './styledComponents'
import ListItem from '../../components/CartListItem'
import { Product, CartItemDetail } from '../../types/common'

const ShareLinkInput = Input.Search
const Panel = Collapse.Panel

interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  cart: CartItems[]
  setItemsAction: (items: Product[]) => void
  addItemDetailAction: (index: number) => void
  deleteItemDetailAction: (index: number, detailIndex: number) => void
  setInitialData: () => void
}

export class ShoppingCartPage extends React.Component<Props, {}> {
  handleClick = () => {
    const { history } = this.props
    history.push('/product-catalogue')
  }

  handleCheckout = () => {}

  componentDidMount() {
    const { setInitialData } = this.props
    setInitialData()
  }

  handleAddItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number
  ) => {
    const { addItemDetailAction } = this.props
    addItemDetailAction(0)
  }

  handledeleteItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => {
    const { deleteItemDetailAction } = this.props
    deleteItemDetailAction(0, detailIndex)
  }

  render() {
    const { intl, history, cart } = this.props
    const formatMessage = intl.formatMessage

    const renderList = cart
      ? cart.map((cartItem, index) => {
          return (
            <ListItem
              formatMessage={formatMessage}
              key={index}
              title={cartItem.product.name}
              description={cartItem.product.description}
              price={cartItem.product.priceRange[0]}
              image={cartItem.product.images[0].front}
              cartItem={cartItem}
              handleAddItemDetail={this.handleAddItemDetail}
              handledeleteItemDetail={this.handledeleteItemDetail}
            />
          )
        })
      : null

    let totalSum = 0
    if (cart) {
      const total = cart.map((cartItem, index) => {
        const quantities = cartItem.itemDetails.map((itemDetail, ind) => {
          return itemDetail.quantity
        })

        const quantitySum = quantities.reduce((a, b) => a + b, 0)

        return cartItem.product.priceRange[0].price * quantitySum
      })

      totalSum = total.reduce((a, b) => a + b, 0)
    }

    return (
      <Layout {...{ history, intl }}>
        <div>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          {!cart ? (
            <EmptyContainer>
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
            </EmptyContainer>
          ) : (
            <Container>
              <SideBar>
                <SummaryTitle>
                  <FormattedMessage {...messages.summaryTitle} />
                </SummaryTitle>
                <OrderItem>
                  <FormattedMessage {...messages.subtotal} />
                  <div>{`USD$${totalSum}`}</div>
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
                    <Panel
                      header={formatMessage(messages.discountCode)}
                      key="1"
                    >
                      <ZipCodeInputWrapper>
                        <ShareLinkInput
                          id="url"
                          enterButton={formatMessage(messages.apply)}
                          placeholder={formatMessage(
                            messages.promoCodePlaceholder
                          )}
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
                <CartList>{renderList}</CartList>
              </Content>
            </Container>
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('shoppingCartPage').toJS()

const ShoppingCartPageEnhance = compose(
  injectIntl,
  connect(mapStateToProps, { ...shoppingCartPageActions, ...thunkActions })
)(ShoppingCartPage)

export default ShoppingCartPageEnhance
