/**
 * MyLockerInfoModal
 *  Component
 */
import * as React from 'react'
import messages from './messages'
import {
  Title,
  SubTitle,
  Container,
  IconTitle,
  Content,
} from './styledComponents'
import CustomModal from '../../Common/JakrooModal'
import DesignCheckLogo from '../../../assets/Design-Check-Logo.svg'
import ProAssistLogo from '../../../assets/Pro-Assist-Logo.svg'

interface Props {
  visible: boolean
  formatMessage: (messageDescriptor: any, values?: {}) => string
  requestClose: () => void
}

export class MyLockerInfoModal extends React.Component<Props, {}> {
  render() {
    const { formatMessage, visible, requestClose } = this.props
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          requestClose={requestClose}
          width={isMobile ? '100%' : '768px'}
          wrapClassName={isMobile ? 'transparentMask' : 'horizontal-padding'}
          maskStyle={isMobile ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' } : {}}
        >
          <Title
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.title),
            }}
          />
          <SubTitle
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.subTitle),
            }}
          />
          <IconTitle src={ProAssistLogo} height="32px" />
          <Content
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.proAssistInfo),
            }}
          />
          <IconTitle src={DesignCheckLogo} />
          <Content
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.designCheckInfo),
            }}
          />
        </CustomModal>
      </Container>
    )
  }
}

export default MyLockerInfoModal
