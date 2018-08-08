/**
 * TeamDragger Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Upload from 'antd/lib/upload'
import uploadIcon from '../../assets/upload_white.svg'
import messages from './messages'
import { DragMessage, DragTypes, Icon } from './styledComponents'

interface Props {
  onSelectImage: (file: any) => boolean
}

const { Dragger } = Upload

class TeamDragger extends React.PureComponent<Props, {}> {
  render() {
    const { onSelectImage } = this.props
    return (
      <Dragger
        beforeUpload={onSelectImage}
        multiple={false}
        showUploadList={false}
        supportServerRender={true}
      >
        <Icon src={uploadIcon} />
        <DragTypes>
          <FormattedMessage {...messages.title} />
        </DragTypes>
        <DragMessage>
          <FormattedMessage {...messages.size} />
        </DragMessage>
        <DragTypes>
          <FormattedMessage {...messages.files} />
        </DragTypes>
      </Dragger>
    )
  }
}

export default TeamDragger
