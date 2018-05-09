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

interface Props {}

class UploadTab extends React.PureComponent<Props, {}> {
  state = {
    fileList: [],
    uploading: false
  }

  handleUpload = () => {}

  beforeUpload = (file: any) => {
    console.log('---------------------------')
    console.log(file)
    console.log('---------------------------')
    this.setState(({ fileList }: any) => ({
      fileList: [...fileList, file]
    }))
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
    const { fileList, uploading } = this.state
    return (
      <Container>
        <Top>
          <Text>Upload OBJ, MTL and Texture files</Text>
          <Button
            size="small"
            type="primary"
            onClick={this.handleUpload}
            disabled={!fileList.length}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Upload'}
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
