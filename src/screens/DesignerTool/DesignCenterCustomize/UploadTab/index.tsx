/**
 * UploadTab Component - Created by david on 08/05/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Collapse from 'antd/lib/collapse'
import message from 'antd/lib/message'
import {
  Container,
  Text,
  Buttons,
  ButtonWrapper,
  Footer
} from './styledComponents'
import { DesignConfig } from '../../../../types/common'

const { Panel } = Collapse

interface Props {
  onSelectConfig: (config: DesignConfig) => void
  onUploadFiles: (files: any) => void
  onUploadDesign: (files: any) => void
  uploadNewModel: boolean
  uploadingFiles: boolean
}

const getFileExtension = (filename: string) =>
  filename.replace(/.*?(?:\.(\w+))?$/, '$1').toLowerCase()

class UploadTab extends React.PureComponent<Props, {}> {
  state = {
    fileList: []
  }

  handleUpload = () => {
    const { fileList } = this.state
    const { onUploadFiles, uploadNewModel, onUploadDesign } = this.props

    if (uploadNewModel) {
      onUploadDesign(fileList)
    } else {
      onUploadFiles(fileList)
    }

    this.setState({ fileList: [] })
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()
    const { fileList: list } = this.state
    const extension = getFileExtension(file.name) || ''

    if (list.length === 0 && extension !== 'obj') {
      message.error('Please select a valid OBJ file')
      return false
    }

    if (list.length === 1 && extension !== 'mtl') {
      message.error('Please select a valid MTL file')
      return false
    }

    if (list.length === 3) {
      if (file.type !== 'application/json') {
        message.error('Please select a valid JSON file')
      } else {
        try {
          const { onSelectConfig } = this.props
          reader.onload = (e: Event) => {
            const obj = JSON.parse(reader.result) || {}
            onSelectConfig(obj)
          }
          reader.readAsText(file)
        } catch (error) {
          message.error('Please select a valid JSON file')
          return false
        }
      }
    }

    if (list.length > 3 && file.type !== 'image/svg+xml') {
      message.error('Please select a valid SVG file')
      return false
    }

    this.setState(({ fileList }: any) => ({ fileList: [...fileList, file] }))
    return false
  }

  beforeUploadDesign = (file: any) => {
    const { fileList: list } = this.state

    if (list.length === 0 && file.type !== 'application/json') {
      message.error('Please select a valid JSON file')
      return false
    }

    if (list.length > 0 && file.type !== 'image/svg+xml') {
      message.error('Please select a valid SVG file')
      return false
    }

    this.setState(({ fileList }: any) => ({ fileList: [...fileList, file] }))
    return false
  }

  onRemove = (file: any) => {
    this.setState(({ fileList }: any) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      return {
        fileList: newFileList
      }
    })
  }

  handleReset = () => window.location.replace('/designer-tool')

  render() {
    const { fileList } = this.state
    const { uploadingFiles, uploadNewModel } = this.props

    return (
      <Container>
        <Collapse>
          <Panel header="Help" key="1">
            {uploadNewModel ? (
              <Text>
                <p> 1. Config file (JSON) </p>
                <p> 2. Branding </p>
                <p> 3. Color Blocks </p>
              </Text>
            ) : (
              <Text>
                <p>1. OBJ file</p>
                <p>2. MTL file</p>
                <p>3. Bumpmap file</p>
                <p> 4. Config file (JSON) </p>
                <p> 5. Branding </p>
                <p> 6. Color Blocks </p>
              </Text>
            )}
          </Panel>
        </Collapse>
        <Buttons>
          <ButtonWrapper>
            <Upload
              {...{ fileList }}
              style={{ width: '100%' }}
              beforeUpload={
                uploadNewModel ? this.beforeUploadDesign : this.beforeUpload
              }
              onRemove={this.onRemove}
            >
              <Button size="large" type="primary">
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
          </ButtonWrapper>
        </Buttons>
        <Footer>
          {uploadNewModel && (
            <ButtonWrapper>
              <Button
                size="large"
                type="primary"
                ghost={true}
                onClick={this.handleReset}
              >
                Upload new model
              </Button>
            </ButtonWrapper>
          )}
          <ButtonWrapper>
            <Button
              size="large"
              type="primary"
              onClick={this.handleUpload}
              disabled={!(fileList.length > 4)}
              loading={uploadingFiles}
            >
              {uploadNewModel ? 'Upload design' : 'Upload model'}
            </Button>
          </ButtonWrapper>
        </Footer>
      </Container>
    )
  }
}

export default UploadTab
