/**
 * MyLocker Component - Created by david on 06/04/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'
import ProductList from '../../components/ProductCatalogueThumbnailsList'
import { QueryProps, DesignType } from '../../types/common'
import { desginsQuery } from './data'
import { Container } from './styledComponents'

interface Data extends QueryProps {
  designs: DesignType[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: string) => string
}

export class MyLocker extends React.PureComponent<Props, {}> {
  handleOnPressPrivate = (id: number, isPrivate: boolean) => {
    // TODO: Handle private
  }

  handleOnPressDelete = (id: number) => {
    // TODO: Handle delete
  }

  handleOnOpenQuickView = (id: number) => {
    // TODO: Handle openquickview
  }

  render() {
    const { formatMessage, data: { designs } } = this.props
    return (
      <Container>
        <ProductList
          {...{ formatMessage, designs }}
          onPressPrivate={this.handleOnPressPrivate}
          onPressDelete={this.handleOnPressDelete}
          openQuickView={this.handleOnOpenQuickView}
        />
      </Container>
    )
  }
}

const MyLockerEnhance = compose(graphql(desginsQuery), withLoading, withError)(
  MyLocker
)

export default MyLockerEnhance
