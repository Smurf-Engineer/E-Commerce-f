/**
 * ProductCatalogueThumbnailsList Component - Created by cazarez on 01/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Dropdown from 'antd/lib/dropdown'
import Pagination from 'antd/lib/pagination'
import Menu, { ClickParam } from 'antd/lib/menu'
import messages from './messages'
import ProductThumbnail from '../ProductThumbnail'
import downArrowIcon from '../../assets/downarrow.svg'
import { QueryProps, Product } from '../../types/common'
import {
  Container,
  Text,
  HeadRow,
  SortByLabel,
  SortOptions,
  TotalItems,
  StyledImg,
  ThumbnailsList,
  PaginationRow
} from './styledComponents'

interface Data extends QueryProps {
  products: Product[]
}

interface Props {
  formatMessage: (messageDescriptor: any) => string
  openQuickView: (id: number) => void
  sortBy?: (sort: string | null) => void
  data?: Data
  history: any
}

class ProductCatalogueThumbnailsList extends React.Component<Props, {}> {
  render() {
    const { formatMessage } = this.props
    const sortOptions = (
      <Menu style={{ width: '200px' }} onClick={this.handleMenuClick}>
        <Menu.Item key="topSeller">
          <FormattedMessage {...messages.topSellerLabel} />
        </Menu.Item>
        <Menu.Item key="lowest">
          <FormattedMessage {...messages.lowestPriceLabel} />
        </Menu.Item>
        <Menu.Item key="hightest">
          <FormattedMessage {...messages.hightestPriceLabel} />
        </Menu.Item>
      </Menu>
    )

    return (
      <Container>
        <HeadRow>
          <TotalItems>{'9 Items'}</TotalItems>
          <SortOptions>
            <SortByLabel>
              <FormattedMessage {...messages.sortByLabel} />
            </SortByLabel>
            <Dropdown overlay={sortOptions} placement="bottomCenter">
              <Text>{formatMessage(messages.topSellerLabel)}</Text>
            </Dropdown>
            <StyledImg src={downArrowIcon} />
          </SortOptions>
        </HeadRow>
        <ThumbnailsList>
          <ProductThumbnail
            id={1}
            isTopProduct={false}
            onPressCustomize={this.gotoDesignCenter}
            onPressQuickView={this.handlePressQuickView}
          />
          <ProductThumbnail
            id={2}
            isTopProduct={false}
            onPressCustomize={this.gotoDesignCenter}
            onPressQuickView={this.handlePressQuickView}
          />
        </ThumbnailsList>
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
    console.log(id)
    openQuickView(id)
  }

  handleMenuClick = (evt: ClickParam) => {
    console.log(evt)
  }
}

export default ProductCatalogueThumbnailsList
