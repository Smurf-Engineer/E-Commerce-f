/**
 * DesignCheckModal Component - Created by eduardo on 07/12/18.
 */
import * as React from 'react'
import messages from './messages'
import { addDesignCheckToLocalStorage } from './thunkActions'
import {
  Container,
  Paragraph,
  ProReviewTitle,
  OptionalLabel,
  ProDesignReviewContent,
  ModalButtonsWrapper,
  ReviewButton,
  ContinueButton,
  Icon
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import checkBoxIcon from '../../assets/Checkbox.svg'

interface Props {
  visible: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
  handleActionButton: () => void
}

export class DesignCheckModal extends React.Component<Props, {}> {
  handleCancel = () => {
    const { requestClose } = this.props
    requestClose()
  }
  addDesignCheck = () => {
    addDesignCheckToLocalStorage(true)
    this.handleActionButton()
  }
  removeDesignCheck = () => {
    addDesignCheckToLocalStorage(false)
    this.handleActionButton()
  }
  handleActionButton = () => {
    const { handleActionButton } = this.props
    handleActionButton()
  }
  render() {
    const { formatMessage, visible } = this.props

    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'684px'}
          requestClose={this.handleCancel}
        >
          <ProReviewTitle>
            {formatMessage(messages.proDesignerReviewLabel)}
            <Icon src={checkBoxIcon} />
          </ProReviewTitle>
          <OptionalLabel>{` (${formatMessage(
            messages.optionalLabel
          )})`}</OptionalLabel>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.helpLabel)
            }}
          />
          <ProDesignReviewContent
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.reviewDesignModalText)
            }}
          />
          <ModalButtonsWrapper>
            <ContinueButton key="review" onClick={this.removeDesignCheck}>
              {formatMessage(messages.dontReview)}
            </ContinueButton>
            <ReviewButton onClick={this.addDesignCheck}>
              {formatMessage(messages.reviewMyOrderLabel)}
            </ReviewButton>
          </ModalButtonsWrapper>
        </CustomModal>
      </Container>
    )
  }
}

export default DesignCheckModal
