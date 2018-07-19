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
import DesignForm from '../../../components/DesignForm'
import { UploadFile } from '../../../types/common'
import { Data } from '../DesignCenterCustomize'

// TODO: Dummie data
const items = [
  'Patriotic / Arm Forces',
  'Animals',
  'Geometric',
  'Vintage/Retro'
]

interface Props {
  themeImage?: UploadFile[]
  productData?: Data
  selectedTheme: number
  selectedStyle: number
  productCode: string
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSaveDesign: () => void
  onUpdateProductCode: (code: string) => void
}

class DesignSettings extends React.PureComponent<Props, {}> {
  state = {
    code: ''
  }

  render() {
    const {
      themeImage,
      selectedTheme,
      selectedStyle,
      onSelectTheme,
      onSelectStyle,
      onDeleteTheme,
      onDeleteStyle,
      onSelectImage,
      onDeleteImage
    } = this.props
    const { code } = this.state

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
          <DesignForm
            isNewItem={true}
            withImageInput={true}
            selectedItem={selectedTheme}
            onSelectItem={onSelectTheme}
            onDeleteItem={onDeleteTheme}
            title="SELECT THEME"
            subtitle="Themes"
            buttonLabel="ADD NEW THEME"
            {...{ items, onSelectImage, themeImage, onDeleteImage }}
          />
          <DesignForm
            isNewItem={true}
            selectedItem={selectedStyle}
            onSelectItem={onSelectStyle}
            onDeleteItem={onDeleteStyle}
            title="SELECT STYLE"
            subtitle="Styles"
            buttonLabel="ADD NEW STYLE"
            {...{ items }}
          />
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
    const { currentTarget: { value } } = evt
    this.setState({ code: value })
  }
}

export default DesignSettings
