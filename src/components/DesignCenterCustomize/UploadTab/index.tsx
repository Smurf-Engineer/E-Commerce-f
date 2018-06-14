/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Dragger from '../../TeamDragger'
import ImageList from '../ImageList'
import messages from './messages'
import {
  Container,
  Header,
  Title,
  DraggerContainer,
  DraggerBottom
} from './styledComponents'

interface Props {
  onApplyImage: (base64: string) => void
  formatMessage: (messageDescriptor: any) => string
}

interface State {
  file: any
  images: string[]
}

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    file: null,
    images: [] as string[]
  }
  render() {
    const { images } = this.state
    const dragger = <Dragger onSelectImage={this.beforeUpload} />
    return (
      <Container>
        <Header>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
        </Header>
        <ImageList onClickImage={this.handleOnAddImage} {...{ images }} />
        {!!images.length ? (
          <DraggerBottom>{dragger}</DraggerBottom>
        ) : (
          <DraggerContainer>{dragger}</DraggerContainer>
        )}
      </Container>
    )
  }

  handleOnAddImage = (base64: string) => {
    const { onApplyImage } = this.props
    onApplyImage(base64)
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState(({ images }: any) => ({
        images: [...images, reader.result]
      }))
    }

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  clearState = () => {
    this.setState({
      file: null,
      images: []
    })
  }
}

export default UploadTab
