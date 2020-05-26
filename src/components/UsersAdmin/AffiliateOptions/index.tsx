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
  DeclineLabel,
  BoldLabel,
  FileLink,
  Clip,
  StyledInputNumber,
} from './styledComponents'

import PaymentsList from './PaymentsList'
import { NOTE_FORMAT } from '../constants'
import { PENDING, APPROVED, REJECTED } from '../../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../utils/utilsFiles'

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
  changeComission: (value: number) => void
  onChangePage: (page: number) => void
  enableAffiliate: (status: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class AffiliateOptions extends React.Component<Props, {}> {
  debounceComission = debounce((value) => this.handleChangeComission(value), 700)
  enableStatus = () => {
    const { enableAffiliate } = this.props
    enableAffiliate(APPROVED)
  }
  rejectStatus = () => {
    const { enableAffiliate } = this.props
    enableAffiliate(REJECTED)
  }
  openFile = () => {
    const { file } = this.props
    window.open(file)
  }
  handleChangeComission = (value: number) => {
    const { changeComission } = this.props
    changeComission(value)
  }
  render() {
    const {
      file,
      paypalAccount,
      comission,
      history,
      currentPage,
      onChangePage,
      userId,
      activatedAt,
      formatMessage,
      status
    } = this.props
    const hasChanged = status !== PENDING || !status
    const isActive = status === APPROVED
    const fileName = file ? getFileWithExtension(file) : ''
    return (
      <Container>
        <OptionsContainer>
          <LabelButton>
            <Title>
              {formatMessage(messages.enabled)}
            </Title>
            <StyledSwitch
              disabled={hasChanged}
              checked={isActive}
              onChange={this.enableStatus}
            />
          </LabelButton>
          <LabelButton>
            <Title />
            {status === PENDING &&
              <DeclineLabel onClick={this.rejectStatus}>
                {formatMessage(messages.decline)}
              </DeclineLabel>
            }
          </LabelButton>
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
                <StyledInputNumber
                  onChange={this.debounceComission}
                  value={comission}
                  formatter={rawValue => `${rawValue}%`}
                  parser={value => value.replace(DECIMAL_REGEX, '')}
                />
              </LabelButton>
              <LabelButton>
                <Title>
                  {formatMessage(messages.paypalAccount)}
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
            }}
            isAdmin={true}
          />
        }
      </Container>
    )
  }
}

export default AffiliateOptions
