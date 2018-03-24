/**
 * ShareDesignModal Component - Created by cazarez on 21/03/18.
 */
import * as React from 'react'
// import ReactDOM from 'react-dom'
import Input from 'antd/lib/input'
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
  // ShareByMailRow,
  FacebookIconImg,
  TwitterIconImg
  // InputWrapper,
  // SendButtonWrapper
} from './styledComponents'
import Modal from '../Common/JakrooModal'
import FbIcon from '../../assets/FB_share.svg'
import TwitterIcon from '../../assets/Twitter_share.svg'

const ShareLinkInput = Input.Search
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
      (response: any) => {
        console.log('Shared', response)
      }
    )
  }

  copyToClipboard = (value: string) => {
    // const toClipboard = new ClipboardEvent(value)
    this.copyInput.select()
    document.execCommand('copy')
  }

  render() {
    const { formatMessage, open, requestClose, savedDesignId } = this.props
    const designURL = `https://jakroo.com/designs/${savedDesignId}`

    {
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
                  // placeholder="https://jakroo.com/us/yourdesign"
                  ref={input => (this.copyInput = input)}
                  id="url"
                  enterButton={formatMessage(messages.copyButtonLabel)}
                  size="large"
                  value={designURL}
                  disabled={true}
                  onSearch={this.copyToClipboard}
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
