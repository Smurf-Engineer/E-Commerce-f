/**
 * UploadTab Component - Created by david on 08/05/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import {
  Container,
  Top,
  Text,
  Buttons,
  ButtonWrapper,
  ContainerReset
} from './styledComponents'

interface Props {
  onUploadFiles: (files: any) => void
  uploadNewModel: boolean
  uploadingFiles: boolean
}

const getFileExtension = (filename: string) =>
  filename.replace(/.*?(?:\.(\w+))?$/, '$1').toLowerCase()

class UploadTab extends React.PureComponent<Props, {}> {
  state = {
    fileList: [],
    uploading: false
  }

  handleUpload = () => {
    const { fileList } = this.state
    const { onUploadFiles } = this.props

    if (fileList.length) {
      onUploadFiles(fileList)
    }
  }

  beforeUpload = (file: any) => {
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

    if (list.length > 2 && file.type !== 'image/svg+xml') {
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

    if (uploadNewModel) {
      return (
        <ContainerReset>
          <Button size="large" type="primary" onClick={this.handleReset}>
            Upload new model
          </Button>
        </ContainerReset>
      )
    }

    return (
      <Container>
        <Top>
          <Text>
            Upload your files:
            <p>1. OBJ file</p>
            <p>2. MTL file</p>
            <p>3. Bumpmap file</p>
            <p> 4. ColorBlock 5 ... 1 </p>
            <p> 5. Branding </p>
          </Text>
          <Button
            size="large"
            type="primary"
            onClick={this.handleUpload}
            disabled={!fileList.length}
            loading={uploadingFiles}
          >
            {uploadingFiles ? 'Uploading' : 'Upload'}
          </Button>
        </Top>
        <Buttons>
          <Upload
            {...{ fileList }}
            beforeUpload={this.beforeUpload}
            onRemove={this.onRemove}
          >
            <ButtonWrapper>
              <Button size="large">
                <Icon type="upload" /> Select File
              </Button>
            </ButtonWrapper>
          </Upload>
        </Buttons>
      </Container>
    )
  }
}

export default UploadTab
