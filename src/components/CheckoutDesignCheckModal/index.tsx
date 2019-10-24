/**
 * CheckoutDesignCheckModal Component - Created by eduardoquintero on 13/09/19.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  ProReviewTitle,
  OptionalLabel,
  ProDesignReviewContent,
  ModalButtonsWrapper,
  ReviewButton,
  ContinueButton,
  Icon,
  Paragraph
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import checkBoxIcon from '../../assets/checkbox.svg'

interface Props {
  visible: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
  handleAccept: () => void
  handleContinue: () => void
}

export class CheckoutDesignCheckModal extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      visible,
      handleAccept,
      requestClose,
      handleContinue
    } = this.props

    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'684px'}
          requestClose={requestClose}
        >
          <ProReviewTitle>
            {formatMessage(messages.proDesignerReviewLabel)}
            <Icon src={checkBoxIcon} />
          </ProReviewTitle>
          <OptionalLabel>{formatMessage(messages.optionalLabel)}</OptionalLabel>
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
            <ContinueButton key="review" onClick={handleContinue}>
              {formatMessage(messages.dontReview)}
            </ContinueButton>
            <ReviewButton onClick={handleAccept}>
              {formatMessage(messages.reviewMyOrderLabel)}
            </ReviewButton>
          </ModalButtonsWrapper>
        </CustomModal>
      </Container>
    )
  }
}

export default CheckoutDesignCheckModal
