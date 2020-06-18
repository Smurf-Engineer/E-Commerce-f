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
  CheckboxContainer,
  CheckboxLabel,
  TermsLabel,
  ButtonsContainer,
  CancelButton,
  SaveButton,
  LinkButton,
} from './styledComponents'
import messages from './messages'
import { Message, UploadFile } from '../../types/common'
import { RadioChangeEvent } from 'antd/lib/radio'
import { UploadChangeParam } from 'antd/lib/upload'
import AntdMessage from 'antd/lib/message'
import { getFileWithExtension } from '../../utils/utilsFiles'

const US_CURRENCY = 'usd'
const CA_CURRENCY = 'cad'

const links = {
  [US_CURRENCY]: 'usdLink',
  [CA_CURRENCY]: 'cadLink'
}

interface Props {
  open: boolean
  history: History
  link: boolean
  paypalCheck: boolean
  paypalCurrency: string
  file: string
  loading: boolean
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

  openFile = (event: React.MouseEvent<EventTarget>) => {
    const {
      target: { id }
    } = event
    const { history } = this.props
    history.push(links[id])
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
      loading,
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
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={link ? '352px' : '512px'}
        >
          {link ?
            <ModalContainer>
              <Title>
                <FormattedMessage {...messages.link} />
              </Title>
              <Description>
                <FormattedMessage {...messages.linkDesc} />
              </Description>
              <ButtonsContainer>
                <LinkButton onClick={linkPaypal}>
                  <FormattedMessage {...messages.linkButton} />
                </LinkButton>
              </ButtonsContainer>
            </ModalContainer>
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
                  <FileLink disabled={paypalCurrency !== US_CURRENCY} id={US_CURRENCY} onClick={this.openFile}>
                    <FormattedMessage {...messages.usdForm} />
                  </FileLink>
                  <FileLink disabled={paypalCurrency !== CA_CURRENCY} id={CA_CURRENCY} onClick={this.openFile}>
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
              <CheckboxContainer>
                <Checkbox
                  checked={paypalCheck}
                  onChange={this.handleCheckChange}
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
                <CancelButton onClick={this.handleClose}>
                  <FormattedMessage {...messages.cancel} />
                </CancelButton>
                <SaveButton onClick={sendRequest} disabled={!paypalCheck || !file || loading}>
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
