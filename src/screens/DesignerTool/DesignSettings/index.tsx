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
import Button from 'antd/lib/button'
import DesignForm from '../../../components/DesignForm'
import { UploadFile, DesignItem, ModelConfig } from '../../../types/common'
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
  styleName: string
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
  onUpdateThemeName: (name: string) => void
  onUpdateStyleName: (design: number, name: string) => void
  onLoadDesign: (config: ModelConfig) => void
  formatMessage: (messageDescriptor: any) => string
}

class DesignSettings extends React.PureComponent<Props, {}> {
  state = {
    code: ''
  }

  render() {
    const {
      themeImage,
      themeName,
      styleName,
      productData,
      selectedTheme,
      selectedStyle,
      onSelectTheme,
      onSelectStyle,
      onDeleteTheme,
      onDeleteStyle,
      onSelectImage,
      onDeleteImage,
      onUpdateThemeName
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
      themeItems = themes.map(({ id, name }) => ({ id, name }))
      styleItems = themeStyles.map(({ id, name }) => ({ id, name }))
    }

    return (
      <Container>
        <Form>
          <Row>
            <Title>SEARCH PRODUCT</Title>
            {productHasAllFiles &&
              !!selectedTheme &&
              !!selectedStyle && (
                <Button onClick={this.handleOnLoadDesign} type="primary">
                  LOAD DESIGN
                </Button>
              )}
          </Row>
          <InputContainer>
            <Input
              value={code}
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
                {...{ onSelectImage, themeImage, onDeleteImage }}
              />
              <DesignForm
                selectedItem={selectedStyle}
                onSelectItem={onSelectStyle}
                onDeleteItem={onDeleteStyle}
                title="THEME DESIGNS"
                subtitle="Designs"
                buttonLabel="ADD NEW DESIGN"
                itemName={styleName}
                onUpdateName={() => {}} // TODO: temp until we enable editing
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
      const { name, branding = '', brandingPng, colors, size } = currentStyle
      const areaColors: string[] = []
      const areasPng: string[] = []
      const areasSvg: string[] = []
      areas.forEach(area => areasSvg.push(currentStyle[area]))
      colors.forEach(({ color, image }) => {
        areaColors.push(color)
        areasPng.push(image)
      })
      const design = { name, colors: areaColors }
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
        design,
        size
      }
      extraFiles.forEach(key => {
        const file = product[key]
        if (file) {
          modelConfig[`${key}White`] = file.white
          modelConfig[`${key}Black`] = file.black
        }
      })
      onLoadDesign(modelConfig)
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
}

export default DesignSettings