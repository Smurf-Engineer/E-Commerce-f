/**
 * TeamDragger Component - Created by david on 09/04/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import uploadIcon from '../../assets/upload_white.svg'
import { DragMessage, DragTypes, Icon, draggerStyle } from './styledComponents'

interface Props {
  onSelectImage: (file: any, image: any) => void
}

const { Dragger } = Upload

class TeamDragger extends React.PureComponent<Props, {}> {
  beforeUpload = (file: any) => {
    const { onSelectImage } = this.props
    const reader = new FileReader()

    reader.onloadend = () => onSelectImage(file, reader.result)

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  render() {
    return (
      <Dragger
        beforeUpload={this.beforeUpload}
        style={draggerStyle}
        multiple={false}
        showUploadList={false}
        supportServerRender={true}
      >
        <Icon src={uploadIcon} />
        <DragTypes>20 MB max</DragTypes>
        <DragMessage>Click or drag files to this area</DragMessage>
        <DragTypes>Files in .eps .ai .svg .tiff .pdf .jpg</DragTypes>
      </Dragger>
    )
  }
}

export default TeamDragger
