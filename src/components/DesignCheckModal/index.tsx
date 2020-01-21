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
import Spin from 'antd/lib/spin'
import moment from 'moment'
import { workingHours } from '../../screens/DesignCenter/constants'

interface Props {
  visible: boolean
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
      loadingPro,
      handleGetPro
    } = this.props
    const { timeZone, start, end } = workingHours
    const currentTime = moment().utcOffset(timeZone)
    const startTime = moment(start, 'HH:mm:ss').utcOffset(timeZone, true)
    const endTime = moment(end, 'HH:mm:ss').utcOffset(timeZone, true)
    const online =
      currentTime.isBetween(startTime, endTime, 'second') &&
      currentTime.isoWeekday() < 7
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
              <Spin size="large" />
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
