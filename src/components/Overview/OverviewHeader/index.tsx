/**
 * OverviewHeader Component - Created by miguelcanobbio on 17/07/18.
 */
import * as React from 'react'
import Icon from 'antd/lib/icon'
import messages from './messages'
import {
  Container,
  Label,
  ViewContainer,
  Content,
  Divider
} from './styledComponents'

interface Props {
  label: string
  id: string
  formatMessage: (messageDescriptor: any) => string
  onGoTo: (screen: string) => void
}

const OverviewHeader = ({ label, formatMessage, id, onGoTo }: Props) => {
  const handleOnGoTo = () => {
    onGoTo(id)
  }
  return (
    <Container>
      <Content>
        <Label>{label}</Label>
        <ViewContainer onClick={handleOnGoTo}>
          <span>{formatMessage(messages.view)}</span>
          <Icon type="right" />
        </ViewContainer>
      </Content>
      <Divider />
    </Container>
  )
}

export default OverviewHeader
