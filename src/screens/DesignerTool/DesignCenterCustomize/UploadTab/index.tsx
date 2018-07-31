/**
 * UploadTab Component - Created by david on 08/05/18.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import Dropdown from 'antd/lib/dropdown'
import message from 'antd/lib/message'
import find from 'lodash/find'
import omit from 'lodash/omit'
import UploadButton from '../../../../components/UploadButton'
import ExtraFile from '../../../../components/ExtraFile'
import {
  Container,
  Buttons,
  ButtonWrapper,
  Footer,
  Label,
  FileContainer,
  Row
} from './styledComponents'
import { DesignConfig, UploadFile, ClickParam } from '../../../../types/common'
import {
  File,
  filesInfo,
  optionalFiles,
  TOTAL_OF_FILES,
  MINIMUM_OF_AREAS
} from './config'

const { Dragger } = Upload
const { Item } = Menu

interface Props {
  uploadingFiles: boolean
  uploadNewModel: boolean
  extraFiles: string[]
  onSelectConfig: (config: DesignConfig) => void
  onUploadFiles: (files: any, areas: any) => void
  onUploadDesign: (files: any) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
}

type FileType = {
  [extraProp: string]: UploadFile
}

type ExtraFiles = {
  flatlock?: UploadFile
  binding?: {
    white: UploadFile
    black: UploadFile
  }
  zipper?: {
    white: UploadFile
    black: UploadFile
  }
  bibBrace?: {
    white: UploadFile
    black: UploadFile
  }
}

interface State {
  areas: UploadFile[]
  files: FileType
  extraFiles: ExtraFiles
}

const getFileExtension = (filename: string) =>
  filename.replace(/.*?(?:\.(\w+))?$/, '$1').toLowerCase()

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    areas: [],
    files: {},
    extraFiles: {}
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

  handleOnRemove = (fileName: string) => {
    this.setState(({ files }) => {
      const updatedFiles = omit(files, fileName)
      return { files: updatedFiles }
    })
  }

  handleReset = () => window.location.replace('/designer-tool')

  render() {
    const { files, areas } = this.state
    const { uploadingFiles, uploadNewModel, extraFiles } = this.props

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

    const labelOptions = Object.keys(optionalFiles)
    const options = labelOptions.map(label => {
      const item = optionalFiles[label]
      return <Item key={item.file}>{item.label}</Item>
    })
    const menuFile = <Menu onClick={this.handleOnAddExtraFile}>{options}</Menu>

    const optionals = extraFiles.map((extra, index) => {
      const fileInfo = optionalFiles[extra]
      return extra === File.Flatlock ? (
        <FileContainer key={index}>
          <Row>
            <Label>{fileInfo.label}</Label>
            <Icon
              onClick={this.handleOnRemoveExtraFile(index)}
              type="minus-circle-o"
            />
          </Row>
          <UploadButton
            fileName={fileInfo.file}
            {...{ index }}
            extension={fileInfo.extension}
            hasFile={false}
            onSelectFile={this.handleOnSelectExtraFile()}
            onRemoveFile={this.handleOnRemove}
            label={fileInfo.label}
          />
        </FileContainer>
      ) : (
        <ExtraFile
          key={index}
          file={fileInfo.file}
          extension={fileInfo.extension}
          hasWhiteFile={false}
          hasBlackFile={false}
          onSelectWhiteFile={this.handleOnSelectExtraFile('white')}
          onSelectBlackFile={this.handleOnSelectExtraFile('black')}
          onRemoveWhiteFile={() => {}}
          onRemoveBlackFile={() => {}}
          onRemove={this.handleOnRemoveExtraFile(index)}
          {...{ index }}
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
          <Dropdown trigger={['click']} overlay={menuFile}>
            <Label className="ant-dropdown-link">
              Add File <Icon type="plus" />
            </Label>
          </Dropdown>
          {optionals}
          <Dragger
            multiple={true}
            beforeUpload={this.beforeUploadAreas}
            fileList={areas}
            onRemove={this.onRemoveArea}
          >
            <p className="ant-upload-hint">
              You can drag or select multiples SVG files, named as colorblock_n.
            </p>
            <p>
              <Icon type="upload" />
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

  handleOnSelectExtraFile = (color = '') => (
    fileName: string,
    file: any,
    extension: string
  ) => {
    const { type, name } = file
    const selectedFileExtension = type || getFileExtension(name)
    if (selectedFileExtension !== extension) {
      message.error(`Please select a valid ${extension} file`)
    } else {
      this.setState(({ extraFiles }) => {
        if (fileName === File.Flatlock) {
          const updatedFiles = Object.assign({ flatlock: file }, extraFiles)
          return { extraFiles: updatedFiles }
        } else {
          const updatedFiles = Object.assign({}, extraFiles)
          updatedFiles[fileName][color] = file
          return { extraFiles: updatedFiles }
        }
      })
    }
  }

  handleOnAddExtraFile = (e: ClickParam) => {
    const { onAddExtraFile, extraFiles } = this.props
    const { key } = e
    const hasFile = find(extraFiles, item => item === key)
    if (!!hasFile) {
      message.info('Already added, please select the files')
    } else {
      if (key !== File.Flatlock) {
        this.setState(({ extraFiles: files }) => {
          const updatedFiles = Object.assign({ [key]: {} }, files)
          return { extraFiles: updatedFiles }
        })
      }
      onAddExtraFile(key)
    }
  }

  handleOnRemoveExtraFile = (index: number) => () => {
    const { onRemoveExtraFile } = this.props
    onRemoveExtraFile(index)
  }
}

export default UploadTab
