/**
 * FooterThumbnailTeamStore Component - Created by gustavomedina on 12/04/18.
 */
import * as React from 'react'
// import { FormattedMessage } from 'react-intl'
import Progress from 'antd/lib/progress'
// import messages from './messages'
import { Footer, Type, Description, Bottom, Label } from './styledComponents'

interface Props {
  id: number
  name: string
  description: string
  date: string
  onPressPrivate: (id: number, isPrivate: boolean) => void
  onPressDelete: (id: number) => void
}

// TODO: get from query
const estimatedPrice = 'Estimate price $63'
const currentPrice = 'Current price $119'

const FooterThumbnailTeamStore = ({
  id,
  name,
  description,
  date,
  onPressPrivate,
  onPressDelete
}: Props) => {
  return (
    <Footer>
      <Type>{name}</Type>
      <Description>{description}</Description>
      <Label>{estimatedPrice}</Label>
      <Label>{currentPrice}</Label>
      <Bottom>
        <Progress percent={30} />
      </Bottom>
    </Footer>
  )
}

export default FooterThumbnailTeamStore
