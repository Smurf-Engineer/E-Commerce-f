/**
 * MobileDesignCenterInspiration Component - Created by eduardo on 24/12/18.
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
  setPaletteAction: (colors: string[], name: string) => void
  hideBottomSheet: () => void
  formatMessage: (messageDescriptor: any) => string
}

export const MobileDesignCenterInspiration = ({
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
