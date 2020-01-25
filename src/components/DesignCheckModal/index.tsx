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
  StatusLabel,
  RightTitle,
  Content,
  DesignImage
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import ProAssistLogo from '../../assets/ProAssist-logo.svg'
import ProAssistChat from '../../assets/PROAssist-2.svg'
import designerImage from '../../assets/designer-guy.jpg'
import Spin from 'antd/lib/spin'
import { isWorkingHour } from '../../utils/utilsFunctions'
import { WorkHours } from '../../types/common'

interface Props {
  visible: boolean
  loadingPro: boolean
  workingHours: WorkHours
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
      loadingPro,
      workingHours,
      handleGetPro
    } = this.props
    const online = isWorkingHour(workingHours)
    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'828px'}
          requestClose={requestClose}
        >
          <ProReviewTitle>
            <Icon src={ProAssistLogo} />
            <RightTitle>
              <Icon src={ProAssistChat} />
              {formatMessage(messages.proDesignerReviewLabel)}
            </RightTitle>
          </ProReviewTitle>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.helpLabel)
            }}
          />
          <Content>
            <DesignImage src={designerImage} />
            <ProDesignReviewContent
              dangerouslySetInnerHTML={{
                __html: formatMessage(messages.reviewDesignModalText)
              }}
            />
          </Content>

          <ModalButtonsWrapper>
            {loadingPro ? (
              <Spin size="large" />
            ) : (
              <ContinueButton
                key="review"
                disabled={!online}
                onClick={handleGetPro}
              >
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
