/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu, { ClickParam } from 'antd/lib/menu'
import messages from './messages'
import { GetProductsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import downArrowIcon from '../../assets/downarrow.svg'
import { QueryProps, Product } from '../../types/common'
import {
  Container,
  Content,
  Text,
  HeadRow,
  SortByLabel,
  SortOptions,
  TotalItems,
  StyledImg,
  ThumbnailsList,
  PaginationRow,
  MenuStyle,
  ThumbnailListItem
} from './styledComponents'
import { Filter } from '../../types/common'

interface Data extends QueryProps {
  catalogue: Product[]
}

interface StateProps {
  orderBy: string
  filters: Filter[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number) => void
  sortBy?: (sort: string | null) => void
  data: Data
  history: any
}

export class ProductCatalogueThumbnailsList extends React.Component<Props, {}> {
  state = {
    orderBy: 'Top Seller'
  }
  render() {
    const { formatMessage, data: { catalogue, loading } } = this.props
    const { orderBy } = this.state

    if (loading) {
      return null
    }

    const sortOptions = (
      <Menu style={MenuStyle} onClick={this.handleOrderBy}>
        <Menu.Item key="topSeller">
          {formatMessage(messages.topSellerLabel)}
        </Menu.Item>
        <Menu.Item key="lowest">
          {formatMessage(messages.lowestPriceLabel)}
        </Menu.Item>
        <Menu.Item key="hightest">
          {formatMessage(messages.hightestPriceLabel)}
        </Menu.Item>
      </Menu>
    )

    const thumbnailsList = catalogue.map((product, index) => (
      <ThumbnailListItem key={index}>
        <ProductThumbnail
          id={product.id}
          type={product.type}
          description={product.description}
          isTopProduct={product.isTopProduct}
          onPressCustomize={this.gotoDesignCenter}
          onPressQuickView={this.handlePressQuickView}
          collections={product.collections}
          images={product.images}
          priceRange={product.priceRange}
        />
      </ThumbnailListItem>
    ))
    return (
      <Container>
        <HeadRow>
          <TotalItems>{'9 Items'}</TotalItems>
          <SortOptions>
            <SortByLabel>{formatMessage(messages.sortByLabel)}</SortByLabel>
            <Dropdown overlay={sortOptions} placement="bottomCenter">
              <Text>{orderBy}</Text>
            </Dropdown>
            <StyledImg src={downArrowIcon} />
          </SortOptions>
        </HeadRow>
        <Content>
          <ThumbnailsList>{thumbnailsList}</ThumbnailsList>
        </Content>
        <PaginationRow>
          <Pagination size="small" total={50} pageSize={12} />
        </PaginationRow>
      </Container>
    )
  }

  gotoDesignCenter = () => {
    const { history } = this.props
    history.push('/design-center')
  }

  handlePressQuickView = (id: number) => {
    const { openQuickView } = this.props
    openQuickView(id)
  }

  handleOrderBy = (evt: ClickParam) => {
    const { item: { props: { children } } } = evt
    this.setState({ orderBy: children })
  }

  handleVisible = (param: boolean | undefined) => {
    // console.log(param)
  }
}

const ThumbnailsListEnhance = compose(
  graphql<Data>(GetProductsQuery, {
    options: {
      variables: {
        gender: 1,
        category: 0,
        sport: 1
      }
    }
  })
)(ProductCatalogueThumbnailsList)

export default ThumbnailsListEnhance
