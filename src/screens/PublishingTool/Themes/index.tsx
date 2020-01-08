/**
 * Themes Component - Created by eduardoquintero on 06/12/19.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import { getProductFromCode } from './data'
import Icon from 'antd/lib/icon'
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
  render() {
    const { code } = this.state
    const {
      formatMessage,
      productData,
      onChangeTheme,
      selectedTheme,
      onDeleteTheme
    } = this.props

    const product = get(productData, 'product', {})

    const { themes = [] } = product
    const themeItems = orderBy(
      themes.map(({ id, name, itemOrder }: DesignItem) => ({
        id,
        name,
        itemOrder
      })),
      'itemOrder',
      'asc'
    )

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
          {!!product && product.obj ? (
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
              {...{
                formatMessage
              }}
            />
          ) : (
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
  })
)(Themes)

export default ThemesEnhance
