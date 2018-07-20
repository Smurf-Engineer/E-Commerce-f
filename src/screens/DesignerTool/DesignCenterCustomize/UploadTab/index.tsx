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
  Footer,
  ButtonUpload
} from './styledComponents'
import { DesignConfig } from '../../../../types/common'

const enum Extension {
  Obj = 'obj',
  Mtl = 'mtl',
  Jpg = 'jpg',
  Png = 'png',
  Config = 'application/json',
  Svg = 'image/svg+xml'
}

const enum File {
  Obj = 'obj',
  Mtl = 'mtl',
  BumpMap = 'bumpMap',
  Config = 'config',
  Flatlock = 'flatlock',
  Label = 'label',
  Branding = 'branding'
}

const filesInfo = {
  obj: 'OBJ File',
  mtl: 'MTL File',
  bumpMap: 'BumpMap',
  config: 'Config JSON',
  flatlock: 'Flatlock',
  label: 'Label',
  branding: 'Branding'
}

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
    fileList: [],
    files: {}
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

  beforeUpload = (key: string) => (file: any) => {
    const reader = new FileReader()
    const { fileList: list, files } = this.state
    const extension = getFileExtension(file.name) || ''

    if (key === File.Obj && extension !== Extension.Obj) {
      message.error('Please select a valid OBJ file')
      return false
    }

    if (key === File.Mtl && extension !== Extension.Mtl) {
      message.error('Please select a valid MTL file')
      return false
    }

    if (key === File.Config) {
      if (file.type !== Extension.Config) {
        message.error('Please select a valid JSON file')
        return false
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

    if (file.type !== Extension.Svg) {
      message.error('Please select a valid SVG file')
      return false
    }

    files[key] = file
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

  onRemove = (key: string) => (file: any) => {
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
    const { files } = this.state
    const { uploadingFiles, uploadNewModel } = this.props

    const fileNames = Object.keys(filesInfo)
    const fileButtons = fileNames.map((file, index) => {
      const hasFile = !!files[file]
      return (
        <Upload
          key={index}
          style={{ width: '100%' }}
          beforeUpload={this.beforeUpload(file)}
          onRemove={this.onRemove(file)}
        >
          <ButtonUpload>
            <Icon
              style={{
                color: hasFile ? '#49BC19' : '#5F6062',
                paddingRight: 16
              }}
              type={hasFile ? 'check-circle' : 'upload'}
            />
            {filesInfo[file]}
          </ButtonUpload>
        </Upload>
      )
    })

    return (
      <Container>
        <Buttons>
          <ButtonWrapper>
            <Button
              size="large"
              type="primary"
              onClick={this.handleUpload}
              // disabled={!(fileList.length > 4)}
              loading={uploadingFiles}
            >
              {uploadNewModel ? 'Upload design' : 'Upload model'}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>{fileButtons}</ButtonWrapper>
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
        </Footer>
      </Container>
    )
  }
}

export default UploadTab
