/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import SwipeableViews from 'react-swipeable-views'
import last from 'lodash/last'
import { compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import WithError from '../../WithError'
import OptionText from '../../OptionText'
import TextEditor from '../TextEditor'
import Symbol from '../ClipArt'
import { QueryProps, ClipArt, CanvasElement } from '../../../types/common'
import { clipArtsQuery } from './data'
import messages from './messages'
import backIcon from '../../../assets/leftarrow.svg'
import {
  Container,
  Header,
  Title,
  Input,
  InputWrapper,
  Button,
  Row,
  ArrowIcon,
  RowList,
  Col,
  List,
  Loading,
  NotFound
} from './styledComponents'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  selectedElement: CanvasElement
  selectedItem: number
  disableTooltip: boolean
  formatMessage: (messageDescriptor: any) => string
  onApplyArt: (
    url: string,
    style?: CanvasElement,
    fileId?: number,
    name?: string
  ) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  setSearchClipParamAction: (searchParam: string) => void
}

class SymbolTab extends React.PureComponent<Props, {}> {
  searchrAfterTyping = debounce(
    param => this.props.setSearchClipParamAction(param),
    300
  )
  state = {
    option: 0,
    page: 0
  }

  render() {
    const { page, option } = this.state
    const {
      data: { loading, clipArts },
      selectedElement,
      formatMessage,
      selectedItem
    } = this.props

    const artList =
      clipArts && !!clipArts.length ? (
        clipArts.map(({ id, url }) => (
          <Col key={id}>
            <Symbol
              {...{ url, id }}
              selected={selectedItem === id}
              onClickApply={this.handleOnApplyArt}
            />
          </Col>
        ))
      ) : (
        <NotFound>{formatMessage(messages.notFoundSymbol)}</NotFound>
      )

    const symbolsList = !loading ? (
      <RowList>{artList}</RowList>
    ) : (
      <Loading>
        <Spin />
      </Loading>
    )

    return (
      <Container>
        <Header>
          <Row onClick={this.changePage(0, 0)}>
            {!!page && <ArrowIcon src={backIcon} />}
            <Title>
              <FormattedMessage
                {...messages[selectedElement ? 'editSymbol' : 'addSymbol']}
              />
            </Title>
          </Row>
        </Header>
        {selectedElement ? (
          <SwipeableViews disabled={true} index={page}>
            <div>
              <OptionText
                onClick={this.changePage(1, 1)}
                title={formatMessage(messages.fill)}
                color={selectedElement.fill}
              />
              <OptionText
                onClick={this.changePage(1, 2)}
                title={formatMessage(messages.outline)}
                color={selectedElement.stroke}
              />
            </div>
            <TextEditor
              {...{ option, formatMessage }}
              strokeWidth={selectedElement.strokeWidth}
              onSelectFill={this.handleOnSelectFill}
              onSelectStrokeWidth={this.handleOnSelectStrokeWidth}
              onSelectStrokeColor={this.handleOnSelectStrokeColor}
            />
          </SwipeableViews>
        ) : (
          <div>
            <InputWrapper>
              <Input
                onChange={this.handleOnUpdateText}
                placeholder={formatMessage(messages.searchInputPlaceholder)}
                addonAfter={<Button onClick={() => {}}>Search</Button>}
              />
            </InputWrapper>
            <List height={50}>{symbolsList}</List>
          </div>
        )}
      </Container>
    )
  }

  handleOnUpdateText = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt

    this.searchrAfterTyping(value)
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })

  handleOnSelectFill = (fillColor: string) => {
    const { selectedElement, onSelectArtFormat, onApplyArt } = this.props
    onSelectArtFormat('fill', fillColor)
    selectedElement.fill = fillColor
    onApplyArt('', selectedElement)
  }

  handleOnSelectStrokeWidth = (strokeWidth: number) => {
    const { selectedElement, onSelectArtFormat, onApplyArt } = this.props
    onSelectArtFormat('strokeWidth', strokeWidth)
    selectedElement.strokeWidth = strokeWidth
    onApplyArt('', selectedElement)
  }

  handleOnSelectStrokeColor = (strokeColor: string) => {
    const { onSelectArtFormat, onApplyArt, selectedElement } = this.props
    onSelectArtFormat('stroke', strokeColor)
    selectedElement.stroke = strokeColor
    onApplyArt('', selectedElement)
  }

  handleOnApplyArt = (url: string, fileId: number) => {
    const { onApplyArt } = this.props
    const artName = last(url.split('/'))
    onApplyArt(url, undefined, fileId, artName)
  }
}
type OwnProps = {
  searchClipParam?: string
}
const SymbolTabEnhance = compose(
  graphql(clipArtsQuery, {
    options: ({ searchClipParam }: OwnProps) => ({
      variables: { query: searchClipParam }
    })
  }),
  WithError
)(SymbolTab)

export default SymbolTabEnhance
