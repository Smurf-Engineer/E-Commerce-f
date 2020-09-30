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
} from './styledComponents'

import PaymentsList from './PaymentsList'
import { NOTE_FORMAT } from '../constants'
import { PENDING, APPROVED, REJECTED, RETRY } from '../../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../utils/utilsFiles'
import Spin from 'antd/lib/spin'

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
  currentPage: number
  isAdmin: boolean
  currency: string
  region: string
  onlyDetails: boolean
  openAffiliate: (open: boolean) => void
  changeComission: (value: number) => void
  changeMargin: (value: number) => void
  changeInline: (value: number) => void
  onChangePage: (page: number) => void
  enableReseller: (status: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class ResellerDetails extends React.Component<Props, {}> {
  debounceComission = debounce((value) => this.handleChangeComission(value), 800)
  debounceMargin = debounce((value) => this.handleChangeMargin(value), 800)
  debounceInline = debounce((value) => this.handleChangeInline(value), 800)
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
  openFile = () => {
    const { file } = this.props
    window.open(file)
  }
  openEdit = () => {
    const { openAffiliate } = this.props
    openAffiliate(true)
  }
  handleChangeComission = (value: number | undefined) => {
    const { changeComission } = this.props
    changeComission(value || 0)
  }
  handleChangeMargin = (value: number | undefined) => {
    const { changeMargin } = this.props
    changeMargin(value || 0)
  }
  handleChangeInline = (value: number | undefined) => {
    const { changeInline } = this.props
    changeInline(value || 0)
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
      activatedAt,
      formatMessage,
      status,
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
            {isAdmin &&
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
            {isActive &&
              <>
                <LabelButton>
                  <Title>
                    {formatMessage(messages.comissions)}
                    {!isAdmin &&
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
                    }
                  </Title>
                  {isAdmin ?
                    <StyledInputNumber
                      onChange={this.debounceMargin}
                      value={margin}
                      min={0}
                      max={100}
                      formatter={rawValue => `${rawValue}%`}
                      parser={value => value.replace(DECIMAL_REGEX, '')}
                    />
                    : <BoldLabel>
                      {`${margin}%`}
                    </BoldLabel>
                  }
                </LabelButton>
                {isAdmin &&
                  <>
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
                  </>
                }
              </>
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
