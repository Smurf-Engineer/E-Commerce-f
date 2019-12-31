/**
 * Themes Component - Created by eduardoquintero on 06/12/19.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import backIcon from '../../../assets/rightarrow.svg'
import {
  getProductFromCode,
  updateThemesOrderMutation,
  updateStylesOrderMutation
} from './data'
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
  MissingModelContainer,
  BackButton,
  BackIcon
} from './styledComponents'
import {
  Message,
  QueryProps,
  Product,
  DesignItem,
  Theme,
  Style,
  ModelConfig,
  DesignObject,
  ModelDesign
} from '../../../types/common'
import List from '../List'
import { THEME_PAGE, Sections } from '../constants'

const extraFiles = ['bibBrace', 'binding', 'zipper']
const areas = [
  'colorblock1',
  'colorblock2',
  'colorblock3',
  'colorblock4',
  'colorblock5'
]

interface Props {
  productCode: string
  productData: ProductData
  selectedTheme: number
  currentPage: number
  selectedDesign: number
  formatMessage: (messageDescriptor: Message) => string
  setProductCode: (value: string) => void
  onChangeTheme: (id: number, section: string) => void
  onEditTheme: (theme: Theme | null) => void
  onDeleteTheme: (id: number) => void
  updateThemesOrder: (variables: {}) => Promise<any>
  goToPage: (page: number) => void
  updateStylesOrder: (variables: {}) => Promise<any>
  toggleAddDesign: (id: number) => void
  onLoadDesign: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  onDeleteDesign: (id: number) => void
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
  handleGoToThemes = () => {
    const { goToPage } = this.props
    goToPage(THEME_PAGE)
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
  changeDesignsPosition = async (dragIndex: number, dropIndex: number) => {
    try {
      const {
        updateStylesOrder,
        productData,
        selectedTheme,
        productCode
      } = this.props
      const product = get(productData, 'product', false)

      if (!!product) {
        const { themes = [] } = product

        const currentThemeIndex = themes.findIndex(
          theme => theme.id === selectedTheme
        )

        const designs = orderBy(
          get(cloneDeep(themes[currentThemeIndex]), 'styles', []),
          'itemOrder',
          'asc'
        )

        designs.forEach(({ itemOrder }, index) => {
          if (!itemOrder && index === 0) {
            designs[index].itemOrder = 1
          }
          if (
            designs[index - 1] &&
            designs[index - 1].itemOrder !== itemOrder - 1
          ) {
            designs[index].itemOrder = designs[index - 1].itemOrder + 1
          }
        })
        const temporalDesign = cloneDeep(designs[dragIndex])
        designs[dragIndex].itemOrder = designs[dropIndex].itemOrder
        designs[dropIndex].itemOrder = temporalDesign.itemOrder
        const designsToSend = designs.map(({ id, itemOrder }) => ({
          id,
          item_order: itemOrder
        }))
        await updateStylesOrder({
          variables: { styles: designsToSend, themeId: selectedTheme },
          update: (store: any) => {
            const storeData = store.readQuery({
              query: getProductFromCode,
              variables: { code: productCode }
            })

            storeData.product.themes[currentThemeIndex].styles = designs
            store.writeQuery({
              query: getProductFromCode,
              data: storeData
            })
          }
        })
      }
    } catch (e) {
      message.error(e.message)
    }
  }
  handleOnLoadDesign = () => {
    const {
      productData,
      selectedTheme,
      selectedDesign,
      onLoadDesign
    } = this.props
    if (productData && productData.product) {
      const product = get(productData, 'product')
      const {
        obj = '',
        mtl = '',
        label = '',
        flatlock = '',
        bumpMap = '',
        themes = []
      } = product
      const themeIndex = findIndex(themes, ({ id }) => id === selectedTheme)
      const currentTheme = themes[themeIndex] || {}
      const styleIndex = findIndex(
        currentTheme.styles,
        ({ id }) => id === selectedDesign
      )
      const currentStyle = currentTheme.styles[styleIndex]
      const {
        name,
        image: styleImage,
        brandingPng,
        colors,
        size,
        colorIdeas,
        canvas
      } = currentStyle
      const areaColors: string[] = []
      const areasPng: string[] = []
      const areasSvg: string[] = []
      areas.forEach(area => areasSvg.push(currentStyle[area]))
      colors.forEach(({ color, image }) => {
        areaColors.push(color)
        areasPng.push(image)
      })
      const modelConfig: ModelConfig = {
        obj,
        mtl,
        label,
        flatlock,
        bumpMap,
        areasSvg,
        areasPng,
        size
      }
      const design = {
        name,
        colors: areaColors,
        image: styleImage,
        canvas,
        fullColors: colors,
        width: currentStyle.width,
        height: currentStyle.height,
        brandingPng
      }

      if (!size) {
        modelConfig.size = {
          width: currentStyle.width,
          height: currentStyle.height
        }
      }

      extraFiles.forEach(key => {
        const file = product[key]
        if (file) {
          modelConfig[`${key}White`] = file.white
          modelConfig[`${key}Black`] = file.black
        }
      })
      onLoadDesign(modelConfig, colorIdeas, design)
    }
  }
  handleToogleAddDesign = () => {
    const { productData, toggleAddDesign } = this.props
    const productId = get(productData, 'product.id', -1)

    toggleAddDesign(productId)
  }
  render() {
    const { code } = this.state
    const {
      formatMessage,
      productData,
      onChangeTheme,
      selectedTheme,
      onDeleteTheme,
      goToPage,
      currentPage,
      selectedDesign,
      onDeleteDesign
    } = this.props

    const product = get(productData, 'product', false)

    let themeItems: DesignItem[] = []
    let styleItems: DesignItem[] = []
    if (!!product) {
      const { themes = [] } = product
      themeItems = orderBy(
        themes.map(({ id, name, itemOrder }) => ({ id, name, itemOrder })),
        'itemOrder',
        'asc'
      )
      const currentThemeIndex = themes.findIndex(
        theme => theme.id === selectedTheme
      )
      const themeStyles = get(themes[currentThemeIndex], 'styles', [])
      styleItems = orderBy(
        themeStyles.map(({ id, name, itemOrder }: Style) => ({
          id,
          name,
          itemOrder
        })),
        'itemOrder',
        'asc'
      )
    }
    return (
      <Container>
        <Header>
          {currentPage === THEME_PAGE ? (
            <Title>{formatMessage(messages.addTheme)}</Title>
          ) : (
            <BackButton onClick={this.handleGoToThemes}>
              <BackIcon src={backIcon} />
              <Title>{formatMessage(messages.back)}</Title>
            </BackButton>
          )}
        </Header>
        <Content>
          {currentPage === THEME_PAGE && (
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
          )}
          {!!product && product.obj && (
            <List
              editable={true}
              onEditItem={this.handleOnEditTheme}
              withImageInput={true}
              selectedItem={
                currentPage === THEME_PAGE ? selectedTheme : selectedDesign
              }
              onSelectItem={onChangeTheme}
              onDeleteItem={
                currentPage === THEME_PAGE ? onDeleteTheme : onDeleteDesign
              }
              onAddNewTheme={this.handleAddNewTheme}
              subtitle={formatMessage(messages.selectTheme)}
              buttonLabel={formatMessage(
                currentPage === THEME_PAGE
                  ? messages.addTheme
                  : messages.addDesign
              )}
              items={currentPage === THEME_PAGE ? themeItems : styleItems}
              section={
                currentPage === THEME_PAGE ? Sections.Theme : Sections.Design
              }
              onDropRow={
                currentPage === THEME_PAGE
                  ? this.changeThemesPosition
                  : this.changeDesignsPosition
              }
              loadDesign={this.handleOnLoadDesign}
              toggleAddDesign={this.handleToogleAddDesign}
              {...{
                formatMessage,
                goToPage,
                currentPage,
                selectedDesign
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
  updateThemesOrderMutation,
  updateStylesOrderMutation
)(Themes)

export default ThemesEnhance
