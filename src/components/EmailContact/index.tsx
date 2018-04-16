/**
 * EmailContact Component - Created by gustavomedina on 16/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import messages from './messages'
import {
  Container,
  Title,
  Label,
  StyledInput,
  Button,
  ButtonWrapper
} from './styledComponents'
const { TextArea } = Input

interface Props {
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
  open: boolean
}

class EmailContact extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }

  render() {
    const { open, formatMessage } = this.props

    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={true}
          maskClosable={false}
          width={'60%'}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>{formatMessage(messages.title)}</Title>
          <Label>{formatMessage(messages.email)}</Label>
          <StyledInput
            id="email"
            // value={designName}
            // placeholder={formatMessage(messages.placeholder)}
            // onChange={this.handleInputChange}
          />
          <TextArea
            id="emailMessage"
            rows={7}
            // value={designName}
            // placeholder={formatMessage(messages.placeholder)}
            // onChange={this.handleInputChange}
          />
          <ButtonWrapper>
            <Button type="primary">
              <FormattedMessage {...messages.send} />
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

export default EmailContact
