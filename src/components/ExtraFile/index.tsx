/**
 * ExtraFile Component - Created by david on 30/07/18.
 */
import * as React from 'react'
import UploadButton from '../UploadButton'
import upperFirst from 'lodash/upperFirst'
import Icon from 'antd/lib/icon'
import { Container, Label, Row } from './styledComponents'
import { UploadFile } from '../../types/common'

interface Props {
  file: string
  index: number
  extension: string
  hasBlackFile: boolean
  hasWhiteFile: boolean
  labelWhite: string
  labelBlack: string
  onRemove: () => void
  onRemoveWhiteFile: (fileName: string) => void
  onRemoveBlackFile: (fileName: string) => void
  onSelectWhiteFile: (
    fileName: string,
    file: UploadFile,
    extension: string
  ) => void
  onSelectBlackFile: (
    fileName: string,
    file: UploadFile,
    extension: string
  ) => void
}

const ExtraFile = ({
  file,
  index,
  onRemove,
  extension,
  labelWhite,
  labelBlack,
  hasBlackFile,
  hasWhiteFile,
  onSelectWhiteFile,
  onSelectBlackFile,
  onRemoveWhiteFile,
  onRemoveBlackFile
}: Props) => {
  return (
    <Container>
      <Row>
        <Label>{upperFirst(file)}</Label>
        <Icon onClick={onRemove} type="minus-circle-o" />
      </Row>
      <UploadButton
        label={labelWhite}
        hasFile={hasWhiteFile}
        {...{ extension, index }}
        fileName={file}
        onSelectFile={onSelectWhiteFile}
        onRemoveFile={onRemoveWhiteFile}
      />
      <UploadButton
        label={labelBlack}
        hasFile={hasBlackFile}
        {...{ extension, index }}
        fileName={file}
        onSelectFile={onSelectBlackFile}
        onRemoveFile={onRemoveBlackFile}
      />
    </Container>
  )
}

export default ExtraFile
