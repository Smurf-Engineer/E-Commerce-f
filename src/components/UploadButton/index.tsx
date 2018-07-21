/**
 * UploadButton Component - Created by david on 20/07/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import { UploadFile } from '../../types/common'
import { ButtonUpload, Container } from './styledComponents'

interface Props {
  index: number
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
  extension,
  index
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
            style={{
              color: hasFile ? '#49BC19' : '#5F6062',
              paddingRight: 16
            }}
            type={hasFile ? 'check-circle-o' : 'upload'}
          />
          {label}
        </ButtonUpload>
      </Upload>
      {hasFile && (
        <Icon
          onClick={onRemove}
          type="minus-circle-o"
          style={{ color: '#5F6062', cursor: 'pointer' }}
        />
      )}
    </Container>
  )
}

export default UploadButton
