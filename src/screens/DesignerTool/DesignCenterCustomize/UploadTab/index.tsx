/**
 * UploadTab Component - Created by david on 08/05/18.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import omit from 'lodash/omit'
import UploadButton from '../../../../components/UploadButton'
import { Container, Buttons, ButtonWrapper, Footer } from './styledComponents'
import { DesignConfig, UploadFile } from '../../../../types/common'
import { File, filesInfo, TOTAL_OF_FILES, MINIMUM_OF_AREAS } from './config'

const { Dragger } = Upload

interface Props {
  uploadingFiles: boolean
  uploadNewModel: boolean
  onSelectConfig: (config: DesignConfig) => void
  onUploadFiles: (files: any, areas: any) => void
  onUploadDesign: (files: any) => void
}

type FileType = {
  [extraProp: string]: UploadFile
}

interface State {
  areas: UploadFile[]
  files: FileType
}

const getFileExtension = (filename: string) =>
  filename.replace(/.*?(?:\.(\w+))?$/, '$1').toLowerCase()

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    areas: [],
    files: {}
  }

  handleUpload = () => {
    const { files, areas } = this.state
    const { onUploadFiles, uploadNewModel, onUploadDesign } = this.props

    if (uploadNewModel) {
      onUploadDesign(files)
    } else {
      onUploadFiles(files, areas)
    }

    this.setState({ areas: [] })
  }

  beforeUpload = (fileName: string, file: any, extension: string) => {
    const { type, name } = file
    const selectedFileExtension = type || getFileExtension(name)

    if (selectedFileExtension !== extension) {
      message.error(`Please select a valid ${extension} file`)
    } else {
      if (fileName === File.Config) {
        const reader = new FileReader()
        const { onSelectConfig } = this.props
        reader.onload = () => {
          try {
            const obj = JSON.parse(reader.result) || {}
            onSelectConfig(obj)
          } catch (error) {
            message.error('Please select a valid JSON file')
            return
          }
        }
        reader.readAsText(file)
      }

      this.setState(({ files }) => {
        const updatedFiles = Object.assign({ [fileName]: file }, files)
        return { files: updatedFiles }
      })
    }
  }

  beforeUploadAreas = (file: any) => {
    this.setState(({ areas }) => ({ areas: [...areas, file] }))

    return false
  }

  onRemoveArea = (file: UploadFile) => {
    this.setState(({ areas }) => {
      const index = areas.indexOf(file)
      const newFileList = areas.slice()
      newFileList.splice(index, 1)
      return {
        areas: newFileList
      }
    })
  }

  beforeUploadDesign = (file: any) => {
    const { areas: list } = this.state

    if (list.length === 0 && file.type !== 'application/json') {
      message.error('Please select a valid JSON file')
      return false
    }

    if (list.length > 0 && file.type !== 'image/svg+xml') {
      message.error('Please select a valid SVG file')
      return false
    }

    // this.setState(({ areas }) => ({ areas: [...areas, areas] }))
    return false
  }

  handleOnRemove = (fileName: string) => {
    this.setState(({ files }) => {
      const updatedFiles = omit(files, fileName)
      return { files: updatedFiles }
    })
  }

  handleReset = () => window.location.replace('/designer-tool')

  render() {
    const { files, areas } = this.state
    const { uploadingFiles, uploadNewModel } = this.props

    const filesCount = Object.keys(files).length
    const uploadDisabled =
      filesCount < TOTAL_OF_FILES || areas.length < MINIMUM_OF_AREAS
    const fileButtons = filesInfo.map(({ file, label, extension }, index) => {
      const currentFile = files[file]
      return (
        <UploadButton
          key={index}
          fileName={file}
          {...{ extension, index }}
          hasFile={!!currentFile}
          onSelectFile={this.beforeUpload}
          onRemoveFile={this.handleOnRemove}
          label={!!currentFile ? currentFile.name : label}
        />
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
              disabled={uploadDisabled}
              loading={uploadingFiles}
            >
              {uploadNewModel ? 'Upload design' : 'Upload model'}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>{fileButtons}</ButtonWrapper>
          <Dragger
            multiple={true}
            beforeUpload={this.beforeUploadAreas}
            fileList={areas}
            onRemove={this.onRemoveArea}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="upload" />
            </p>
            <p className="ant-upload-hint">
              You can drag or select multiples SVG files, named as colorblock_n.
            </p>
          </Dragger>
        </Buttons>
        <Footer>
          {uploadNewModel && (
            <ButtonWrapper>
              <Button
                ghost={true}
                size="large"
                type="primary"
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
