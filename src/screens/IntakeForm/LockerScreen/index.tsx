/**
 * LockerScreen Component - Created by david on 10/04/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { FormattedMessage } from 'react-intl'
import { desginsQuery } from './data'
import { graphql, compose } from 'react-apollo'
import zenscroll from 'zenscroll'
import get from 'lodash/get'
import Pagination from 'antd/lib/pagination'
import Spin from 'antd/lib/spin'
import messages from './messages'
import ProductThumbnail from '../../../components/ProductThumbnailStore'
import {
  QueryProps,
  DesignResultType,
  DesignType
} from '../../../types/common'
import {
  List,
  PaginationRow,
  NotFound,
  Container
} from './styledComponents'

interface Data extends QueryProps {
  designsResult: DesignResultType
}

interface Props {
  data: Data
  selectedItem: string
  offset: number
  currentPage: number
  limit: number
  userId?: string
  onSelectItem: (id?: string, design?: DesignType) => void
  changePage: (offset: number) => void
}

export class LockerScreen extends React.PureComponent<Props, {}> {
  private listRef: any
  handleOnItemSelect = (index: number) => {
    const {
      onSelectItem,
      selectedItem,
      data: {
        designsResult: { designs }
      }
    } = this.props
    const designId = get(designs[index], 'shortId', '')
    onSelectItem(designId === selectedItem ? '' : designId, designs[index])
  }
  onChangePage = (page: number) => {
    const { changePage } = this.props
    const node = ReactDOM.findDOMNode(this.listRef) as HTMLElement
    const modalScroller = zenscroll.createScroller(node, 0)
    modalScroller.toY(0, 0)
    changePage(page)
  }

  render() {
    const {
      selectedItem,
      currentPage,
      limit,
      data
    } = this.props
    let screen
    if (!data.loading) {
      const { designs = [] } = data.designsResult
      screen = designs.length ? (
        designs.map(
          (
            {
              id,
              shortId,
              name,
              image,
              createdAt,
              product: { id: productId, active, description, type },
              product
            }: DesignType,
            index
          ) => (
              <ProductThumbnail
                key={id}
                checked={selectedItem === shortId}
                disabled={!active}
                id={index}
                wide={true}
                product={product}
                onSelectItem={this.handleOnItemSelect}
                {...{ name, image, productId, description, type }}
                date={createdAt}
              />
            )
        )
      ) : (
          <NotFound>
            <FormattedMessage {...messages.noDesigns} />
          </NotFound>
        )
    } else {
      screen = <Spin />
    }

    return (
      <Container>
        <List
          ref={(listObject: any) => {
            this.listRef = listObject
          }}
        >
          {screen}
        </List>
        <PaginationRow>
          {!data.loading && Number(data.designsResult.fullCount) > limit && (
            <Pagination
              size="small"
              current={currentPage}
              onChange={this.onChangePage}
              total={Number(data.designsResult.fullCount)}
              pageSize={limit}
            />
          )}
        </PaginationRow>
      </Container>
    )
  }
}

interface OwnProps {
  offset?: number
  currentPage?: number
  limit?: number
  userId?: string
}

const LockerScreenEnhance = compose(
  graphql<Data>(desginsQuery, {
    options: ({ currentPage, offset, limit, userId }: OwnProps) => {
      return {
        variables: {
          limit,
          currentPage,
          offset,
          userId
        }
      }
    }
  })
)(LockerScreen)

export default LockerScreenEnhance
