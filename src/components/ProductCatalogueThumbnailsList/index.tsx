/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu, { ClickParam } from 'antd/lib/menu'
import messages from './messages'
import { GetProductsQuery } from './data'
import ProductThumbnail from '../ProductThumbnail'
import { QueryProps, ProductType } from '../../types/common'
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
  ThumbnailListItem,
  Loading,
  PaginationRow,
  MenuStyle,
  NoResultsFound
} from './styledComponents'
import { Filter } from '../../types/common'
import downArrowIcon from '../../assets/downarrow.svg'

interface Data extends QueryProps {
  products: ProductType
}

interface StateProps {
  orderBy: string
  filters: Filter[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number) => void
  handleChangePage: (page: number) => void
  handleOrderBy?: (evt: ClickParam) => void
  sortOptions?: Element | null
  sortByLabel: string
  data: Data
  history: any
  currentPage: number
  limit?: number
}

export class ProductCatalogueThumbnailsList extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      sortByLabel,
      currentPage,
      limit,
      handleChangePage,
      handleOrderBy,
      data: { loading, products }
    } = this.props

    if (!products) {
      return null
    }
    const { products: catalogue = [], fullCount: total } = products

    const renderLoading = (
      <Loading>
        <Spin />
      </Loading>
    )

    let thumbnailsList
    if (catalogue) {
      thumbnailsList = catalogue.map((product, index) => (
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
    }

    const renderThumbnailList =
      catalogue.length > 0 ? (
        <ThumbnailsList>{thumbnailsList}</ThumbnailsList>
      ) : (
        <NoResultsFound>{formatMessage(messages.emptyResults)}</NoResultsFound>
      )

    const sortOptions = (
      <Menu style={MenuStyle} onClick={handleOrderBy}>
        <Menu.Item key="topSeller">
          {formatMessage(messages.topSellerLabel)}
        </Menu.Item>
        <Menu.Item key="pricelow">
          {formatMessage(messages.lowestPriceLabel)}
        </Menu.Item>
        <Menu.Item key="pricehigh">
          {formatMessage(messages.hightestPriceLabel)}
        </Menu.Item>
      </Menu>
    )

    return (
      <Container>
        <HeadRow>
          <TotalItems>{`${total} Items`}</TotalItems>
          <SortOptions>
            <SortByLabel>{formatMessage(messages.sortByLabel)}</SortByLabel>
            <Dropdown overlay={sortOptions} placement="bottomCenter">
              <Text>{sortByLabel}</Text>
            </Dropdown>
            <StyledImg src={downArrowIcon} />
          </SortOptions>
        </HeadRow>
        <Content>{loading ? renderLoading : renderThumbnailList}</Content>
        <PaginationRow>
          <Pagination
            size="small"
            current={currentPage}
            onChange={handleChangePage}
            total={parseInt(total, 10)}
            pageSize={limit}
          />
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
}

type OwnProps = {
  genderFilters?: string
  sportFilters?: string
  categoryFilters?: string
  fitFilters?: string
  temperatureFilters?: string
  limit?: number
  orderBy?: string
  skip?: number
}

const ThumbnailsListEnhance = compose(
  graphql<Data>(GetProductsQuery, {
    options: ({
      genderFilters,
      categoryFilters,
      sportFilters,
      limit,
      orderBy,
      skip
    }: OwnProps) => {
      return {
        variables: {
          gender: genderFilters ? genderFilters : null,
          category: categoryFilters ? categoryFilters : null,
          sport: sportFilters ? sportFilters : null,
          limit: limit ? limit : null,
          order: orderBy ? orderBy : null,
          offset: skip ? skip : null
        }
      }
    }
  })
)(ProductCatalogueThumbnailsList)

export default ThumbnailsListEnhance
