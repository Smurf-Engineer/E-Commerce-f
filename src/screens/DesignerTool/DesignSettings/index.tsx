/**
 * DesignSettings Component - Created by david on 12/07/18.
 */
import * as React from 'react'
import {
  Container,
  Form,
  Title,
  Subtitle,
  Input,
  Button
} from './styledComponents'
import DesignForm from '../../../components/DesignForm'
import { UploadFile } from '../../../types/common'

// TODO: Dummie data
const items = [
  'Patriotic / Arm Forces',
  'Animals',
  'Geometric',
  'Vintage/Retro'
]

interface Props {
  themeImage?: UploadFile[]
  selectedTheme: number
  selectedStyle: number
  onSelectTheme: (id: number) => void
  onSelectStyle: (id: number) => void
  onDeleteTheme: (id: number) => void
  onDeleteStyle: (id: number) => void
  onSelectImage?: (file: UploadFile) => void
  onDeleteImage?: () => void
  onSaveDesign: () => void
}

class DesignSettings extends React.PureComponent<Props, {}> {
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
      onDeleteImage,
      onSaveDesign
    } = this.props
    return (
      <Container>
        <Form>
          <Title>SEARCH PRODUCT</Title>
          <Subtitle>Product Code</Subtitle>
          <Input placeholder="Code" />
          <Button>Search</Button>
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
}

export default DesignSettings
