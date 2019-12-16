/**
 * Themes Component - Created by eduardoquintero on 06/12/19.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import cloneDeep from 'lodash/cloneDeep'
import { getProductFromCode, updateThemesOrderMutation } from './data'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import { compose, withApollo, graphql } from 'react-apollo'
import {
  Container,
  InputContainer,
  Input,
  Header,
  Title,
  Content,
  Label,
  Button,
  MissingModelContainer
} from './styledComponents'
import {
  Message,
  QueryProps,
  Product,
  DesignItem,
  Theme
} from '../../../types/common'
import List from '../List'

interface Props {
  productCode: string
  productData: ProductData
  selectedTheme: number
  formatMessage: (messageDescriptor: Message) => string
  setProductCode: (value: string) => void
  onChangeTheme: (id: number) => void
  onEditTheme: (theme: Theme | null) => void
  onDeleteTheme: (id: number) => void
  updateThemesOrder: (variables: {}) => Promise<any>
}

interface ProductData extends QueryProps {
  product: Product
}

export class Themes extends React.Component<Props, {}> {
  state = {
    code: ''
  }
  handleOnUpdateProductCode = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ code: value })
  }
  handleOnSearch = () => {
    const { code } = this.state
    if (!!code) {
      const { setProductCode } = this.props
      setProductCode(code)
    }
  }
  handleOnEditTheme = (index: number) => {
    const { productData, onEditTheme } = this.props
    if (productData) {
      const {
        product: { themes = [] }
      } = productData
      const orderedThemes = orderBy(themes, 'itemOrder', 'asc')
      const theme = orderedThemes[index]
      onEditTheme(theme)
    }
  }
  handleAddNewTheme = (theme: Theme) => {
    const { onEditTheme } = this.props
    onEditTheme(theme)
  }
  handleAddNewModel = () => {
    // TODO: SEND TO MODEL PAGE
  }
  changeThemesPosition = async (dragIndex: number, dropIndex: number) => {
    try {
      const { updateThemesOrder, productData, productCode } = this.props
      const themes = orderBy(
        get(cloneDeep(productData), 'product.themes', []),
        'itemOrder',
        'asc'
      )

      themes.forEach(({ itemOrder }, index) => {
        if (!itemOrder && index === 0) {
          themes[index].itemOrder = 1
        }
        if (
          themes[index - 1] &&
          themes[index - 1].itemOrder !== itemOrder - 1
        ) {
          themes[index].itemOrder = themes[index - 1].itemOrder + 1
        }
      })
      const temporalTheme = cloneDeep(themes[dragIndex])
      themes[dragIndex].itemOrder = themes[dropIndex].itemOrder
      themes[dropIndex].itemOrder = temporalTheme.itemOrder
      const themesToSend = themes.map(({ id, itemOrder }) => ({
        id,
        item_order: itemOrder
      }))

      await updateThemesOrder({
        variables: { themes: themesToSend },
        update: (store: any) => {
          const storeData = store.readQuery({
            query: getProductFromCode,
            variables: { code: productCode }
          })
          storeData.product.themes = themes
          store.writeQuery({
            query: getProductFromCode,
            data: storeData
          })
        }
      })
    } catch (e) {
      message.error(e.message)
    }
  }
  render() {
    const { code } = this.state
    const {
      formatMessage,
      productData,
      onChangeTheme,
      selectedTheme,
      onDeleteTheme
    } = this.props

    const product = get(productData, 'product', false)

    let themeItems: DesignItem[] = []
    if (!!product) {
      const { themes = [] } = product
      themeItems = orderBy(
        themes.map(({ id, name, itemOrder }) => ({ id, name, itemOrder })),
        'itemOrder',
        'asc'
      )
    }
    return (
      <Container>
        <Header>
          <Title>{formatMessage(messages.addTheme)}</Title>
        </Header>
        <Content>
          <InputContainer>
            <Label>{formatMessage(messages.searchProduct)}</Label>
            <Input
              value={code}
              onChange={this.handleOnUpdateProductCode}
              onSearch={this.handleOnSearch}
              onPressEnter={this.handleOnSearch}
              enterButton="Search"
              disabled={productData && productData.loading}
            />
          </InputContainer>
          {!!product && product.obj && (
            <List
              editable={true}
              onEditItem={this.handleOnEditTheme}
              withImageInput={true}
              selectedItem={selectedTheme}
              onSelectItem={onChangeTheme}
              onDeleteItem={onDeleteTheme}
              onAddNewTheme={this.handleAddNewTheme}
              subtitle={formatMessage(messages.selectTheme)}
              buttonLabel={formatMessage(messages.addTheme)}
              items={themeItems}
              section={'theme'}
              onDropRow={this.changeThemesPosition}
              {...{
                formatMessage
              }}
            />
          )}
          {product && !product.obj && (
            <MissingModelContainer>
              <p>{formatMessage(messages.missingModel)}</p>
              <Button onClick={this.handleAddNewModel}>
                <Icon type="plus" />
                {formatMessage(messages.addModel)}
              </Button>
            </MissingModelContainer>
          )}
        </Content>
      </Container>
    )
  }
}

type OwnProps = {
  productCode?: string
}

const ThemesEnhance = compose(
  withApollo,
  graphql<ProductData>(getProductFromCode, {
    options: (ownprops: OwnProps) => {
      const { productCode } = ownprops
      return {
        variables: {
          code: productCode
        },
        skip: !productCode
      }
    },
    name: 'productData'
  }),
  updateThemesOrderMutation
)(Themes)

export default ThemesEnhance
