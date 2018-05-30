/**
 * Complience Screen - Created by miguelcanobbio on 30/05/18.
 */
import * as React from 'react'
import { InjectedIntl, injectIntl } from 'react-intl'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import messages from './messages'
import {
  Container,
  Title,
  HorizontalDivider,
  InfoContainer,
  StyledImage,
  ImageContainer,
  TextContainer,
  Text
} from './styledComponents'

import Layout from '../../components/MainLayout'
import bsci from '../../assets/compliance_bsci.svg'
import prop65 from '../../assets/compliance_prop65.svg'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

const bsciMessages = [
  messages.bsciContent1,
  messages.bsciContent2,
  messages.bsciContent3,
  messages.bsciContent4,
  messages.bsciContent5,
  messages.bsciContent6,
  messages.bsciContent7,
  messages.bsciContent8,
  messages.bsciContent9,
  messages.bsciContent10,
  messages.bsciContent11,
  messages.bsciContent12,
  messages.bsciContent13,
  messages.bsciContent14,
  messages.bsciContent15
]

export class Complience extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    const { formatMessage } = intl
    const bsciList = bsciMessages.map((bscsiMessage, key) => {
      return <Text {...{ key }}>{formatMessage(bscsiMessage)}</Text>
    })
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Title>{formatMessage(messages.title)}</Title>
          <HorizontalDivider />
          <InfoContainer>
            <ImageContainer>
              <StyledImage src={bsci} />
            </ImageContainer>
            <TextContainer>
              <Text>{formatMessage(messages.bsciMessage)}</Text>
              <Text>{formatMessage(messages.bsciSubtitle)}</Text>
              {bsciList}
            </TextContainer>
          </InfoContainer>
          <InfoContainer>
            <ImageContainer>
              <StyledImage src={prop65} />
            </ImageContainer>
            <TextContainer>
              <Text>{formatMessage(messages.propositionMessage)}</Text>
            </TextContainer>
          </InfoContainer>
        </Container>
      </Layout>
    )
  }
}

const ComplienceEnhance = compose(injectIntl)(Complience)

export default ComplienceEnhance
