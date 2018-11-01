/**
 * DesignCenterInfo Component - Created by david on 23/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  Row,
  Model,
  Title,
  CenterDiv,
  Message,
  QuickView
} from './styledComponents'
import quickView from '../../assets/quickview.svg'

interface Props {
  label: string
  model: string
  message?: string
  isMobile?: boolean
  onPressQuickView: () => void
}

const DesignCenterInfo = ({
  label,
  model,
  onPressQuickView,
  message,
  isMobile = false
}: Props) => {
  return (
    <Container {...{ isMobile }}>
      {!isMobile && (
        <Row>
          <Model>{model}</Model>
          <QuickView src={quickView} onClick={onPressQuickView} />
        </Row>
      )}
      <CenterDiv>
        <Title>
          <FormattedMessage {...messages[label]} />
        </Title>
        {!!message && (
          <Message>
            <FormattedMessage {...messages[message]} />
          </Message>
        )}
      </CenterDiv>
    </Container>
  )
}

export default DesignCenterInfo
