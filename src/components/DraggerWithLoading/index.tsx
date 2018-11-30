/**
 * TeamDragger Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import Upload from 'antd/lib/upload'
import Spin from 'antd/lib/spin'
import uploadIcon from '../../assets/upload_white.svg'
import messages from './messages'
import { DragMessage, DragTypes, Icon, Container } from './styledComponents'

interface Props {
  loading: boolean
  extensions?: string[]
  onSelectImage: (file: any) => boolean
  className?: string
  formatMessage: (messageDescriptor: any, extensions: any) => string
}

const { Dragger } = Upload

class TeamDragger extends React.PureComponent<Props, {}> {
  static defaultProps = {
    extensions: ['.eps', '.ai', '.svg', '.tiff', '.pdf', '.jpg']
  }
  render() {
    const {
      onSelectImage,
      loading,
      className,
      formatMessage,
      extensions
    } = this.props
    return (
      <Dragger
        beforeUpload={onSelectImage}
        multiple={false}
        disabled={loading}
        showUploadList={false}
        supportServerRender={true}
        className={className}
      >
        {loading ? (
          <Container>
            <Spin />
          </Container>
        ) : (
          <div>
            <Icon src={uploadIcon} />
            <DragTypes>
              <FormattedMessage {...messages.title} />
            </DragTypes>
            <DragMessage>
              <FormattedMessage {...messages.size} />
            </DragMessage>
            <DragTypes>
              {formatMessage(messages.files, {
                extensions: map(extensions).join(' ')
              })}
            </DragTypes>
          </div>
        )}
      </Dragger>
    )
  }
}

export default TeamDragger
