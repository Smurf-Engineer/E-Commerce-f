/**
 * AffiliateOptions Component - Created by Jesús Ricardo on 23/05/20.
 */
import * as React from 'react'
import messages from './messages'
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
import { NOTE_FORMAT } from '../constants'
import { PENDING, APPROVED, REJECTED } from '../../../constants'
import moment from 'moment'
import { getFileWithExtension } from '../../../utils/utilsFiles'

interface Props {
  status: string
  loading: boolean
  comission: number
  activatedAt: string
  paypalAccount: string
  file: string
  enableAffiliate: (status: string) => void
  formatMessage: (messageDescriptor: any) => string
}

class AffiliateOptions extends React.Component<Props, {}> {
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
  render() {
    const {
      file,
      paypalAccount,
      comission,
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
                  onChange={() => { }}
                  value={comission}
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
      </Container>
    )
  }
}

export default AffiliateOptions
