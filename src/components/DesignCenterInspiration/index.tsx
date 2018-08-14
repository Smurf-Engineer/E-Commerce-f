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
  formatMessage: (messageDescriptor: any) => string
}

export const DesignCenterInspiration = ({
  data,
  setPaletteAction,
  formatMessage
}: Props) => {
  const inspirations = data.inspirations || []

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
        {...{ inspiration }}
        setColors={setPaletteAction}
      />
    )
  })
  return <Container>{list}</Container>
}

type OwnProps = {
  styleId?: number
}

const DesignCenterInspirationEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ styleId }: OwnProps) => ({
      variables: { styleId }
    })
  }),
  WithLoading,
  WithError
)(DesignCenterInspiration)

export default DesignCenterInspirationEnhance
