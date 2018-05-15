/**
 * UploadTab Component - Created by david on 08/05/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import {
  Container,
  Top,
  Text,
  Buttons,
  ButtonWrapper
} from './styledComponents'

interface Props {
  onUploadFiles: (files: any) => void
  uploadingFiles: boolean
}

class UploadTab extends React.PureComponent<Props, {}> {
  state = {
    fileList: [],
    uploading: false
  }

  handleUpload = () => {
    const { fileList } = this.state
    const { onUploadFiles } = this.props

    if (fileList.length && fileList.length <= 8) {
      onUploadFiles(fileList)
    }
  }

  beforeUpload = (file: any) => {
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

  render() {
    const { fileList } = this.state
    const { uploadingFiles } = this.props
    return (
      <Container>
        <Top>
          <Text>
            Upload your files:
            <p>1. OBJ file</p>
            <p>2. MTL file</p>
            <p>3. Bumpmap file</p>
            <p> 4. ColorBlock 1 - 5</p>
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
