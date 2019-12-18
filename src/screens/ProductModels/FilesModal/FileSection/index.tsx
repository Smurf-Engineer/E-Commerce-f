import * as React from 'react'
import { Upload, Spin } from 'antd'
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
import { files, extraFiles } from '../../constants'
import { Message } from '../../../../types/common'
interface Props {
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

const FileSection = ({ formatMessage }: Props) => {
  const fileName = ''
  return (
    <Container>
      <StrongLabel>{formatMessage(messages.modelFiles)}</StrongLabel>
      {files.map(({ title, extension, key, placeholder }, index) => (
        <FileContainer active={!!fileName} key={index}>
          <Label>
            {index + 1}. {formatMessage(messages[title])}
          </Label>
          <Upload
            data={{ key }}
            accept={extension}
            listType="picture-card"
            className="avatar-uploader"
            customRequest={() => {}}
            showUploadList={false}
            beforeUpload={() => {}}
          >
            {fileName ? (
              <CenterName>
                {fileName === 'loading' ? (
                  <Spin size="small" />
                ) : (
                  <FileTag>
                    <FileName>
                      <Clip type="paper-clip" />
                      {fileName}
                    </FileName>
                    <Delete type="close" />
                  </FileTag>
                )}
              </CenterName>
            ) : (
              <PlaceHolder>{formatMessage(messages[placeholder])}</PlaceHolder>
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
                customRequest={() => {}}
                showUploadList={false}
                beforeUpload={() => {}}
              >
                {fileName ? (
                  <CenterName>
                    {fileName === 'loading' ? (
                      <Spin size="small" />
                    ) : (
                      <FileTag>
                        <FileName>
                          <Clip type="paper-clip" />
                          {fileName}
                        </FileName>
                        <Delete type="close" />
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

export default FileSection
