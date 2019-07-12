/**
 * DesignSettings Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import {
  Container,
  Row,
  Form,
  Title,
  Input,
  InputContainer
} from './styledComponents'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import orderBy from 'lodash/orderBy'
import Button from 'antd/lib/button'
import DesignForm from '../../../components/DesignForm'
import {
  UploadFile,
  DesignItem,
  ModelConfig,
  DesignObject,
  ModelDesign,
  Theme
} from '../../../types/common'
import { Data } from '../DesignCenterCustomize'

const extraFiles = ['bibBrace', 'binding', 'zipper']
const areas = [
  'colorblock1',
  'colorblock2',
  'colorblock3',
  'colorblock4',
  'colorblock5'
]

interface Props {
  themeImage?: UploadFile[]
  productData?: Data
  selectedTheme: number
  selectedStyle: number
  productCode: string
  themeName: string
  designName: string
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateDesignName: (name: string) => void
  onEditTheme: (theme: Theme | null) => void
  onLoadDesign: (
    config: ModelConfig,
    colorIdeas: DesignObject[],
    design: ModelDesign
  ) => void
  formatMessage: (messageDescriptor: any) => string
  changeThemesPosition: (dragIndex: number, dropIndex: number) => void
  changeStylesPosition: (dragIndex: number, dropIndex: number) => void
}

class DesignSettings extends React.PureComponent<Props, {}> {
  state = {
    code: ''
  }
  render() {
    const {
      themeImage,
      themeName,
      productCode,
      designName,
      productData,
      selectedTheme,
      selectedStyle,
      onSelectTheme,
      onSelectStyle,
      onDeleteTheme,
      onDeleteStyle,
      onSelectImage,
      onDeleteImage,
      onUpdateThemeName,
      changeThemesPosition,
      changeStylesPosition
    } = this.props
    const { code } = this.state

    const product = get(productData, 'product', false)
    let themeItems: DesignItem[] = []
    let styleItems: DesignItem[] = []
    let productHasAllFiles = false

    if (!!product) {
      const { themes = [] } = product
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
      })
    }

    return (
      <Container>
        <Form>
          <Row>
            <Title>SEARCH PRODUCT</Title>
            {productHasAllFiles && !!selectedTheme && !!selectedStyle && (
              <Button onClick={this.handleOnLoadDesign} type="primary">
                LOAD DESIGN
              </Button>
            )}
          </Row>
          <InputContainer>
            <Input
              value={code || productCode}
              onChange={this.handleOnUpdateProductCode}
              placeholder="Product Code"
              onSearch={this.handleOnSearch}
              onPressEnter={this.handleOnSearch}
              enterButton={true}
            />
          </InputContainer>
          {!!product && (
            <div>
              <DesignForm
                editable={true}
                onEditItem={this.handleOnEditTheme}
                withImageInput={true}
                selectedItem={selectedTheme}
                onSelectItem={onSelectTheme}
                onDeleteItem={onDeleteTheme}
                title="SELECT THEME"
                subtitle="Themes"
                buttonLabel="ADD NEW THEME"
                items={themeItems}
                itemName={themeName}
                onUpdateName={onUpdateThemeName}
                onDropRow={changeThemesPosition}
                section={'theme'}
                {...{ onSelectImage, themeImage, onDeleteImage }}
              />
              <DesignForm
                selectedItem={selectedStyle}
                onSelectItem={onSelectStyle}
                onDeleteItem={onDeleteStyle}
                title="THEME DESIGNS"
                subtitle="Designs"
                buttonLabel="ADD NEW DESIGN"
                itemName={designName}
                onDropRow={changeStylesPosition}
                section={'style'}
                items={styleItems}
              />
            </div>
          )}
        </Form>
      </Container>
    )
  }

  handleOnLoadDesign = () => {
    const {
      productData,
      selectedTheme,
      selectedStyle,
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
        ({ id }) => id === selectedStyle
      )
      const currentStyle = currentTheme.styles[styleIndex]
      const {
        name,
        image: styleImage,
        branding = '',
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
        brandingSvg: branding,
        brandingPng,
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
        height: currentStyle.height
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

  handleOnSearch = () => {
    const { code } = this.state
    if (!!code) {
      const { onUpdateProductCode } = this.props
      onUpdateProductCode(code)
    }
  }

  handleOnUpdateProductCode = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ code: value })
  }

  handleOnEditTheme = (index: number) => {
    const { productData, onEditTheme } = this.props
    if (productData) {
      const {
        product: { themes = [] }
      } = productData
      const orderedThemes = orderBy(themes, 'itemOrder', 'ASC')
      const theme = orderedThemes[index]
      onEditTheme(theme)
    }
  }
}

export default DesignSettings
