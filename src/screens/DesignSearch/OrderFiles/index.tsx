/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Image, Code, Data, Status, Label } from './styledComponents'
import { OrderSearchResult } from '../../../types/common'

interface Props {
  order: OrderSearchResult
}

const OrderFiles = ({
  order: { productCode, image, status, svgUrl, assets }
}: Props) => {
  return (
    <Container>
      <Image src={image} />
      <Data>
        <Code>{productCode}</Code>
        <Status>
          <Label>
            <FormattedMessage {...messages.status} />
          </Label>
          <Label>{status}</Label>
        </Status>
      </Data>
    </Container>
  )
}

export default OrderFiles
