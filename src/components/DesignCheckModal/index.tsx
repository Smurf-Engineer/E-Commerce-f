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
  DesignImage,
  HoursLabel
} from './styledComponents'
import CustomModal from '../Common/JakrooModal'
import ProAssistLogo from '../../assets/ProAssist-logo.svg'
import ProAssistChat from '../../assets/PROAssist-2.svg'
import designerImage from '../../assets/designer-guy.jpg'
import Spin from 'antd/lib/spin'
import { WorkHours } from '../../types/common'
import moment from 'moment'

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
    const { start, end, open } = workingHours
    const startHour = moment(start, 'HH:mm:ss').format('LT')
    const endHour = moment(end, 'HH:mm:ss').format('LT')
    const hours = `MON-FRI ${startHour} - ${endHour} (PST)`
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
                disabled={!open}
                onClick={handleGetPro}
              >
                {formatMessage(messages.talkWithDesigner)}
              </ContinueButton>
            )}
          </ModalButtonsWrapper>
          <HoursLabel>{hours}</HoursLabel>
          <StatusLabel {...{ open }}>
            {formatMessage(open ? messages.online : messages.offline)}
          </StatusLabel>
        </CustomModal>
      </Container>
    )
  }
}

export default DesignCheckModal
