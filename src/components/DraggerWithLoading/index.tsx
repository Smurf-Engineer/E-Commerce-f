/**
 * TeamDragger Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import Spin from 'antd/lib/spin'
import uploadIcon from '../../assets/upload_white.svg'
import messages from './messages'
import { DragMessage, DragTypes, Icon, Container, StyledDragger, GalleryButton } from './styledComponents'
import { Message } from '../../types/common'

interface Props {
  loading: boolean
  extensions?: string[]
  onSelectImage: (file: any) => boolean
  className?: string
  galleryButton?: boolean
  formatMessage: (messageDescriptor: Message, extensions?: any) => string
  handleOnClickGallery: () => void
}

class TeamDragger extends React.PureComponent<Props, {}> {
  static defaultProps = {
    extensions: ['.eps', '.ai', '.svg', '.tiff', '.pdf', '.jpg']
  }
  render() {
    const {
      onSelectImage,
      loading,
      formatMessage,
      extensions,
      handleOnClickGallery,
      galleryButton = false
    } = this.props
    const onClickGallery = (event: React.MouseEvent) => {
      event.stopPropagation()
      handleOnClickGallery()
    }
    return (
      <StyledDragger
        beforeUpload={onSelectImage}
        multiple={false}
        disabled={loading}
        showUploadList={false}
        supportServerRender={true}
        gallery={galleryButton}
      >
        {loading ? (
          <Container>
            <Spin />
          </Container>
        ) : (
          <div>
            <Icon gallery={galleryButton} src={uploadIcon} />
            <DragTypes gallery={galleryButton}>
              <FormattedMessage {...messages[galleryButton ? 'titlePro' : 'title']} />
            </DragTypes>
            {!galleryButton && 
              <DragMessage gallery={false}>
                <FormattedMessage {...messages.size} />
              </DragMessage>
            }
            <DragTypes>
              {formatMessage(messages.files, {
                extensions: map(extensions).join(' ')
              })}
            </DragTypes>
            {galleryButton &&
              <DragMessage gallery={true}>
                <FormattedMessage {...messages.or} />
              </DragMessage>
            }
            {galleryButton && <GalleryButton onClick={onClickGallery}>
              {formatMessage(messages.addFromGallery)}
            </GalleryButton>}
          </div>
        )}
      </StyledDragger>
    )
  }
}

export default TeamDragger
