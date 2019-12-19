import * as React from 'react'
import { Upload, Spin } from 'antd'
import message from 'antd/lib/message'
import {
  Container,
  StrongLabel,
  FileContainer,
  Label,
  CenterName,
  FileTag,
  FileName,
  Clip,
  Delete,
  PlaceHolder,
  ExtraFile,
  ExtraFileSection
} from './styledComponents'
import messages from '../messages'
import { files, extraFiles, validModels } from '../../constants'
import { Message, ModelVariant } from '../../../../types/common'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import indexOf from 'lodash/indexOf'
import { getFileWithExtension } from '../../../../utils/utilsFiles'
interface Props {
  tempModel: ModelVariant
  setFileAction: (key: string, url: string) => void
  uploadFile: (file: File, key: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class FileSection extends React.Component<Props, {}> {
  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }
  beforeUpload = (file: File) => {
    const { name } = file
    const fileExtension = this.getFileExtension(name)
    const isValidType =
      indexOf(validModels, (fileExtension as String).toLowerCase()) !== -1
    if (!isValidType) {
      message.error('You can only upload SVG/PNG/JPEG/JPG file!')
    }
    return isValidType
  }
  handleUploadFile = async (event: any) => {
    const {
      file,
      data: { key }
    } = event
    const { uploadFile } = this.props
    uploadFile(file, key)
  }
  handleRemove = (key: string) => () => {
    const { setFileAction } = this.props
    setFileAction(key, '')
  }
  render() {
    const { formatMessage, tempModel } = this.props
    return (
      <Container>
        <StrongLabel>{formatMessage(messages.modelFiles)}</StrongLabel>
        {files.map(({ title, extension, key, placeholder }, index) => (
          <FileContainer active={!!tempModel[key]} key={index}>
            <Label>
              {index + 1}. {formatMessage(messages[title])}
            </Label>
            <Upload
              data={{ key }}
              accept={extension}
              listType="picture-card"
              className="avatar-uploader"
              customRequest={this.handleUploadFile}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
            >
              {tempModel[key] ? (
                <CenterName>
                  {tempModel[key] === 'loading' ? (
                    <Spin size="small" />
                  ) : (
                    <FileTag>
                      <FileName>
                        <Clip type="paper-clip" />
                        {getFileWithExtension(tempModel[key])}
                      </FileName>
                      <Delete onClick={this.handleRemove(key)} type="close" />
                    </FileTag>
                  )}
                </CenterName>
              ) : (
                <PlaceHolder>
                  {formatMessage(messages[placeholder])}
                </PlaceHolder>
              )}
            </Upload>
          </FileContainer>
        ))}
        <StrongLabel>{formatMessage(messages.extraFiles)}</StrongLabel>
        <ExtraFileSection bordered={false}>
          {extraFiles.map(({ title, options }, index) => (
            <ExtraFile header={formatMessage(messages[title])} key={index}>
              {options.map(({ key, extension }) => (
                <Upload
                  data={{ key }}
                  accept={extension}
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={this.handleUploadFile}
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                >
                  {tempModel[key] ? (
                    <CenterName>
                      {tempModel[key] === 'loading' ? (
                        <Spin size="small" />
                      ) : (
                        <FileTag>
                          <FileName>
                            <Clip type="paper-clip" />
                            {getFileWithExtension(tempModel[key])}
                          </FileName>
                          <Delete
                            onClick={this.handleRemove(key)}
                            type="close"
                          />
                        </FileTag>
                      )}
                    </CenterName>
                  ) : (
                    <PlaceHolder>{formatMessage(messages[key])}</PlaceHolder>
                  )}
                </Upload>
              ))}
            </ExtraFile>
          ))}
        </ExtraFileSection>
      </Container>
    )
  }
}
export default FileSection
