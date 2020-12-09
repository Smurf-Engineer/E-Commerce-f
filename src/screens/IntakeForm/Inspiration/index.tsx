/**
 * Inspiration Component - Created by eduardoquintero on 23/11/20.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import Masonry from 'react-masonry-css'
import { GetInspirationQuery } from './data'
import includes from 'lodash/includes'
import message from 'antd/lib/message'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import LazyImage from '../../../components/LazyImage'
import expandIcon from '../../../assets/expand.png'
import { RouteComponentProps } from 'react-router-dom'
import { Container, StyledInfiniteScroll, LoadingContainer, Expand, ImageContainer } from './styledComponents'
import { Message, QueryProps, InspirationType } from '../../../types/common'

const LIMIT = 10
const INSPIRATION_SELECTEED_ITEMS = 'inspirationSelectedItems'

interface InspirationData {
  fullCount: number
  inspiration: InspirationType[]
}

interface Data extends QueryProps {
  rows: InspirationData
}

interface Props extends RouteComponentProps<any> {
  data: Data
  isMobile: boolean
  currentPage: number
  client: any
  skip: number
  inspiration: InspirationType[]
  total: number
  loading: boolean
  selectedItems: number[]
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  setPage: (skip: number, newPage: number) => void
  setInspirationData: (data: InspirationType[], fullCount: number) => void
  setLoading: (loading: boolean) => void
  onSelect: (inspirationId: number, listName: string) => void
  onDeselect: (inspirationId: number, listName: string) => void
}

const gridBreakPoints = {
  default: 4,
  900: 2,
  1200: 3
}

export class Inspiration extends React.Component<Props, {}> {
  async componentDidMount() {
    const { currentPage } = this.props
    if (currentPage < 0) {
      await this.handleLoadData()
    }
  }
  callInspirationApi = async (skip = 0) => {
    const {
      client: { query },
      setInspirationData,
      setLoading
    } = this.props
    setLoading(true)
    try {
      const response = await query({
        query: GetInspirationQuery,
        variables: {
          limit: LIMIT,
          offset: skip
        },
        fetchPolicy: 'network-only'
      })
      const inspirationResults = get(response, 'data.rows.inspiration', [])
      const fullCount = get(response, 'data.rows.fullCount', 0)
      setInspirationData(inspirationResults, fullCount)
    } catch (e) {
      setLoading(false)
      message.error(e.message)
    }
  }
  handleLoadData = async () => {
    const { setPage, currentPage, loading } = this.props
    if (!loading) {
      const newPage = currentPage + 1
      const skip = (newPage) * LIMIT
      setPage(skip, newPage)
      await this.callInspirationApi(skip)
    }
  }

  render() {
    const {
      inspiration,
      total,
      selectedItems,
      onSelect,
      onDeselect
    } = this.props
    const items = inspiration.map((item: InspirationType) => {
      const isSelected = includes(selectedItems, item.id)
      const handleOnSelectInspiration = () =>
        !isSelected ? onSelect(item.id, INSPIRATION_SELECTEED_ITEMS) : onDeselect(item.id, INSPIRATION_SELECTEED_ITEMS)
      return (
        <ImageContainer
            key={item.id}
            {...{isSelected}}
            onClick={handleOnSelectInspiration}
            selectedIndex={isSelected && selectedItems.findIndex((currentItem) => currentItem === item.id) + 1}
          >
            <LazyImage src={item.image} />
          <Expand src={expandIcon} />
        </ImageContainer>)
    })
    const loader = <LoadingContainer><Spin /></LoadingContainer>
    return (
      <Container>
        <StyledInfiniteScroll
          useWindow={true}
          pageStart={0}
          loadMore={this.handleLoadData}
          initialLoad={false}
          hasMore={total > inspiration.length}
          {...{loader}}
        >
          <Masonry
            key="masonry"
            breakpointCols={gridBreakPoints}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {items}
          </Masonry>
        </StyledInfiniteScroll>
      </Container>
    )
  }
}

const InspirationEnhance = compose(
  withApollo,
)(Inspiration)

export default InspirationEnhance
