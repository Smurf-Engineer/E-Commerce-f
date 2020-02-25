/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Progress from 'antd/lib/progress'
import messages from './messages'
import { Filter, PriceRange, PriceRangeProgress } from '../../types/common'
import { BLUE } from '../../theme/colors'
import {
  Footer,
  Type,
  Description,
  Bottom,
  Label,
  PricesContainer,
  PriceLabel,
  ProgressWrapper,
  ProgressText,
  BottomPrices
} from './styledComponents'

const MAX_PERCENT = 100

interface Props {
  id: number
  name: string
  description: string
  progress: number
  code: string
  targetRange?: Filter
  onDemandMode?: boolean
  targetPrice: number | string
  currentPrice: number | string
  priceRange?: PriceRange[]
  currentRangeAttributes?: PriceRangeProgress
}

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  progress,
  onDemandMode,
  targetRange,
  code,
  targetPrice,
  currentPrice,
  priceRange = [],
  currentRangeAttributes
}: Props) => {
  let realPercent = 0

  if (!onDemandMode && currentRangeAttributes) {
    const totalPercentBySection = MAX_PERCENT / (priceRange.length - 1)
    const percentAmount = MAX_PERCENT / currentRangeAttributes.range
    let relativePercent =
      ((progress - currentRangeAttributes.minQuantity) /
        currentRangeAttributes.range) *
      MAX_PERCENT

    relativePercent =
      relativePercent === MAX_PERCENT
        ? (relativePercent -= percentAmount)
        : relativePercent
    realPercent = Math.round(
      (relativePercent * totalPercentBySection) / MAX_PERCENT +
        currentRangeAttributes.index * totalPercentBySection
    )
  }
  console.log('Progress ', progress)
  console.log('Real percent ', realPercent)

  return (
    <Footer>
      <Type>{name}</Type>
      <Description>{description}</Description>
      <Description>{code}</Description>
      <BottomPrices>
        <PricesContainer>
          <Label>
            <FormattedMessage {...messages.regularPrice} />
          </Label>
          <PriceLabel>{targetPrice}</PriceLabel>
        </PricesContainer>
        <PricesContainer>
          <Label>
            <FormattedMessage
              {...(onDemandMode ? messages.teamPrice : messages.currentPrice)}
            />
          </Label>
          <PriceLabel color={BLUE}>{currentPrice}</PriceLabel>
        </PricesContainer>
      </BottomPrices>

      {!onDemandMode && (
        <Bottom>
          <ProgressWrapper>
            <ProgressText>{progress}</ProgressText>
            <Progress percent={realPercent} />
          </ProgressWrapper>
        </Bottom>
      )}
    </Footer>
  )
}

export default FooterThumbnailTeamStore
