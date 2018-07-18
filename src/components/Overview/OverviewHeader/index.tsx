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
  width: string
  formatMessage: (messageDescriptor: any) => string
}

const OverviewHeader = ({ label, width, formatMessage }: Props) => {
  return (
    <Container>
      <Content {...{ width }}>
        <Label>{label}</Label>
        <ViewContainer>
          <span>{formatMessage(messages.view)}</span>
          <Icon type="right" />
        </ViewContainer>
      </Content>
      <Divider />
    </Container>
  )
}

export default OverviewHeader
