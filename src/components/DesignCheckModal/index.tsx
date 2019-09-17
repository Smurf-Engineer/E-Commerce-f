/**
 * DesignCheckModal Component - Created by eduardo on 07/12/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Paragraph,
  ProReviewTitle,
  OptionalLabel,
  ProDesignReviewContent,
  ModalButtonsWrapper,
  ContinueButton,
  Icon
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import checkBoxIcon from '../../assets/checkbox.svg'

interface Props {
  visible: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
}

export class DesignCheckModal extends React.Component<Props, {}> {
  render() {
    const { formatMessage, visible, requestClose } = this.props

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
            <ContinueButton key="review" onClick={requestClose}>
              {formatMessage(messages.dontReview)}
            </ContinueButton>
          </ModalButtonsWrapper>
        </CustomModal>
      </Container>
    )
  }
}

export default DesignCheckModal
