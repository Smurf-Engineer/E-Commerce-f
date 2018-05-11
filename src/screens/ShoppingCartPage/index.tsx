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
import { Product, CartItemDetail, ItemDetailType } from '../../types/common'

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
  removeItemAction: (index: number) => void
  setLabelItemDetailAction: (
    index: number,
    detailIndex: number,
    label: string
  ) => void
  setGenderItemDetailAction: (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => void
  setSizeItemDetailAction: (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => void
  setFitItemDetailAction: (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => void
  setQuantityItemDetailAction: (
    index: number,
    detailIndex: number,
    quantity: number
  ) => void
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

  componentWillUnmount() {
    const { cart } = this.props
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (e) {
      console.error('err', e)
    }
  }

  handleAddItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number
  ) => {
    const { addItemDetailAction } = this.props
    addItemDetailAction(index)
  }

  handleRemoveItem = (event: React.MouseEvent<EventTarget>, index: number) => {
    const { removeItemAction } = this.props
    removeItemAction(index)
  }

  handledeleteItemDetail = (
    event: React.MouseEvent<EventTarget>,
    index: number,
    detailIndex: number
  ) => {
    const { deleteItemDetailAction } = this.props
    deleteItemDetailAction(index, detailIndex)
  }

  handleSetDetailLabel = (
    index: number,
    detailIndex: number,
    label: string
  ) => {
    const { setLabelItemDetailAction } = this.props
    setLabelItemDetailAction(index, detailIndex, label)
  }

  handleSetDetailGender = (
    index: number,
    detailIndex: number,
    gender: ItemDetailType
  ) => {
    const { setGenderItemDetailAction } = this.props
    setGenderItemDetailAction(index, detailIndex, gender)
  }

  handleSetDetailSize = (
    index: number,
    detailIndex: number,
    size: ItemDetailType
  ) => {
    const { setSizeItemDetailAction } = this.props
    setSizeItemDetailAction(index, detailIndex, size)
  }

  handleSetDetailFit = (
    index: number,
    detailIndex: number,
    fit: ItemDetailType
  ) => {
    const { setFitItemDetailAction } = this.props
    setFitItemDetailAction(index, detailIndex, fit)
  }

  handleSetDetailQuantity = (
    index: number,
    detailIndex: number,
    quantity: number
  ) => {
    const { setQuantityItemDetailAction } = this.props
    setQuantityItemDetailAction(index, detailIndex, quantity)
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
              itemIndex={index}
              setLabelItemDetail={this.handleSetDetailLabel}
              setDetailQuantity={this.handleSetDetailQuantity}
              setDetailFit={this.handleSetDetailFit}
              setDetailGender={this.handleSetDetailGender}
              setDetailSize={this.handleSetDetailSize}
              removeItem={this.handleRemoveItem}
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
          {!cart || cart.length < 1 ? (
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
                    disabled={true}
                    id="url"
                    placeholder={formatMessage(messages.zipCodePlaceholder)}
                    enterButton={formatMessage(messages.estimate)}
                    size="default"
                    maxLength="5"
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
                          disabled={true}
                          id="url"
                          enterButton={formatMessage(messages.apply)}
                          placeholder={formatMessage(
                            messages.promoCodePlaceholder
                          )}
                          size="default"
                          onChange={() => {}}
                        />
                      </ZipCodeInputWrapper>
                      <ZipCodeInputWrapper>
                        <ShareLinkInput
                          disabled={true}
                          id="url"
                          enterButton={formatMessage(messages.apply)}
                          placeholder={formatMessage(messages.giftPlaceholder)}
                          size="default"
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
