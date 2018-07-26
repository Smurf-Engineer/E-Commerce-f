/**
 * Settings Component - Created by david on 26/07/18.
 */
import * as React from 'react'
import InspirationItem from '../InspirationColors'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import { Container, UploadWrapper } from './styledComponents'
import { DesignConfig } from '../../../../types/common'

const JSON_FILE = 'application/json'
const VALIDATION_MESSAGE = 'Please select a valid JSON file'

interface Props {
  designs: DesignConfig[]
  uploadingThumbnail: boolean
  onSelectConfig: (config: DesignConfig) => void
  onSelectPalette: (index: number) => void
  onSelectComplexity: (desing: number, complexity: number) => void
  onUpdateStyleName: (desing: number, name: string) => void
  onSaveThumbnail: (desing: number, item: number, colors: string[]) => void
}

const Settings = ({
  designs,
  onSelectPalette,
  onSelectComplexity,
  onUpdateStyleName,
  onSaveThumbnail,
  uploadingThumbnail,
  onSelectConfig
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
        uploadingThumbnail
      }}
    />
  ))
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
    </Container>
  )
}

export default Settings
