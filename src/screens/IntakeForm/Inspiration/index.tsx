/**
 * Inspiration Component - Created by eduardoquintero on 23/11/20.
 */
import * as React from 'react'
import { compose, withApollo, graphql } from 'react-apollo'
import Masonry from 'react-masonry-css'
import { GetInspirationQuery, GetInspirationTags } from './data'
import Select from 'antd/lib/select'
import includes from 'lodash/includes'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import messages from '../messages'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'
import LazyImage from '../../../components/LazyImage'
import expandIcon from '../../../assets/expand.png'
import upperFirst from 'lodash/upperFirst'
import { RouteComponentProps } from 'react-router-dom'
import {
  Container,
  StyledInfiniteScroll,
  LoadingContainer,
  Expand,
  ImageContainer,
  TagsContainer,
  SearchTagStyle,
  TagPicker,
  TagPickers,
  Filters,
  Label,
  Checkboxes,
  CheckboxLabel,
  EmptyMessage,
  StyledCheckbox
} from './styledComponents'
import { Message, QueryProps, InspirationType } from '../../../types/common'

const LIMIT = 10
const INSPIRATION_SELECTEED_ITEMS = 'inspirationSelectedItems'

const { Option } = Select
interface InspirationData {
  fullCount: number
  inspiration: InspirationType[]
}

interface Data extends QueryProps {
  rows: InspirationData
}

interface TagsData extends QueryProps {
  rows: Tag[]
}

interface Tag extends QueryProps {
  value: string
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
  dataTags: TagsData
  selectedTags: string[]
  filters: string[]
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  setPage: (skip: number, newPage: number) => void
  setInspirationData: (data: InspirationType[], fullCount: number) => void
  setLoading: (loading: boolean) => void
  onSelect: (inspirationId: number, listName: string) => void
  onDeselect: (inspirationId: number, listName: string) => void
  onExpandInspiration: 
    (inspirationId: number, image: string, name: string, isSelected: boolean, tags: string[]) => void
  addTag: (value: string) => void
  removeTag: (value: string) => void
  resetInspirationData: () => void
  removeFilter: (listName: string, name: string) => void
  addFilter: (listName: string, name: string) => void
}

const gridBreakPoints = {
  default: 5,
  900: 3,
  1200: 4
}

export class Inspiration extends React.Component<Props, {}> {
  async componentDidMount() {
    const { currentPage } = this.props
    if (currentPage < 0) {
      await this.handleLoadData()
    }
  }
  async componentDidUpdate(oldValues: Props) {
    const { selectedTags: oldSelectedTags, filters: oldFilters } = oldValues
    const { selectedTags, filters, resetInspirationData } = this.props
    if (selectedTags.length !== oldSelectedTags.length ||
      filters.length !== oldFilters.length) {
      resetInspirationData()
      await this.callInspirationApi()
    }
  }
  callInspirationApi = async (skip = 0) => {
    const {
      client: { query },
      setInspirationData,
      setLoading,
      selectedTags,
      filters
    } = this.props
    setLoading(true)
    try {
      const response = await query({
        query: GetInspirationQuery,
        variables: {
          limit: LIMIT,
          offset: skip,
          tags: selectedTags,
          filters
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

  handleSelectTag = (value: string) => {
    const { addTag } = this.props
    if (value) {
      addTag(upperFirst(value))
    }
  }

  handleRemoveTag = (value: string) => {
    const { removeTag } = this.props
    removeTag(value)
  }

  checkFilter = (event: CheckboxChangeEvent) => {
    const { removeFilter, addFilter } = this.props
    const { target: { name, checked } } = event
    !!checked ? addFilter('inspirationFilters', name) : removeFilter('inspirationFilters', name)
  }

  render() {
    const {
      inspiration,
      total,
      selectedItems,
      dataTags,
      selectedTags,
      filters,
      loading,
      onSelect,
      onDeselect,
      onExpandInspiration,
      formatMessage
    } = this.props
    const tags = get(dataTags, 'rows', [])
    const items = inspiration.map((item: InspirationType) => {
      const isSelected = includes(selectedItems, item.id)
      const handleOnSelectInspiration = () =>
        !isSelected ? onSelect(item.id, INSPIRATION_SELECTEED_ITEMS) : onDeselect(item.id, INSPIRATION_SELECTEED_ITEMS)
      const handleOnExpand = (event: React.MouseEvent) => {
        event.stopPropagation()
        onExpandInspiration(item.id, item.image, item.name, isSelected, item.tags || [])
      }
      return (
        <ImageContainer
            key={item.id}
            {...{isSelected}}
            onClick={handleOnSelectInspiration}
            selectedIndex={isSelected && selectedItems.findIndex((currentItem) => currentItem === item.id) + 1}
          >
            <LazyImage src={item.image} />
          <Expand src={expandIcon} onClick={handleOnExpand} />
        </ImageContainer>)
    })
    const loader = <LoadingContainer><Spin /></LoadingContainer>
    return (
      <Container>
        <TagsContainer>
          <Select
            size="large"
            mode="tags"
            value={selectedTags}
            onSelect={this.handleSelectTag}
            onDeselect={this.handleRemoveTag}
            placeholder={formatMessage(messages.inspirationSample)}
            showSearch={true}
            style={SearchTagStyle}
          >
            {tags.map((tag: Tag) => (
              <Option key={tag.value} value={tag.value}>{tag.value}</Option>
            ))}
          </Select>
          <TagPickers>
            {tags.map((tag: Tag, key: number) => {
              const isSelected = includes(selectedTags, tag.value)
              const selectTag = () => isSelected ? this.handleRemoveTag(tag.value) : this.handleSelectTag(tag.value)
              return key < 10 && (
              <TagPicker
                key={tag.value}
                className={isSelected ? 'selected' : ''}
                onClick={selectTag}
              >{tag.value}</TagPicker>
            )})}
          </TagPickers>
        </TagsContainer>
        <Filters>
          <Label>
              {formatMessage(messages.showOnly)}
          </Label>
          <Checkboxes>
            <StyledCheckbox
                name="photo"
                checked={!!includes(filters, 'photo')}
                onChange={this.checkFilter}
              >
              <CheckboxLabel>
                {formatMessage(messages.photos)}
              </CheckboxLabel>
            </StyledCheckbox>
            <StyledCheckbox
                name="graphic"
                checked={!!includes(filters, 'graphic')}
                onChange={this.checkFilter}
              >
                <CheckboxLabel>
                  {formatMessage(messages.graphics)}
                </CheckboxLabel>
            </StyledCheckbox>
            <StyledCheckbox
              name="kickstart"
              checked={!!includes(filters, 'kickstart')}
              onChange={this.checkFilter}
            >
              <CheckboxLabel>
                {formatMessage(messages.kickstart)}
              </CheckboxLabel>
            </StyledCheckbox>
          </Checkboxes>
        </Filters>
        <StyledInfiniteScroll
          useWindow={true}
          pageStart={0}
          loadMore={this.handleLoadData}
          initialLoad={true}
          hasMore={total > inspiration.length}
          {...{loader}}
        >
          {inspiration.length ? <Masonry
            key="masonry"
            breakpointCols={gridBreakPoints}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {items}
          </Masonry> : null}
          {!inspiration.length && !loading ?
            <EmptyMessage>{formatMessage(messages.emptyInspiration)}</EmptyMessage> : null}
        </StyledInfiniteScroll>
      </Container>
    )
  }
}

const InspirationEnhance = compose(
  withApollo,
  graphql<TagsData>(GetInspirationTags, { name: 'dataTags' }),
)(Inspiration)

export default InspirationEnhance
