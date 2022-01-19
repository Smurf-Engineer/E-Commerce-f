/**
 * MyLockerInfoModal
 *  Component
 */
import * as React from 'react'
import { Modal } from 'antd'
import messages from './messages'
import {
  Title,
  SubTitle,
  Container,
  IconTitle,
  Content,
  CloseButton,
  ButtonContainer,
} from './styledComponents'
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
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 1023px)').matches

    return (
      <Container>
        <Modal
          closable={!isMobile}
          visible={visible}
          footer={null}
          onCancel={requestClose}
          width={isMobile ? '100%' : '1024px'}
          wrapClassName={isMobile ? 'transparentMask' : 'horizontal-padding'}
          maskStyle={
            isMobile
              ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' }
              : {}
          }
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
          <IconTitle src={DesignCheckLogo} height="24px" />
          <Content
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.designCheckInfo),
            }}
          />
          {isMobile && (
            <ButtonContainer>
              <CloseButton onClick={requestClose}>Close</CloseButton>
            </ButtonContainer>
          )}
        </Modal>
      </Container>
    )
  }
}

export default MyLockerInfoModal
