/**
 * ResellerDetails Component - Created by Jesús Ricardo on 23/05/20.
 */
import * as React from 'react'
import messages from './messages'
import debounce from 'lodash/debounce'
import {
  Container,
  OptionsContainer,
  LabelButton,
  Title,
  StyledSwitch,
  RedLabel,
  BoldLabel,
  FileLink,
  Clip,
  StyledInputNumber,
  LoadingContainer,
  Subtitle,
  InfoIcon,
  PopoverText,
  PopoverStyled,
  MessageText,
  MarginsContainer, SubtitleMargin, StyledInput, BillingSelect, StateDiv, PaypalLogo, WarningLabel, WarningIcon
} from './styledComponents'
import PaymentsList from './PaymentsList'
import { NOTE_FORMAT } from '../constants'
import { PENDING, APPROVED, REJECTED, RETRY, PAUSED } from '../../../constants'
import moment from 'moment'
import paypalLogo from '../../../assets/paypal_logo.png'
import { getFileWithExtension } from '../../../utils/utilsFiles'
import Spin from 'antd/lib/spin'
import Select from 'antd/lib/select'
import { CA_CURRENCY, US_CURRENCY } from '../../ResellerAbout/constants'
import { Message } from '../../../types/common'
import RegionSelect from '../../RegionSelect'

const { Option } = Select
const DECIMAL_REGEX = /[^0-9.]|\.(?=.*\.)/g

const MAX_MARGIN = 25
const MAX_COMISSION = 30
const MAX_INLINE = 40

const countries = [
  {
    label: 'Canada',
    value: 'cad'
  },
  {
    label: 'USA',
    value: 'usd'
  }
]

const countryNames = {
  [US_CURRENCY]: 'United States',
  [CA_CURRENCY]: 'Canada'
}

const countryCodes = {
  [US_CURRENCY]: '6252001',
  [CA_CURRENCY]: '6251999'
}

interface Props {
  status: string
  loading: boolean
  comission: number
  margin: number
  inline: number
  history: History
  userId: string
  activatedAt: string
  paypalAccount: string
  file: string
  gst: string
  currentPage: number
  isAdmin: boolean
  currency: string
  region: string
  businessName: string
  stateProvince: string
  onlyDetails: boolean
  openAffiliate: (open: boolean) => void
  changeComission: (value: number) => void
  changeMargin: (value: number) => void
  changeInline: (value: number) => void
  changeGst: (value: string) => void
  changeBusiness: (value: string) => void
  changeCurrency: (value: string) => void
  changeRegion: (value: string) => void
  onChangePage: (page: number) => void
  enableReseller: (status: string) => void
  enableAffiliate: (status: string) => void
  formatMessage: (messageDescriptor: Message) => string
}

class ResellerDetails extends React.Component<Props, {}> {
  debounceComission = debounce((value) => this.handleChangeComission(value), 800)
  debounceMargin = debounce((value) => this.handleChangeMargin(value), 800)
  debounceInline = debounce((value) => this.handleChangeInline(value), 800)
  debounceGst = debounce((value) => this.props.changeGst(value), 800)
  debounceBusiness = debounce((value) => this.props.changeBusiness(value), 800)
  enableStatus = () => {
    const { enableReseller, status } = this.props
    enableReseller(status === APPROVED ? PAUSED : APPROVED)
  }
  handleChangeCurrency = (value: string) => {
    if (value) {
      const { changeCurrency } = this.props
      changeCurrency(value)
    }
  }
  handleRegionChange = (value: any) => {
    if (value) {
      const { changeRegion } = this.props
      changeRegion(value)
    }
  }
  handleChangeBusiness = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.debounceBusiness(value || '')
  }
  rejectStatus = () => {
    const { enableReseller } = this.props
    enableReseller(REJECTED)
  }
  retryStatus = () => {
    const { enableReseller } = this.props
    enableReseller(RETRY)
  }
  handleChangeGst = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.debounceGst(value || '')
  }
  openFile = () => {
    const { file } = this.props
    window.open(file)
  }
  openEdit = () => {
    const { openAffiliate } = this.props
    openAffiliate(true)
  }
  handleChangeComission = (value = 0) => {
    const { changeComission, comission } = this.props
    if (value <= MAX_COMISSION && value > 0 && comission !== value) {
      changeComission(value)
    }
  }
  handleChangeMargin = (value = 0) => {
    const { changeMargin, margin } = this.props
    if (value <= MAX_MARGIN && value > 0 && margin !== value) {
      changeMargin(value)
    }
  }
  handleChangeInline = (value = 0) => {
    const { changeInline, inline } = this.props
    if (value <= MAX_INLINE && value > 0 && inline !== value) {
      changeInline(value)
    }
  }
  render() {
    const {
      file,
      paypalAccount,
      comission,
      history,
      loading,
      currentPage,
      onChangePage,
      userId,
      isAdmin,
      onlyDetails,
      margin,
      inline,
      businessName,
      stateProvince,
      activatedAt,
      formatMessage,
      status,
      gst,
      region,
      currency
    } = this.props
    const hasChanged = status === REJECTED || status === RETRY 
    const isActive = status === APPROVED
    const fileName = file ? getFileWithExtension(file) : ''
    return (
      <Container>
        {loading &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        {isAdmin && <MessageText>{formatMessage(messages.resellerOptions)}</MessageText>}
        {onlyDetails &&
          <Subtitle>
            {formatMessage(messages.settings)}
          </Subtitle>
        }
        {(onlyDetails || isAdmin) &&
          <OptionsContainer>
            {isAdmin && <LabelButton>
              <Title>
                {formatMessage(messages.enabled)}
              </Title>
              <StyledSwitch
                disabled={hasChanged}
                checked={isActive}
                onChange={this.enableStatus}
              />
            </LabelButton>
            }
            {isAdmin && status === PENDING &&
              <>
                <LabelButton>
                  <Title />
                  <RedLabel onClick={this.rejectStatus}>
                    {formatMessage(messages.decline)}
                  </RedLabel>
                </LabelButton>
                <LabelButton>
                  <Title />
                  <RedLabel onClick={this.retryStatus}>
                    {formatMessage(messages.retry)}
                  </RedLabel>
                </LabelButton>
              </>
            }
            {isAdmin &&
              <LabelButton>
                <Title>
                  {formatMessage(messages.activationDate)}
                </Title>
                {!!activatedAt &&
                  <BoldLabel>
                    {moment(activatedAt).format(NOTE_FORMAT)}
                  </BoldLabel>
                }
              </LabelButton>
            }
            {(isAdmin && currency === US_CURRENCY) && !!fileName &&
              <LabelButton>
                <Title>
                  {formatMessage(messages.taxForm)}
                </Title>
                <FileLink onClick={this.openFile}>
                  <Clip type="paper-clip" />
                  {fileName}
                </FileLink>
              </LabelButton>
            }
            {(isAdmin && currency === CA_CURRENCY) &&
              <LabelButton>
                <Title>
                  {formatMessage(messages.gstLabel)}
                </Title>
                <StyledInput
                  onChange={this.handleChangeGst}
                  defaultValue={gst}
                />
              </LabelButton>
            }
            {isActive && !isAdmin &&
              <LabelButton>
                <Title>
                  {formatMessage(messages.comissions)}
                  <PopoverStyled
                    trigger="click"
                    content={
                      <PopoverText
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(messages.marginPopover)
                        }}
                      />
                    }
                  >
                    <InfoIcon type="info-circle" />
                  </PopoverStyled>
                </Title>
                <BoldLabel>
                  {`${margin}%`}
                </BoldLabel>
              </LabelButton>
            }
            <LabelButton>
              <Title>
                {formatMessage(messages.currency)}
                {!isAdmin &&
                  <PopoverStyled
                    trigger="click"
                    content={
                      <PopoverText
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(messages.payoutDesc)
                        }}
                      />
                    } >
                    <InfoIcon type="info-circle" />
                  </PopoverStyled>
                }
              </Title>
              {isAdmin && !!status ?
                <BillingSelect
                  value={currency}
                  onChange={this.handleChangeCurrency}
                >
                  {countries.map(({ label, value }, index: Number) =>
                    <Option key={index} {...{ value }}>
                      {label}
                    </Option>
                  )}
                </BillingSelect> :
                <BoldLabel upperCase={true}>
                  {currency}
                </BoldLabel>
              }
            </LabelButton>
            <LabelButton>
              <Title>
                {formatMessage(messages.stateProvince)}
              </Title>
              {isAdmin && !!status ?
                <StateDiv>
                  <RegionSelect
                    {...{ formatMessage }}
                    disabled={!currency}
                    reseller={true}
                    country={currency ? countryCodes[currency] : ''}
                    countryName={currency ? countryNames[currency] : ''}
                    region={stateProvince || undefined}
                    handleRegionChange={this.handleRegionChange}
                  />
                </StateDiv>
                 : 
                <BoldLabel upperCase={true}>
                  {stateProvince}
                </BoldLabel>
              }
            </LabelButton>
            <LabelButton>
              <Title>
                {formatMessage(messages.businessName)}
              </Title>
              {isAdmin && !!status ?
                <StyledInput
                  onChange={this.handleChangeBusiness}
                  defaultValue={businessName}
                /> :
                <BoldLabel upperCase={true}>
                  {businessName}
                </BoldLabel>
              }
            </LabelButton>
            <LabelButton>
              <Title>
                {formatMessage(messages.region)}
              </Title>
              <BoldLabel upperCase={true}>
                {region}
              </BoldLabel>
            </LabelButton>
            {isActive && <LabelButton>
              {!isAdmin && <PaypalLogo src={paypalLogo} />}
              <Title>
                {formatMessage(messages.paypalAccount)}
                {!isAdmin &&
                  <RedLabel onClick={this.openEdit}>
                    {formatMessage(messages.edit)}
                  </RedLabel>
                }
              </Title>
              <BoldLabel>
                {paypalAccount ||
                  !isAdmin && 
                    <WarningLabel>
                      <WarningIcon theme="filled" type="warning" />
                      {formatMessage(messages.warningPaypal)}
                    </WarningLabel>
                }
              </BoldLabel>
            </LabelButton>
            }
          </OptionsContainer>
        }
        {isAdmin && isActive &&
          <>
            <SubtitleMargin>
              {formatMessage(messages.dealerMargins)}
            </SubtitleMargin>
            <MarginsContainer>
              <LabelButton>
                <Title>
                  {formatMessage(messages.storeMargin)}
                </Title>
                <StyledInputNumber
                  onChange={this.debounceMargin}
                  value={margin}
                  min={0}
                  max={MAX_MARGIN}
                  formatter={rawValue => `${rawValue}%`}
                  parser={value => value.replace(DECIMAL_REGEX, '')}
                />
              </LabelButton>
              <LabelButton>
                <Title>
                  {formatMessage(messages.customMargin)}
                </Title>
                <StyledInputNumber
                  onChange={this.debounceComission}
                  value={comission}
                  min={0}
                  max={MAX_COMISSION}
                  formatter={rawValue => `${rawValue}%`}
                  parser={value => value.replace(DECIMAL_REGEX, '')}
                />

              </LabelButton>
              <LabelButton>
                <Title>
                  {formatMessage(messages.inlineMargin)}
                </Title>
                <StyledInputNumber
                  onChange={this.debounceInline}
                  value={inline}
                  min={0}
                  max={MAX_INLINE}
                  formatter={rawValue => `${rawValue}%`}
                  parser={value => value.replace(DECIMAL_REGEX, '')}
                />
              </LabelButton>
            </MarginsContainer>
          </>
        }
        {
          isActive && !onlyDetails &&
          <PaymentsList
            {...{
              formatMessage,
              currentPage,
              onChangePage,
              userId,
              history,
              isAdmin,
            }}
          />
        }
      </Container >
    )
  }
}

export default ResellerDetails
