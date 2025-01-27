/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Progress from 'antd/lib/progress'
import messages from './messages'
import { Filter, ItemDetailType, PriceRange, PriceRangeProgress } from '../../types/common'
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
  SaveText,
  GendersDiv,
  MenIcon,
  WomenIcon,
  YouthLabel
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
  genders?: ItemDetailType[]
  onDemandMode?: boolean
  isResellerStore?: boolean
  isResellerOwner?: boolean
  fixedPrice?: boolean
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
  isResellerStore,
  isResellerOwner,
  fixedPrice,
  currentPrice,
  genders,
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
    } else {
      return (
        (relativePercentParam -= percentAmount) / currentRangeAttributes.index
      )
    }
  }
  let menAvailable = false
  let womenAvailable = false
  let youthAvailable = false
  if (genders) {
    genders.forEach((genderItem: ItemDetailType) => {
      if (genderItem.name === 'Men') {
        menAvailable = true
      }
      if (genderItem.name === 'Women') {
        womenAvailable = true
      }
      if (genderItem.name === 'Youth') {
        youthAvailable = true
      }
    })
  }
  if (!onDemandMode && !fixedPrice && currentRangeAttributes) {
    const percentAmount = MAX_PERCENT / currentRangeAttributes.range
    let relativePercent =
      ((progress - currentRangeAttributes.minQuantity) /
        currentRangeAttributes.range) *
      MAX_PERCENT
    realPercent = getRealPercent(relativePercent, percentAmount)
  }

  return (
    <Footer>
      <Type>
        {name}
        {genders && genders.length > 0 &&
          <GendersDiv>
            {menAvailable && <MenIcon type="man" />}
            {womenAvailable && <WomenIcon type="woman" />}
            {youthAvailable && <YouthLabel><FormattedMessage {...messages.youth} /></YouthLabel>}
          </GendersDiv>
        }
      </Type>
      <Description>{description}</Description>
      <Description>{code}</Description>
      <BottomPrices>
        {((isResellerStore && isResellerOwner) || !isResellerStore) && !fixedPrice &&
          <PricesContainer>
            <Label>
              <FormattedMessage {...messages[isResellerStore && isResellerOwner ? 'purchasePrice' : 'regularPrice']} />
            </Label>
            <PriceLabel>{targetPrice}</PriceLabel>
          </PricesContainer>}
        <PricesContainer>
          <Label>
            {isResellerStore && isResellerOwner ?
              <FormattedMessage
                {...messages.listPrice}
              /> :
              <FormattedMessage
                {...((onDemandMode || fixedPrice) ? 
                  messages[isResellerStore && !isResellerOwner ? 'listPrice' : 'teamPrice'] : messages.currentPrice
                )}
              />
            }
          </Label>
          <PriceLabel color={BLUE}>{currentPrice}</PriceLabel>
        </PricesContainer>
      </BottomPrices>

      {!onDemandMode && !fixedPrice && (
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
