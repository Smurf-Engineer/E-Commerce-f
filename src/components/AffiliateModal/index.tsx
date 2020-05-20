/**
 * AffiliateModal Component - Created by Jesús Apodaca on 19/05/20.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose, withApollo } from 'react-apollo'
import Modal from 'antd/lib/modal'
import Checkbox from 'antd/lib/checkbox'
import { FormattedMessage } from 'react-intl'
import {
  ModalContainer,
  RadioStyled,
  Title,
  Container,
  Description,
  Label,
  RadioGroupStyled,
  CurrencyContainer,
  Currencies,
  FileLink,
  StyledUpload,
  UploadButton,
  StyledIcon,
  FileLabel,
  Clip,
  FileName,
  CheckboxContainer,
  CheckboxLabel,
  TermsLabel,
  ButtonsContainer,
  CancelButton,
  SaveButton,
} from './styledComponents'
import messages from './messages'
import { getProductQuery } from './data'
import { saveInLocalStorage } from './api'
import { ImageType, PriceRange, ProductColors, Message } from '../../types/common'

const links = {
  usd: 'uvuvevwevw',
  cad: 'onyetenyevwe'
}

interface Props {
  open: boolean
  history: History
  link: boolean
  formatMessage: (messageDescriptor: Message) => string
  handleClose: () => void
  onPressCustomize: (id: number) => void
}

export class AffiliateModal extends React.Component<Props, {}> {
  openFile = (event: React.MouseEvent<EventTarget>) => {
    const {
      target: { id }
    } = event
    const { history } = this.props
    history.push(links[id])
  }
  render() {
    const { open, link, handleClose, formatMessage } = this.props
    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={'512px'}
          destroyOnClose={true}
        >
          {link ?
            <Title>
              <FormattedMessage {...messages.link} />
            </Title>
            : <ModalContainer>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
              <Description>
                <FormattedMessage {...messages.description} />
              </Description>
              <Description>
                <FormattedMessage {...messages.getStarted} />
              </Description>
              <Label>
                <FormattedMessage {...messages.resident} />
              </Label>
              <CurrencyContainer>
                <RadioGroupStyled
                  onChange={() => { }}
                  value={''}
                  defaultValue={'left'}
                >
                  <RadioStyled value="left">
                    <FormattedMessage {...messages.unitedStates} />
                  </RadioStyled>
                  <RadioStyled value="left">
                    <FormattedMessage {...messages.canada} />
                  </RadioStyled>
                </RadioGroupStyled>
                <Currencies>
                  <FormattedMessage {...messages.usd} />
                  <FormattedMessage {...messages.cad} />
                </Currencies>
                <Currencies>
                  <FileLink id={'usd'} onClick={this.openFile}>
                    <FormattedMessage {...messages.usdForm} />
                  </FileLink>
                  <FileLink disabled={true} id={'cad'} onClick={this.openFile}>
                    <FormattedMessage {...messages.cadForm} />
                  </FileLink>
                </Currencies>
              </CurrencyContainer>
              <Label>
                <FormattedMessage {...messages.uploadTax} />
              </Label>
              <StyledUpload
                listType="picture-card"
                className="avatar-uploader"
                customRequest={() => { }}
                showUploadList={false}
                beforeUpload={() => { }}
              >
                <UploadButton>
                  <StyledIcon type="upload" />
                  <FormattedMessage {...messages.uploadTaxForm} />
                </UploadButton>
              </StyledUpload>
              <FileLabel>
                <Clip type="paper-clip" />
                <FileName>
                  UVUWEUGEOSSSASEOSSSAS.pdf
            </FileName>
              </FileLabel>
              <CheckboxContainer>
                <Checkbox
                  checked={false}
                  onChange={() => { }}
                >
                  <CheckboxLabel
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.terms)
                    }}
                  />
                </Checkbox>
              </CheckboxContainer>
              <TermsLabel>
                <FormattedMessage {...messages.termsDesc} />
              </TermsLabel>
              <ButtonsContainer>
                <CancelButton>
                  <FormattedMessage {...messages.cancel} />
                </CancelButton>
                <SaveButton>
                  <FormattedMessage {...messages.sendRequest} />
                </SaveButton>
              </ButtonsContainer>
            </ModalContainer>
          }
        </Modal>
      </Container>
    )
  }
}

const AffiliateModalEnhance = compose(
  withRouter,
  withApollo
)(AffiliateModal)

export default AffiliateModalEnhance
