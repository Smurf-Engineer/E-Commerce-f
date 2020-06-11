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
  history: History
  userId: string
  activatedAt: string
  paypalAccount: string
  file: string
  currentPage: number
  isAdmin: boolean
  openAffiliate: (open: boolean) => void
  changeComission: (value: number) => void
  onChangePage: (page: number) => void
  enableAffiliate: (status: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class AffiliateOptions extends React.Component<Props, {}> {
  debounceComission = debounce((value) => this.handleChangeComission(value), 800)
  enableStatus = () => {
    const { enableAffiliate } = this.props
    enableAffiliate(APPROVED)
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
  handleChangeComission = (value: number | undefined) => {
    const { changeComission } = this.props
    changeComission(value || 0)
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
      activatedAt,
      formatMessage,
      status
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
        {!isAdmin &&
          <Subtitle>
            {formatMessage(messages.settings)}
          </Subtitle>
        }
        <OptionsContainer>
          <LabelButton>
            <Title>
              {formatMessage(messages[isAdmin ? 'enabled' : 'status'])}
            </Title>
            {isAdmin ?
              <StyledSwitch
                disabled={hasChanged}
                checked={isActive}
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
            <>
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
              <LabelButton>
                <Title>
                  {formatMessage(messages.taxForm)}
                </Title>
                <FileLink onClick={this.openFile}>
                  <Clip type="paper-clip" />
                  {fileName}
                </FileLink>
              </LabelButton>
              <LabelButton>
                <Title>
                  {formatMessage(messages.comissions)}
                </Title>
                {isAdmin ?
                  <StyledInputNumber
                    onChange={this.debounceComission}
                    value={comission}
                    min={0}
                    max={100}
                    formatter={rawValue => `${rawValue}%`}
                    parser={value => value.replace(DECIMAL_REGEX, '')}
                  />
                  : <BoldLabel>
                    {`${comission}%`}
                  </BoldLabel>
                }
              </LabelButton>
              <LabelButton>
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
            </>
          }
        </OptionsContainer>
        {isActive &&
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
