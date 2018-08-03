/**
 * UploadButton Component - Created by david on 20/07/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import { UploadFile } from '../../types/common'
import { ButtonUpload, Container, Icon } from './styledComponents'

interface Props {
  index?: number
  hasFile: boolean
  fileName: string
  label: string
  extension: string
  onSelectFile: (fileName: string, file: UploadFile, extension: string) => void
  onRemoveFile: (fileName: string) => void
}

const UploadButton = ({
  hasFile,
  fileName,
  onSelectFile,
  onRemoveFile,
  label,
  extension
}: Props) => {
  const beforeUpload = (file: UploadFile) => {
    onSelectFile(fileName, file, extension)
    return false
  }
  const onRemove = () => onRemoveFile(fileName)
  return (
    <Container>
      <Upload {...{ beforeUpload }} style={{ width: '100%' }}>
        <ButtonUpload>
          <Icon
            style={{ paddingRight: 16 }}
            color={hasFile ? '#49BC19' : '#5F6062'}
            type={hasFile ? 'check-circle-o' : 'upload'}
          />
          {label}
        </ButtonUpload>
      </Upload>
      {hasFile && <Icon onClick={onRemove} type="minus-circle-o" />}
    </Container>
  )
}

export default UploadButton
