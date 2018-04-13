/**
 * TeamPassCode Component - Created by gustavomedina on 13/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import messages from './messages'
import {
  Container,
  Title,
  Text,
  StyledInput,
  ButtonWrapper,
  Button
} from './styledComponents'

interface Props {
  open: boolean
  passCode: string
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  setPassCode: (passCode: string) => void
  handleIngressPassCode: () => void
}

class TeamPassCode extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { setPassCode } = this.props
    const { currentTarget: { value } } = evt
    evt.persist()
    setPassCode(value)
  }

  handleEnter = async (evt: React.MouseEvent<EventTarget>) => {
    const { formatMessage, passCode, handleIngressPassCode } = this.props

    if (!passCode) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    } else {
      handleIngressPassCode()
    }
  }

  render() {
    const { open, passCode } = this.props
    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          maskClosable={true}
          width={'30%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>
            <FormattedMessage {...messages.modalTitle} />
          </Title>
          <Text>
            <FormattedMessage {...messages.modalText} />
          </Text>
          <StyledInput
            type="Password"
            id="saveDesignName"
            value={passCode}
            onChange={this.handleInputChange}
          />
          <ButtonWrapper>
            <Button type="primary" onClick={this.handleEnter}>
              <FormattedMessage {...messages.save} />
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

export default TeamPassCode
