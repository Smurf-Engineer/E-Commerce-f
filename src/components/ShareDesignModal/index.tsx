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
  savedDesignId: number
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
}

class ShareDesignModal extends React.Component<Props, {}> {
  private copyInput: any

  handleShareOnFacebook = (designURL: string) => () => {
    window.FB.ui(
      {
        method: 'share',
        href: designURL,
        display: 'popup',
        quote: 'test'
      },
      (response: any) => {}
    )
  }

  copyToClipboard = (value: string) => {
    const { input: { input } } = this.copyInput
    this.copyInput.focus()
    input.setSelectionRange(0, value.length)

    document.execCommand('copy')
  }

  render() {
    const { formatMessage, open, requestClose, savedDesignId } = this.props
    const designURL = `https://jakroo.com/designs/${savedDesignId}`

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
        title={formatMessage(messages.title)}
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
