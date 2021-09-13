/**
 * ShareDesignModal Component - Created by cazarez on 21/03/18.
 */
import * as React from 'react'
import Input from 'antd/lib/input'
// TODO: commented to hide share by mail Form
// import Button from 'antd/lib/button'
import messages from './messages'
import {
  Container,
  ShareLinkRow,
  Title,
  Asterisk,
  ShareInputWrapper,
  ShareLinkContainer,
  ShareSocialMediaContainer,
  IconsRow,
  // TODO: commented to hide share by mail Form
  // ShareByMailRow,
  FacebookIconImg,
  TwitterIconImg
  // TODO: commented to hide share by mail Form
  // InputWrapper,
  // SendButtonWrapper
} from './styledComponents'
import config from '../../config/index'
import Modal from '../Common/JakrooModal'
import FbIcon from '../../assets/FB_share.svg'
import TwitterIcon from '../../assets/Twitter_share.svg'

const ShareLinkInput = Input.Search
// TODO: commented to hide share by mail Form
// const { TextArea } = Input

declare global {
  interface Window {
    FB: any
  }
}

interface Props {
  open: boolean
  savedDesignId?: string
  picture?: string
  url?: string
  modalTitle?: string
  messageForShare?: string
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
}

class ShareDesignModal extends React.Component<Props, {}> {
  private copyInput: any

  handleShareOnFacebook = (designURL: string) => () => {
    const { messageForShare, picture } = this.props
    window.FB.ui(
      {
        method: 'share',
        href: designURL,
        picture: picture || 'https://designlab.jakroo.com/static/media/teamStoreSearch.9279d162.jpg',
        display: 'popup',
        quote: messageForShare || 'Check my awesome design!'
      },
      (response: any) => {}
    )
  }

  copyToClipboard = (value: string) => {
    const {
      input: { input }
    } = this.copyInput
    this.copyInput.focus()
    input.setSelectionRange(0, value.length)

    document.execCommand('copy')
  }

  render() {
    const {
      formatMessage,
      open,
      requestClose,
      savedDesignId,
      url,
      modalTitle
    } = this.props
    const designURL = url ? url : `${config.baseUrl}designs?id=${savedDesignId}`

    {
      // TODO: commented to hide share by mail Form
      /* const shareByEmail = (
      <ShareByMailRow style={{ display: 'none' }}>
        <Title>
          {formatMessage(messages.emailLabel)}
          <Asterisk>*</Asterisk>
        </Title>
        <InputWrapper>
          <Input placeholder={formatMessage(messages.addEmailLabel)} />
        </InputWrapper>
        <InputWrapper>
          <TextArea
            placeholder={formatMessage(messages.addMessageLabel)}
            autosize={{ minRows: 10, maxRows: 10 }}
          />
        </InputWrapper>
        <SendButtonWrapper>
          <Button>{formatMessage(messages.sendButtonLabel)}</Button>
        </SendButtonWrapper>
      </ShareByMailRow>
    )*/
    }
    return (
      <Modal
        withLogo={false}
        {...{ open, requestClose }}
        title={modalTitle ? modalTitle : formatMessage(messages.title)}
      >
        <Container>
          <ShareLinkRow>
            <ShareLinkContainer>
              <Title>
                {formatMessage(messages.shareLinkLabel)}
                <Asterisk>*</Asterisk>
              </Title>
              <ShareInputWrapper>
                <ShareLinkInput
                  ref={input => (this.copyInput = input)}
                  id="url"
                  enterButton={formatMessage(messages.copyButtonLabel)}
                  size="large"
                  value={designURL}
                  onSearch={this.copyToClipboard}
                  onChange={() => {}}
                />
              </ShareInputWrapper>
            </ShareLinkContainer>
            <ShareSocialMediaContainer>
              <Title>{formatMessage(messages.socialMediaLabel)}</Title>
              <IconsRow>
                <FacebookIconImg
                  src={FbIcon}
                  onClick={this.handleShareOnFacebook(designURL)}
                />
                <a
                  className="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?text=${designURL}`}
                  data-dnt="true"
                >
                  <TwitterIconImg src={TwitterIcon} />
                </a>
              </IconsRow>
            </ShareSocialMediaContainer>
          </ShareLinkRow>
          {/* TODO: add shareByEmail const here to show share by mail section*/}
        </Container>
      </Modal>
    )
  }
}

export default ShareDesignModal
