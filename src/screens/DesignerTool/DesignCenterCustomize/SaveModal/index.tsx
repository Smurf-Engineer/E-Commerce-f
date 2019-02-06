/**
 * SaveModal Component - Created by eduardo on 07/12/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  Title,
  StyledSaveAs,
  Text,
  InputWrapper,
  StyledInput,
  ButtonWrapper,
  Button
} from './styledComponents'

interface Props {
  designName: string
  uploadingThumbnail: boolean
  visible: boolean
  saveDesignLoading: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  onDesignName: (name: string) => void
  requestClose: () => void
  saveDesign: () => void
}

export class SaveModal extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }
  handleInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const { onDesignName } = this.props
    const {
      currentTarget: { value }
    } = evt
    evt.persist()
    onDesignName(value)
  }
  render() {
    const {
      formatMessage,
      designName,
      visible,
      saveDesignLoading,
      saveDesign
    } = this.props

    return (
      <Container>
        <Modal
          visible={visible}
          maskClosable={true}
          footer={null}
          destroyOnClose={true}
          onCancel={this.handleCancel}
        >
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <StyledSaveAs>
            <Text>
              <FormattedMessage {...messages.modalSaveAsNewDesign} />
            </Text>
          </StyledSaveAs>
          <InputWrapper>
            <StyledInput
              id="saveDesignName"
              value={designName}
              placeholder={formatMessage(messages.placeholder)}
              onChange={this.handleInputChange}
              maxLength={15}
            />
          </InputWrapper>
          <ButtonWrapper color="">
            <Button
              type="ghost"
              disabled={!designName || saveDesignLoading}
              onClick={saveDesign}
              loading={saveDesignLoading}
            >
              {formatMessage(messages.saveChanges)}
            </Button>
          </ButtonWrapper>
        </Modal>
      </Container>
    )
  }
}

export default SaveModal
