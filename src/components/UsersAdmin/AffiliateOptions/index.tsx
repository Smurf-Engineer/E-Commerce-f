/**
 * AffiliateOptions Component - Created by Jesús Ricardo on 23/05/20.
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
  MessageText,
  PaypalLogo,
  WarningLabel,
  WarningIcon,
} from './styledComponents'

import PaymentsList from './PaymentsList'
import { PENDING, APPROVED, REJECTED, RETRY, DATE_FORMAT, PAUSED } from '../../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../utils/utilsFiles'
import Spin from 'antd/lib/spin'
import paypalLogo from '../../../assets/paypal_logo.png'
import Popover from 'antd/lib/popover'

const DECIMAL_REGEX = /[^0-9.]|\.(?=.*\.)/g

const MAX_COMISSION = 15

interface Props {
  status: string
  loading: boolean
  comission: number
  history: History
  userId: string
  activatedAt: string
  paypalAccount: string
  file: string
  currentPage: number
  isAdmin: boolean
  currency: string
  region: string
  onlyDetails: boolean
  onBehalf: boolean
  openAffiliate: (open: boolean) => void
  changeComission: (value: number) => void
  onChangePage: (page: number) => void
  enableAffiliate: (status: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class AffiliateOptions extends React.Component<Props, {}> {
  debounceComission = debounce((value) => this.handleChangeComission(value), 800)
  enableStatus = () => {
    const { enableAffiliate, status } = this.props
    enableAffiliate(status === APPROVED ? PAUSED : APPROVED)
  }
  rejectStatus = () => {
    const { enableAffiliate } = this.props
    enableAffiliate(REJECTED)
  }
  retryStatus = () => {
    const { enableAffiliate } = this.props
    enableAffiliate(RETRY)
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
      activatedAt,
      onBehalf,
      formatMessage,
      status,
      region,
      currency
    } = this.props
    const hasChanged = status === REJECTED || status === RETRY || !status
    const isActive = status === APPROVED || status === PAUSED
    const fileName = file ? getFileWithExtension(file) : ''
    return (
      <Container>
        {loading &&
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        }
        {isAdmin && <MessageText>{formatMessage(messages.paydayOptions)}</MessageText>}
        {onlyDetails &&
          <Subtitle>
            {formatMessage(messages.settings)}
          </Subtitle>
        }
        {(onlyDetails || isAdmin) &&
          <OptionsContainer>
            <LabelButton>
              <Title>
                {formatMessage(messages[isAdmin ? 'enabled' : 'status'])}
              </Title>
              {isAdmin ?
                <StyledSwitch
                  disabled={hasChanged}
                  checked={status === APPROVED}
                  onChange={this.enableStatus}
                /> :
                <BoldLabel>
                  {status}
                </BoldLabel>
              }
            </LabelButton>
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
            {isActive &&
              <LabelButton>
                <Title>
                  {formatMessage(messages.activationDate)}
                </Title>
                {!!activatedAt &&
                  <BoldLabel>
                    {moment(activatedAt).format(DATE_FORMAT)}
                  </BoldLabel>
                }
              </LabelButton>
            }
            <LabelButton>
              <Title>
                {formatMessage(messages.taxForm)}
              </Title>
              <FileLink onClick={this.openFile}>
                <Clip type="paper-clip" />
                {fileName}
              </FileLink>
            </LabelButton>
            {isActive && <LabelButton>
              <Title>
                {formatMessage(messages.comissions)}
              </Title>
              {isAdmin ?
                <StyledInputNumber
                  onChange={this.debounceComission}
                  value={comission}
                  min={0}
                  max={MAX_COMISSION}
                  formatter={rawValue => `${rawValue}%`}
                  parser={value => value.replace(DECIMAL_REGEX, '')}
                />
                : <BoldLabel>
                  {`${comission}%`}
                </BoldLabel>
              }
            </LabelButton>}
            <LabelButton>
              <Title>
                {formatMessage(messages.currency)}
                {!isAdmin && <Popover content={
                  <PopoverText>
                    {formatMessage(messages.payoutDesc)}
                  </PopoverText>
                } title={formatMessage(messages.currency)}>
                  <InfoIcon type="info-circle" />
                </Popover>}
              </Title>
              <BoldLabel upperCase={true}>
                {currency}
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
              {!isAdmin && <PaypalLogo src={paypalLogo} />}
              <Title>
                {formatMessage(messages.paypalAccount)}
                {!isAdmin && !onBehalf &&
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
        {isActive && !onlyDetails &&
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
      </Container>
    )
  }
}

export default AffiliateOptions
