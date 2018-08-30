/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Progress from 'antd/lib/progress'
import messages from './messages'
import { Filter } from '../../types/common'
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
  targetRange?: Filter
  targetPrice: number
  currentPrice: number
}

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  progress,
  targetRange,
  targetPrice,
  currentPrice
}: Props) => {
  const totalPercentage: number = targetRange
    ? parseInt(targetRange.name.split('-')[0], 10)
    : 0
  const percentage = progress / (totalPercentage / 100)

  return (
    <Footer>
      <Type>{name}</Type>
      <Description>{description}</Description>
      <PricesContainer>
        <Label>
          <FormattedMessage {...messages.estimatedPrice} />
        </Label>
        <PriceLabel>{`$${targetPrice}`}</PriceLabel>
      </PricesContainer>
      <PricesContainer>
        <Label>
          <FormattedMessage {...messages.currentPrice} />
        </Label>
        <RedPriceLabel>{`$${currentPrice}`}</RedPriceLabel>
      </PricesContainer>
      <Bottom>
        <ProgressWrapper>
          <ProgressText>{`${progress}/${
            targetRange ? targetRange.name.split('-')[0] : 0
          }`}</ProgressText>
          <Progress percent={percentage < 100 ? percentage : 100} />
        </ProgressWrapper>
      </Bottom>
    </Footer>
  )
}

export default FooterThumbnailTeamStore
