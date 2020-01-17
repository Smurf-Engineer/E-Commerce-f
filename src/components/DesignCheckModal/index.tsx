/**
 * DesignCheckModal Component - Created by eduardo on 07/12/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Paragraph,
  ProReviewTitle,
  ProDesignReviewContent,
  ModalButtonsWrapper,
  ContinueButton,
  Icon,
  StatusLabel
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import checkBoxIcon from '../../assets/checkbox.svg'

interface Props {
  visible: boolean
  online: boolean
  loadingPro: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
  handleGetPro: () => void
}

export class DesignCheckModal extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      visible,
      requestClose,
      online,
      loadingPro,
      handleGetPro
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
            {loadingPro ? (
              <div>nigga you just asked me for my opinioonnnnndeeeuhhh</div>
            ) : (
              <ContinueButton key="review" onClick={handleGetPro}>
                {formatMessage(messages.talkWithDesigner)}
              </ContinueButton>
            )}
          </ModalButtonsWrapper>
          <StatusLabel {...{ online }}>
            {formatMessage(online ? messages.online : messages.offline)}
          </StatusLabel>
        </CustomModal>
      </Container>
    )
  }
}

export default DesignCheckModal
