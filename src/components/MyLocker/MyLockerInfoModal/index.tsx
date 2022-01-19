/**
 * MyLockerInfoModal
 *  Component
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  ProReviewTitle,
  OptionalLabel,
  ProDesignReviewContent,
  Paragraph
} from './styledComponents'
import CustomModal from '../../Common/JakrooModal'
import DesignCheckLogo from '../../../assets/Design-Check-Logo.svg'

interface Props {
  visible: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
}

export class MyLockerInfoModal
 extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      visible,
      requestClose,
    } = this.props

    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'684px'}
          requestClose={requestClose}
        >
          <ProReviewTitle src={DesignCheckLogo} />
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
        </CustomModal>
      </Container>
    )
  }
}

export default MyLockerInfoModal
