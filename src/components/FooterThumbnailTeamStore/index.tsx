/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Progress from 'antd/lib/progress'
import messages from './messages'
import {
  Footer,
  Type,
  Description,
  Bottom,
  Label,
  PricesContainer,
  PriceLabel,
  RedPriceLabel,
  ProgressWrapper,
  ProgressText
} from './styledComponents'

interface Props {
  id: number
  name: string
  description: string
  progress: number
}

// TODO: get from query
const estimatedPrice = '$63'
const currentPrice = '$119'

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  progress
}: Props) => {
  return (
    <Footer>
      <Type>{name}</Type>
      <Description>{description}</Description>
      <PricesContainer>
        <Label>
          <FormattedMessage {...messages.estimatedPrice} />
        </Label>
        <PriceLabel>{estimatedPrice}</PriceLabel>
      </PricesContainer>
      <PricesContainer>
        <Label>
          <FormattedMessage {...messages.currentPrice} />
        </Label>
        <RedPriceLabel>{currentPrice}</RedPriceLabel>
      </PricesContainer>
      <Bottom>
        <ProgressWrapper>
          <ProgressText>{`${progress}/50`}</ProgressText>
          <Progress percent={progress} />
        </ProgressWrapper>
      </Bottom>
    </Footer>
  )
}

export default FooterThumbnailTeamStore
