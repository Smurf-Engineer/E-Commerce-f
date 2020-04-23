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
  BottomPrices,
  SaveText
} from './styledComponents'

const MAX_PERCENT = 100
const PERCENT_BY_SECTION = 20 // Result of 100 (max percent of bar) / 5 (Sections of tier pricing)

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
  suggestedSaveText?: string
}

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  progress,
  onDemandMode,
  code,
  targetPrice,
  currentPrice,
  priceRange = [],
  currentRangeAttributes,
  suggestedSaveText
}: Props) => {
  let realPercent = 0
  const getRealPercent = (
    relativePercentParam: number,
    percentAmount: number
  ) => {
    if (relativePercentParam !== MAX_PERCENT) {
      return Math.round(
        (relativePercentParam * PERCENT_BY_SECTION) / MAX_PERCENT +
        currentRangeAttributes.index * PERCENT_BY_SECTION
      )
    }
    return (relativePercentParam -= percentAmount)
  }
  if (!onDemandMode && currentRangeAttributes) {
    const percentAmount = MAX_PERCENT / currentRangeAttributes.range
    let relativePercent =
      ((progress - currentRangeAttributes.minQuantity) /
        currentRangeAttributes.range) *
      MAX_PERCENT

    realPercent = getRealPercent(relativePercent, percentAmount)
  }

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
        <div>
          <Bottom>
            <ProgressWrapper>
              <ProgressText>{progress}</ProgressText>
              <Progress percent={realPercent} />
            </ProgressWrapper>
          </Bottom>
          <SaveText dangerouslySetInnerHTML={{ __html: suggestedSaveText }} />
        </div>
      )}
    </Footer>
  )
}

export default FooterThumbnailTeamStore
