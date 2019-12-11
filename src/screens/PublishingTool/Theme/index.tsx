/**
 * Theme Component - Created by eduardoquintero on 06/12/19.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import { GetProductsByCodeQuery } from './data'
import { compose, withApollo, graphql } from 'react-apollo'
import {
  Container,
  InputContainer,
  Input,
  Header,
  Title,
  Content,
  Label
} from './styledComponents'
import { Message, QueryProps, Product, DesignItem } from '../../../types/common'
import List from '../List'

interface Props {
  productCode: string
  productData: ProductData
  selectedTheme: number
  formatMessage: (messageDescriptor: Message) => string
  setProductCode: (value: string) => void
  onChangeTheme: (id: number) => void
}

interface ProductData extends QueryProps {
  product: Product
}

export class Theme extends React.Component<Props, {}> {
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
  render() {
    const { code } = this.state
    const {
      formatMessage,
      productData,
      onChangeTheme,
      selectedTheme
    } = this.props

    const product = get(productData, 'product', false)

    let themeItems: DesignItem[] = []
    // let styleItems: DesignItem[] = []
    // let productHasAllFiles = false
    if (!!product) {
      /* const { themes = [] } = product
      const themeIndex = findIndex(themes, ({ id }) => id === selectedTheme)
      const currentTheme = themes[themeIndex] || {}
      const themeStyles = currentTheme.styles || []
      const { obj, mtl, label, bumpMap } = product
      productHasAllFiles = !!obj && !!mtl && !!label && !!bumpMap
      themeItems = orderBy(
        themes.map(({ id, name, itemOrder }) => ({ id, name, itemOrder })),
        'itemOrder',
        'ASC'
      )
      styleItems = orderBy(
        themeStyles.map(({ id, name, itemOrder }) => ({
          id,
          name,
          itemOrder
        })),
        'itemOrder',
        'ASC'
      )
      styleItems.map(({ itemOrder }, index) => {
        if (!itemOrder) {
          styleItems[index].itemOrder = 1
        }
        if (
          styleItems[index - 1] &&
          styleItems[index - 1].itemOrder !== itemOrder - 1
        ) {
          styleItems[index].itemOrder = styleItems[index - 1].itemOrder + 1
        }
      }) */
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
          {!!product && (
            <List
              editable={true}
              onEditItem={this.handleOnEditTheme}
              withImageInput={true}
              selectedItem={selectedTheme}
              onSelectItem={onChangeTheme}
              onDeleteItem={this.onDeleteTheme}
              title="SELECT THEME"
              subtitle="Select a theme"
              buttonLabel={formatMessage(messages.addTheme)}
              items={themeItems}
              itemName={'Name'}
              onUpdateName={this.onUpdateThemeName}
              onDropRow={this.changeThemesPosition}
              section={'theme'}
              {...{
                onSelectImage: null,
                themeImage: '',
                onDeleteImage: null,
                formatMessage
              }}
            />
          )}
        </Content>
      </Container>
    )
  }
}

type OwnProps = {
  productCode?: string
}

const ThemeEnhance = compose(
  withApollo,
  graphql<ProductData>(GetProductsByCodeQuery, {
    options: (ownprops: OwnProps) => {
      const { productCode } = ownprops
      return {
        variables: {
          code: productCode
        },
        skip: !productCode,
        fetchPolicy: 'no-cache'
      }
    },
    name: 'productData'
  })
)(Theme)

export default ThemeEnhance
