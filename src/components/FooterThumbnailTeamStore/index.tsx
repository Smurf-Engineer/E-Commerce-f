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
  BluePriceLabel,
  ProgressWrapper,
  ProgressText,
  BottomPrices
} from './styledComponents'

interface Props {
  id: number
  name: string
  description: string
  progress: number
  targetRange?: Filter
  onDemandMode?: boolean
  targetPrice: number
  currentPrice: number
}

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  progress,
  onDemandMode,
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
      <BottomPrices>
        <PricesContainer>
          <Label>
            <FormattedMessage {...messages.regularPrice} />
          </Label>
          <BluePriceLabel>{`$${targetPrice}`}</BluePriceLabel>
        </PricesContainer>
        <PricesContainer>
          <Label>
            <FormattedMessage
              {...(onDemandMode ? messages.teamPrice : messages.currentPrice)}
            />
          </Label>
          <BluePriceLabel>{`$${currentPrice}`}</BluePriceLabel>
        </PricesContainer>
      </BottomPrices>

      {!onDemandMode && (
        <Bottom>
          <ProgressWrapper>
            <ProgressText>{`${progress}/${
              targetRange ? targetRange.name.split('-')[0] : 0
            }`}</ProgressText>
            <Progress percent={percentage < 100 ? percentage : 100} />
          </ProgressWrapper>
        </Bottom>
      )}
    </Footer>
  )
}

export default FooterThumbnailTeamStore
