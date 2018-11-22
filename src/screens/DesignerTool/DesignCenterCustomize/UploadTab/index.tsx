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
import upperFirst from 'lodash/upperFirst'
import UploadButton from '../../../../components/UploadButton'
import ExtraFile from '../../../../components/ExtraFile'
import {
  Container,
  DesignContainer,
  Buttons,
  ButtonWrapper,
  Footer,
  Label,
  FileContainer,
  Row
} from './styledComponents'
import { DesignConfig, UploadFile, ClickParam } from '../../../../types/common'
import {
  ExtraFiles,
  File,
  Extension,
  filesInfo,
  optionalFiles,
  TOTAL_OF_FILES,
  MINIMUM_OF_AREAS,
  WHITE,
  BLACK
} from './config'

const { Dragger } = Upload
const { Item } = Menu

interface Props {
  uploadingFiles: boolean
  uploadNewModel: boolean
  extraFiles: string[]
  onSelectConfig: (config: DesignConfig) => void
  onUploadFiles: (files: any, areas: any, extra: any) => void
  onUploadDesign: (areas: any, config: any) => void
  onAddExtraFile: (file: string) => void
  onRemoveExtraFile: (index: number) => void
}

type FileType = {
  [extraProp: string]: UploadFile
}

interface State {
  areas: UploadFile[]
  files: FileType
  extra: ExtraFiles
  config?: UploadFile | null
}

const getFileExtension = (filename: string) =>
  filename.replace(/.*?(?:\.(\w+))?$/, '$1').toLowerCase()

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    areas: [],
    files: {},
    extra: {},
    config: null
  }

  handleUpload = () => {
    const { onUploadFiles, uploadNewModel, onUploadDesign } = this.props

    this.setState(({ files, areas, extra, config }) => {
      if (uploadNewModel) {
        onUploadDesign(areas, config)
      } else {
        onUploadFiles(files, areas, extra)
      }
      return { areas: [], config: null }
    })
  }

  beforeUpload = (fileName: string, file: any, extension: string) => {
    const { type, name } = file
    const selectedFileExtension = type || getFileExtension(name)

    if (selectedFileExtension !== extension) {
      message.error(`Please select a valid ${extension} file`)
    } else {
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
    const { files, areas, extra, config } = this.state
    const { uploadingFiles, uploadNewModel, extraFiles } = this.props

    const dragger = (
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
    )

    if (uploadNewModel) {
      const uploadEnabled = !!config && areas.length
      return (
        <DesignContainer>
          <ButtonWrapper>
            <Button
              size="large"
              type="primary"
              onClick={this.handleUpload}
              disabled={!uploadEnabled}
              loading={uploadingFiles}
            >
              {'Upload Design'}
            </Button>
          </ButtonWrapper>
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
          <UploadButton
            hasFile={!!config}
            fileName={File.Config}
            extension={Extension.Config}
            onSelectFile={this.handleOnAddDesignConfig}
            onRemoveFile={this.handleOnRemoveDesignConfig}
            label={'Config'}
          />
          {dragger}
        </DesignContainer>
      )
    }

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

    const optionals = extraFiles.map((extraFile, index) => {
      const { label, file, extension } = optionalFiles[extraFile]
      const currentFile = extra[extraFile]
      const hasFile = !!currentFile
      return extraFile === File.Flatlock ? (
        <FileContainer key={index}>
          <Row>
            <Label>{label}</Label>
            <Icon
              onClick={this.handleOnRemoveExtraFile(index)}
              type="minus-circle-o"
            />
          </Row>
          <UploadButton
            {...{ index, hasFile }}
            label={hasFile ? currentFile.name : label}
            fileName={file}
            extension={extension}
            onSelectFile={this.handleOnSelectExtraFile()}
            onRemoveFile={this.handleOnRemoveExtra()}
          />
        </FileContainer>
      ) : (
        <ExtraFile
          key={index}
          file={file}
          {...{ index }}
          extension={extension}
          hasWhiteFile={!!currentFile.white}
          hasBlackFile={!!currentFile.black}
          onRemove={this.handleOnRemoveExtraFile(index)}
          onSelectWhiteFile={this.handleOnSelectExtraFile(WHITE)}
          onSelectBlackFile={this.handleOnSelectExtraFile(BLACK)}
          onRemoveWhiteFile={this.handleOnRemoveExtra(WHITE)}
          onRemoveBlackFile={this.handleOnRemoveExtra(BLACK)}
          labelWhite={!!currentFile.white ? currentFile.white.name : WHITE}
          labelBlack={!!currentFile.black ? currentFile.black.name : BLACK}
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
              {'Upload Model'}
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>{fileButtons}</ButtonWrapper>
          <Dropdown trigger={['click']} overlay={menuFile}>
            <Label className="ant-dropdown-link">
              Add File <Icon type="plus" />
            </Label>
          </Dropdown>
          {optionals}
          {dragger}
        </Buttons>
        <Footer />
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
      this.setState(({ extra }) => {
        let updatedFiles = {}
        if (fileName === File.Flatlock) {
          updatedFiles = Object.assign({ flatlock: file }, extra)
        } else {
          updatedFiles = Object.assign({}, extra)
          updatedFiles[fileName][color] = file
        }
        return { extra: updatedFiles }
      })
    }
  }

  handleOnAddExtraFile = (e: ClickParam) => {
    const { onAddExtraFile, extraFiles } = this.props
    const { key } = e
    const hasFile = find(extraFiles, item => item === key)
    if (!!hasFile) {
      message.info(`You can only select one “${upperFirst(key)}” per 3D model.`)
    } else {
      if (key !== File.Flatlock) {
        this.setState(({ extra }) => {
          const updatedFiles = Object.assign({ [key]: {} }, extra)
          return { extra: updatedFiles }
        })
      }
      onAddExtraFile(key)
    }
  }

  handleOnRemoveExtraFile = (index: number) => () => {
    const { onRemoveExtraFile } = this.props
    onRemoveExtraFile(index)
  }

  handleOnRemoveExtra = (color = '') => (fileName: string) => {
    this.setState(({ extra }) => {
      let updatedFiles = {}
      if (fileName === File.Flatlock) {
        updatedFiles = omit(extra, fileName)
      } else {
        updatedFiles = omit(extra, `${fileName}.${color}`)
      }
      return { extra: updatedFiles }
    })
  }

  handleOnAddDesignConfig = (
    fileName: string,
    file: any,
    extension: string
  ) => {
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
        this.setState({ config: file })
      }
    }
  }

  handleOnRemoveDesignConfig = (fileName: string) =>
    this.setState({ config: null })
}

export default UploadTab
