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
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  setPassCode: (passCode: string) => void
}

// interface StateProps {
//   passCode: string
// }

class TeamPassCode extends React.Component<Props, {}> {
  state = {
    passCode: ''
  }

  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    this.setState({ passCode: value })
  }

  handleEnter = async (evt: React.MouseEvent<EventTarget>) => {
    const { formatMessage, requestClose, setPassCode } = this.props
    const { passCode } = this.state

    if (!passCode) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    } else {
      setPassCode(passCode)
      requestClose()
    }
  }

  render() {
    const { open } = this.props
    const { passCode } = this.state

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
