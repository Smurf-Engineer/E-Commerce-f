/**
 * InfoModal Component - Created by eduardo on 28/12/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import {
  Container,
  Title,
  Text,
  ButtonWrapper,
  Button
} from './styledComponents'
import { Message } from '../../types/common'
import { BLUE } from '../../theme/colors'

interface Props {
  open: boolean
  title: Message
  text: Message
  buttonText: Message
  requestClose: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class InfoModal extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  render() {
    const { open, formatMessage, title, text, buttonText } = this.props

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'25%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>{formatMessage(title)}</Title>

          <Text>{formatMessage(text)}</Text>
          <ButtonWrapper color={BLUE}>
            <Button size="small" type="primary" onClick={this.handleCancel}>
              {formatMessage(buttonText)}
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

export default InfoModal
