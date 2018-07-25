/**
 * DesignSettings Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import {
  Container,
  Form,
  Title,
  Input,
  InputContainer
} from './styledComponents'
import get from 'lodash/get'
import DesignForm from '../../../components/DesignForm'
import { UploadFile, DesignItem } from '../../../types/common'
import { Data } from '../DesignCenterCustomize'

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
  onUpdateStyleName: (name: string) => void
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
      onUpdateThemeName,
      onUpdateStyleName
    } = this.props
    const { code } = this.state

    const product = get(productData, 'product', false)
    let themeItems: DesignItem[] = []
    let styleItems: DesignItem[] = []

    if (!!product) {
      const { themes = [] } = product
      const currentTheme = themes[selectedTheme] || {}
      const themeStyles = currentTheme.styles || []
      themeItems = themes.map(({ id, name }) => ({ id, name }))
      styleItems = themeStyles.map(({ id, name }) => ({ id, name }))
    }

    return (
      <Container>
        <Form>
          <Title>SEARCH PRODUCT</Title>
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
                title="SELECT DESIGN"
                subtitle="Designs"
                buttonLabel="ADD NEW DESIGN"
                itemName={styleName}
                onUpdateName={onUpdateStyleName}
                items={styleItems}
              />
            </div>
          )}
        </Form>
      </Container>
    )
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
