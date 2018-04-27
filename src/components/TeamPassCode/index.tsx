/**
 * TeamPassCode Component - Created by gustavomedina on 13/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Title,
  Text,
  StyledInput,
  ButtonWrapper,
  Button
} from './styledComponents'
import { getTeamStore } from './data'

interface Props {
  open: boolean
  teamStoreId: string
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  setPassCode: (passCode: string) => void
  getTeamStoreMutation: (variables: {}) => void
}

interface StateProps {
  passCode: string
}

export class TeamPassCode extends React.Component<Props, {}> {
  state: StateProps = {
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
    const {
      formatMessage,
      requestClose,
      setPassCode,
      teamStoreId,
      getTeamStoreMutation
    } = this.props
    const { passCode } = this.state

    if (!passCode) {
      message.error(formatMessage(messages.invalidNameMessage))
      return
    } else {
      try {
        const response = await getTeamStoreMutation({
          variables: { teamStoreId, passCode }
        })
        const data = get(response, 'data.getTeamStore', false)

        if (data) {
          if (data.id === -1) {
            message.error(formatMessage(messages.passcodeNeeded))
          } else if (data.id === -2) {
            message.error(formatMessage(messages.invalidPass))
          } else {
            setPassCode(passCode)
            requestClose()
          }
        }
      } catch (error) {
        const errorMessage =
          (error.graphQLErrors.length && error.graphQLErrors[0].message) ||
          error.message
        message.error(errorMessage)
        console.error(error)
      }
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

const TeamPassCodeEnhance = compose(getTeamStore)(TeamPassCode)
export default TeamPassCodeEnhance
