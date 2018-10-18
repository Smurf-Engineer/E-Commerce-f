/**
 * DesignCenterInspiration Component - Created by gustavomedina on 23/04/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import messages from './messages'
import { Container, EmptyContainer, EmptyMessage } from './styledComponents'
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
  setPaletteAction: (colors: string[]) => void
  hideBottomSheet: () => void
  formatMessage: (messageDescriptor: any) => string
}

export const DesignCenterInspiration = ({
  data,
  setPaletteAction,
  hideBottomSheet,
  formatMessage
}: Props) => {
  const { inspirations = [] } = data

  if (!inspirations.length) {
    return (
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyMessage)}</EmptyMessage>
      </EmptyContainer>
    )
  }

  const list = inspirations.map((inspiration, index) => {
    return (
      <InspirationItem
        key={index}
        {...{ inspiration, hideBottomSheet }}
        setColors={setPaletteAction}
      />
    )
  })
  return <Container>{list}</Container>
}

const DesignCenterInspirationEnhance = compose(
  graphql<Props>(desginsQuery, {
    options: ({ styleId }) => ({
      variables: { styleId }
    })
  }),
  WithLoading,
  WithError
)(DesignCenterInspiration)

export default DesignCenterInspirationEnhance
