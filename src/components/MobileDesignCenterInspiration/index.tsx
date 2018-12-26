/**
 * MobileDesignCenterInspiration Component - Created by eduardo on 24/12/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import messages from './messages'
import Arrow from '../../assets/down-arrow.svg'
import { Container, StyledButton, CombosList } from './styledComponents'
import { QueryProps, Filter, Inspiration } from '../../types/common'
import { desginsQuery } from './data'
import InspirationItem from './InspirationItem'
import WithLoading from '../WithLoading'
import WithError from '../WithError'

interface Data extends QueryProps {
  inspirations?: Inspiration[]
}

interface Props {
  data: Data
  width?: string
  category: Filter
  styleId?: number
  open: boolean
  setPaletteAction: (colors: string[], name: string) => void
  hideList: () => void
  formatMessage: (messageDescriptor: any) => string
}

export const MobileDesignCenterInspiration = ({
  data,
  setPaletteAction,
  formatMessage,
  hideList,
  open
}: Props) => {
  const { inspirations = [] } = data

  if (!inspirations.length) {
    return null
  }

  const list = inspirations.map((inspiration, index) => {
    return (
      <InspirationItem
        key={index}
        {...{ inspiration }}
        setColors={setPaletteAction}
      />
    )
  })
  return (
    <Container className={open ? 'open' : ''}>
      <StyledButton type="primary" onClick={hideList}>
        {formatMessage(messages.moreColorCombos)}
        <img src={Arrow} />
      </StyledButton>
      <CombosList className={open ? 'open' : ''}>{list}</CombosList>
      <StyledButton type="primary" className={'small'} onClick={hideList}>
        {formatMessage(messages.hide)}
      </StyledButton>
    </Container>
  )
}

type OwnProps = {
  styleId?: number
}

const MobileDesignCenterInspirationEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ styleId }: OwnProps) => ({
      variables: { styleId }
    })
  }),
  WithLoading,
  WithError
)(MobileDesignCenterInspiration)

export default MobileDesignCenterInspirationEnhance
