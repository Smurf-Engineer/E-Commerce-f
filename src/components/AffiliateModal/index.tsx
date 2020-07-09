/**
 * AffiliateModal Component - Created by Jesús Apodaca on 19/05/20.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose, withApollo } from 'react-apollo'
import Modal from 'antd/lib/modal'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
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
  CheckboxLabel,
  TermsLabel,
  ButtonsContainer,
  CancelButton,
  SaveButton,
  LinkButton,
  FormContainer,
  TermsLink,
} from './styledComponents'
import messages from './messages'
import { US_CURRENCY, CA_CURRENCY, TERMS_CONDITIONS, links } from './constants'
import { Message, UploadFile } from '../../types/common'
import { RadioChangeEvent } from 'antd/lib/radio'
import { UploadChangeParam } from 'antd/lib/upload'
import AntdMessage from 'antd/lib/message'
import { getFileWithExtension } from '../../utils/utilsFiles'

interface Props {
  open: boolean
  history: History
  link: boolean
  paypalCheck: boolean
  paypalCurrency: string
  file: string
  linkPaypal: () => void
  sendRequest: (value: boolean) => void
  openAffiliate: (value: boolean) => void
  uploadFileAction: (file: UploadFile) => void
  setPaypalCheck: (value: boolean) => void
  setPaypalCurrency: (value: string) => void
  formatMessage: (messageDescriptor: Message) => string
  onPressCustomize: (id: number) => void
}

export class AffiliateModal extends React.Component<Props, {}> {

  openFile = (id: string) => () => {
    window.open(links[id])
  }
  stopPropagation = (event: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
  }
  handleSelectSection = (event: RadioChangeEvent) => {
    const { setPaypalCurrency } = this.props
    const {
      target: {
        value
      }
    } = event
    setPaypalCurrency(value)
  }

  handleCheckChange = (event: CheckboxChangeEvent) => {
    const { setPaypalCheck } = this.props
    const { target: { checked } } = event
    setPaypalCheck(checked)
  }

  uploadFile = (event: UploadChangeParam) => {
    const { uploadFileAction } = this.props
    const { file } = event
    uploadFileAction(file)
  }

  beforeUpload = (file: any) => {
    const { formatMessage } = this.props
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      AntdMessage.error(formatMessage(messages.sizeError))
    }
    return isLt2M
  }

  handleClose = () => {
    const { openAffiliate } = this.props
    openAffiliate(false)
  }

  render() {
    const {
      open,
      file,
      link,
      linkPaypal,
      sendRequest,
      paypalCheck,
      formatMessage,
      paypalCurrency
    } = this.props
    const fileName = file ? getFileWithExtension(file) : ''
    return (
      <Container>
        {open && !link &&
          <FormContainer>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <Description>
              <FormattedMessage {...messages.description} />
            </Description>
            <Label>
              <FormattedMessage {...messages.resident} />
            </Label>
            <CurrencyContainer>
              <RadioGroupStyled
                onChange={this.handleSelectSection}
                value={paypalCurrency}
                defaultValue={US_CURRENCY}
              >
                <RadioStyled value={US_CURRENCY}>
                  <FormattedMessage {...messages.unitedStates} />
                </RadioStyled>
                <RadioStyled value={CA_CURRENCY}>
                  <FormattedMessage {...messages.canada} />
                </RadioStyled>
              </RadioGroupStyled>
              <Currencies>
                <FormattedMessage {...messages.usd} />
                <FormattedMessage {...messages.cad} />
              </Currencies>
              <Currencies>
                <FileLink disabled={paypalCurrency !== US_CURRENCY} onClick={this.openFile(US_CURRENCY)}>
                  <FormattedMessage {...messages.usdForm} />
                </FileLink>
                <FileLink disabled={paypalCurrency !== CA_CURRENCY} onClick={this.openFile(CA_CURRENCY)}>
                  <FormattedMessage {...messages.cadForm} />
                </FileLink>
              </Currencies>
            </CurrencyContainer>
            <TermsLabel>
              <FormattedMessage {...messages[paypalCurrency === CA_CURRENCY ? 'termsDescCad' : 'termsDesc']} />
            </TermsLabel>
            <Label>
              <FormattedMessage {...messages.uploadTax} />
            </Label>
            <StyledUpload
              listType="picture-card"
              className="avatar-uploader"
              customRequest={this.uploadFile}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
            >
              <UploadButton>
                <StyledIcon type="upload" />
                <FormattedMessage {...messages.uploadTaxForm} />
              </UploadButton>
            </StyledUpload>
            {!!fileName &&
              <FileLabel>
                <Clip type="paper-clip" />
                <FileName>
                  {fileName}
                </FileName>
              </FileLabel>
            }
            <ButtonsContainer>
              <SaveButton onClick={sendRequest} disabled={!paypalCheck || !file}>
                <FormattedMessage {...messages.sendRequest} />
              </SaveButton>
              <Checkbox
                checked={paypalCheck}
                onChange={this.handleCheckChange}
              >
                <CheckboxLabel onClick={this.stopPropagation}>
                  {formatMessage(messages.terms)}
                  <TermsLink onClick={this.openFile(TERMS_CONDITIONS)}>
                    {formatMessage(messages.termsLink)}
                  </TermsLink>
                </CheckboxLabel>
              </Checkbox>
            </ButtonsContainer>
          </FormContainer>
        }
        <Modal
          visible={open && link}
          footer={null}
          closable={false}
          width={'352px'}
        >
          <ModalContainer>
            <Title>
              <FormattedMessage {...messages.link} />
            </Title>
            <Description>
              <FormattedMessage {...messages.linkDesc} />
            </Description>
            <ButtonsContainer>
              <CancelButton onClick={this.handleClose}>
                <FormattedMessage {...messages.cancel} />
              </CancelButton>
              <LinkButton onClick={linkPaypal}>
                <FormattedMessage {...messages.linkButton} />
              </LinkButton>
            </ButtonsContainer>
          </ModalContainer>
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
