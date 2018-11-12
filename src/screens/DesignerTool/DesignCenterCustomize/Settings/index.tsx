/**
 * Settings Component - Created by david on 26/07/18.
 */
import * as React from 'react'
import InspirationItem from '../InspirationColors'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import { Container, UploadWrapper, List } from './styledComponents'
import Palette from '../../../../components/DesignPalette'
import { DesignConfig, DesignObject } from '../../../../types/common'

const JSON_FILE = 'application/json'
const VALIDATION_MESSAGE = 'Please select a valid JSON file'

interface Props {
  designs: DesignConfig[]
  uploadingThumbnail: boolean
  colorIdeas: DesignObject[]
  onSelectConfig: (config: DesignConfig) => void
  onSelectPalette: (index: number) => void
  onSelectComplexity: (design: number, complexity: number) => void
  onUpdateStyleName: (design: number, name: string) => void
  onSaveThumbnail: (design: number, item: number, colors: string[]) => void
  formatMessage: (messageDescriptor: any) => string
  onEditColorIdea: (item: number) => void
}

const Settings = ({
  designs,
  onSelectPalette,
  onSelectComplexity,
  onUpdateStyleName,
  onSaveThumbnail,
  uploadingThumbnail,
  onSelectConfig,
  formatMessage,
  colorIdeas,
  onEditColorIdea
}: Props) => {
  const beforeUpload = (file: any) => {
    const { type } = file
    if (type === JSON_FILE) {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const obj = JSON.parse(reader.result) || {}
          onSelectConfig(obj)
        } catch (error) {
          message.error(VALIDATION_MESSAGE)
          return
        }
      }
      reader.readAsText(file)
    } else {
      message.error(VALIDATION_MESSAGE)
    }
    return false
  }

  const handleOnPressSave = (item: number) => {
    // TODO: HANDLE ON CHANGE COLOR
    // const colorIdea = colorIdeas[item]
    // onSaveThumbnail(item, item, colorIdea.colors)
  }

  const items = designs.map((design, index) => (
    <InspirationItem
      key={index}
      {...{
        index,
        design,
        onSelectPalette,
        onSelectComplexity,
        onUpdateStyleName,
        onSaveThumbnail,
        uploadingThumbnail,
        formatMessage
      }}
    />
  ))

  const colorIdeasList = colorIdeas.map(
    ({ name, colors, thumbnail: image }, key) => (
      <Palette
        id={key}
        {...{ key, name, colors, image, formatMessage, onEditColorIdea }}
        loading={uploadingThumbnail}
        buttonLabel="Save Thumbnail"
        onSelectPalette={handleOnPressSave}
      />
    )
  )
  return (
    <Container>
      <UploadWrapper>
        <Upload {...{ beforeUpload }}>
          <Button>
            <Icon type="plus" />
            ADD NEW JSON
          </Button>
        </Upload>
      </UploadWrapper>
      {items}
      <List>{colorIdeasList}</List>
    </Container>
  )
}

export default Settings
