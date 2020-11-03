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
  MarginsContainer, SubtitleMargin, StyledInput
} from './styledComponents'

import PaymentsList from './PaymentsList'
import { NOTE_FORMAT } from '../constants'
import { PENDING, APPROVED, REJECTED, RETRY } from '../../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../utils/utilsFiles'
import Spin from 'antd/lib/spin'
import { CA_CURRENCY, US_CURRENCY } from '../../ResellerAbout/constants'
import { Message } from '../../../types/common'

const DECIMAL_REGEX = /[^0-9.]|\.(?=.*\.)/g

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
  enableStatus = () => {
    const { enableReseller } = this.props
    enableReseller(APPROVED)
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
    const { changeComission } = this.props
    changeComission(value)
  }
  handleChangeMargin = (value = 0) => {
    const { changeMargin } = this.props
    changeMargin(value)
  }
  handleChangeInline = (value = 0) => {
    const { changeInline } = this.props
    changeInline(value)
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
    const hasChanged = status !== PENDING || !status
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
            {(isAdmin && currency === US_CURRENCY) &&
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
              <BoldLabel upperCase={true}>
                {currency}
              </BoldLabel>
            </LabelButton>
            <LabelButton>
              <Title>
                {formatMessage(messages.stateProvince)}
              </Title>
              <BoldLabel upperCase={true}>
                {stateProvince}
              </BoldLabel>
            </LabelButton>
            <LabelButton>
              <Title>
                {formatMessage(messages.businessName)}
              </Title>
              <BoldLabel upperCase={true}>
                {businessName}
              </BoldLabel>
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
              <Title>
                {formatMessage(messages.paypalAccount)}
                {!isAdmin &&
                  <RedLabel onClick={this.openEdit}>
                    {formatMessage(messages.edit)}
                  </RedLabel>
                }
              </Title>
              <BoldLabel>
                {paypalAccount}
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
                  max={100}
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
                  max={100}
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
                  max={100}
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
