/**
 * ColorTab Component - Created by Jesús Apodaca on 04/12/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import indexOf from 'lodash/indexOf'
import Button from 'antd/lib/button'
import { getFileExtension } from '../../../utils/utilsFiles'
import DraggerWithLoading from '../../../components/DraggerWithLoading'

import messages from './messages'
import { COLORS, STITCHING_COLORS, ALLOWED_EXTENSIONS } from './constants'

import {
  Container,
  TextColors,
  Top,
  ButtonContainer,
  Icon,
  DraggerContainer
} from './styledComponents'
import {
  Message,
  Color,
  UploadFile,
  QueryProps,
  Colors
} from '../../../types/common'
import ColorList from '../../../components/DesignCenterCustomize/ColorList'

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props {
  colorsList: ColorsData
  colors: Color[]
  stitchingColors: Color[]
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  formatMessage: (messageDescriptor: Message) => string
  onUploadFile: (file: UploadFile, code: string) => void
}

class ColorTab extends React.PureComponent<Props> {
  render() {
    const {
      formatMessage,
      colorsList,
      stitchingColors,
      colors,
      uploadingColors,
      uploadingStitchingColors
    } = this.props

    return (
      <Container>
        <Top>
          <TextColors>
            <FormattedMessage {...messages.baseColors} />
          </TextColors>
        </Top>
        <ColorList
          stitching={false}
          wide={true}
          {...{ colors, formatMessage, colorsList }}
        />
        <DraggerContainer>
          <DraggerWithLoading
            className="upload"
            loading={uploadingColors}
            onSelectImage={this.beforeUploadColors}
            formatMessage={formatMessage}
            extensions={ALLOWED_EXTENSIONS}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
        </DraggerContainer>
        <Top>
          <TextColors>
            <FormattedMessage {...messages.stitchingColors} />
          </TextColors>
        </Top>
        <ColorList
          stitching={true}
          wide={true}
          colors={stitchingColors}
          {...{ colorsList, formatMessage }}
        />
        <DraggerContainer>
          <DraggerWithLoading
            className="upload"
            loading={uploadingStitchingColors}
            onSelectImage={this.beforeUploadStitchingColors}
            formatMessage={formatMessage}
            extensions={ALLOWED_EXTENSIONS}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
        </DraggerContainer>
      </Container>
    )
  }

  beforeUploadColors = (file: UploadFile) => {
    return this.beforeUpload(file, COLORS)
  }
  beforeUploadStitchingColors = (file: UploadFile) => {
    return this.beforeUpload(file, STITCHING_COLORS)
  }
  beforeUpload = (file: UploadFile, type: string) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.fileSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (
        indexOf(ALLOWED_EXTENSIONS, (fileExtension as String).toLowerCase()) ===
        -1
      ) {
        message.error(formatMessage(messages.fileExtensionError))
        return false
      }
      onUploadFile(file, type)
    }
    return false
  }
}

export default ColorTab
