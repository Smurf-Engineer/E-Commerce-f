/**
 * ShareDesignModal Component - Created by cazarez on 21/03/18.
 */
import * as React from 'react'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
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
  ShareByMailRow,
  FacebookIconImg,
  TwitterIconImg,
  InputWrapper,
  SendButtonWrapper
} from './styledComponents'
import Modal from '../Common/JakrooModal'
import FbIcon from '../../assets/FB_share.svg'
import TwitterIcon from '../../assets/Twitter_share.svg'

const ShareLinkInput = Input.Search
const { TextArea } = Input

interface Props {
  open: boolean
  savedDesignId: number
  requestClose: () => void
  formatMessage: (messageDescriptor: any) => string
}

const ShareDesignModal = ({ open, requestClose, formatMessage }: Props) => {
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
                placeholder="https://jakroo.com/us/yourdesign"
                enterButton={formatMessage(messages.copyButtonLabel)}
                size="large"
              />
            </ShareInputWrapper>
          </ShareLinkContainer>
          <ShareSocialMediaContainer>
            <Title>{formatMessage(messages.socialMediaLabel)}</Title>
            <IconsRow>
              <FacebookIconImg src={FbIcon} />
              <TwitterIconImg src={TwitterIcon} />
            </IconsRow>
          </ShareSocialMediaContainer>
        </ShareLinkRow>
        <ShareByMailRow>
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
      </Container>
    </Modal>
  )
}

export default ShareDesignModal
