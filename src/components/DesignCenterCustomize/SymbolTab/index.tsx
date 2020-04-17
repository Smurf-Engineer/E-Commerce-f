/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import SwipeableViews from 'react-swipeable-views'
import last from 'lodash/last'
import Icon from 'antd/lib/icon'
import { compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import WithError from '../../WithError'
import OptionText from '../../OptionText'
import { CanvasElements } from '../../../screens/DesignCenter/constants'
import TextEditor from '../TextEditor'
import Symbol from '../ClipArt'
import {
  QueryProps,
  ClipArt,
  CanvasElement,
  PositionSize
} from '../../../types/common'
import { clipArtsQuery } from './data'
import messages from './messages'
import dragDropIcon from '../../../assets/dragdrop.svg'
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
  NotFound,
  LockContainer,
  AddTextButton,
  LayersText,
  ClipartsLayers,
  DeleteLayer,
  EditLayer,
  Layer,
  ClipartPrev,
  ClipartLeft,
  EmptyElements,
  DragIcon
} from './styledComponents'
import PositionResize from '../PositionResize'
import orderBy from 'lodash/orderBy'
import Draggable from '../../Draggable'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  selectedElement: CanvasElement
  selectedItem: number
  disableTooltip: boolean
  colorsList: any
  elements: {
    [id: string]: CanvasElement
  }
  activeEl: PositionSize
  hoverBlurLayer: (id: string, hover: boolean) => void
  moveLayer: (id: string, index: number) => void
  onDeleteLayer: (id: string) => void
  onSelectEl: (id: string, typeEl?: string) => void
  onPositionChange: (data: PositionSize, type: string) => void
  formatMessage: (messageDescriptor: any) => string
  onApplyArt: (
    url: string,
    style?: CanvasElement,
    fileId?: number,
    name?: string
  ) => void
  onSelectArtFormat: (key: string, value: string | number) => void
  setSearchClipParamAction: (searchParam: string) => void
  onLockElement: (id: string, type: string) => void
}

class SymbolTab extends React.PureComponent<Props, {}> {
  searchrAfterTyping = debounce(
    param => this.props.setSearchClipParamAction(param),
    300
  )
  state = {
    option: 0,
    page: 0,
    addSymbol: false
  }

  render() {
    const { page, option, addSymbol } = this.state
    const {
      data: { loading, clipArts },
      selectedElement,
      elements = {},
      formatMessage,
      activeEl,
      onPositionChange,
      selectedItem,
      colorsList
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
    const layersArray = Object.keys(elements).map((id: string) => elements[id])
    const elementsOrdered = orderBy(layersArray, ['index'], ['desc'])
    const arrayElements = elementsOrdered.map(
      ({ fill, stroke, strokeWidth, svg, id }, index) => (
        <Draggable
          {...{ id, index }}
          index={id}
          key={index}
          section="clipartLayers"
          onDropRow={this.handleMoveLayer}
        >
          <Layer
            {...{ id }}
            onMouseEnter={this.hoverLayer}
            onMouseLeave={this.blurLayer}
          >
            <DragIcon src={dragDropIcon} />
            <ClipartLeft>
              <ClipartPrev
                {...{ fill, stroke, strokeWidth }}
                dangerouslySetInnerHTML={{
                  __html: svg
                }}
              />
            </ClipartLeft>
            <DeleteLayer {...{ id }} onClick={this.onDeleteLayer}>
              {formatMessage(messages.delete)}
            </DeleteLayer>
            <EditLayer {...{ id }} onClick={this.onSelectLayer}>
              {formatMessage(messages.edit)}
            </EditLayer>
          </Layer>
        </Draggable>
      )
    )

    return (
      <Container>
        {(selectedElement || (!page && addSymbol)) && (
          <Header>
            <Row onClick={this.changePage(0, 0)}>
              <ArrowIcon src={backIcon} />
              <Title>
                <FormattedMessage
                  {...messages[page ? 'editSymbol' : 'backToLayers']}
                />
              </Title>
            </Row>
            {selectedElement && (
              <LockContainer onClick={this.handleOnLockElement}>
                <Icon type={selectedElement.lock ? 'lock' : 'unlock'} />
              </LockContainer>
            )}
          </Header>
        )}
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
                selected={!!selectedElement.strokeWidth}
              />
              <PositionResize
                {...{ activeEl }}
                handleChange={onPositionChange}
              />
            </div>
            <TextEditor
              {...{ option, formatMessage, colorsList }}
              strokeWidth={selectedElement.strokeWidth}
              onSelectFill={this.handleOnSelectFill}
              onSelectStrokeWidth={this.handleOnSelectStrokeWidth}
              onSelectStrokeColor={this.handleOnSelectStrokeColor}
            />
          </SwipeableViews>
        ) : (
          <div>
            {addSymbol ? (
              <>
                <InputWrapper>
                  <Input
                    onChange={this.handleOnUpdateText}
                    placeholder={formatMessage(messages.searchInputPlaceholder)}
                    addonAfter={<Button onClick={() => {}}>Search</Button>}
                  />
                </InputWrapper>
                <List height={50}>{symbolsList}</List>
              </>
            ) : (
              <>
                <AddTextButton onClick={this.addSymbol}>
                  {formatMessage(messages.addClipart)}
                </AddTextButton>
                <LayersText>{formatMessage(messages.clipartLayers)}</LayersText>
                <ClipartsLayers>
                  {arrayElements.length ? (
                    arrayElements
                  ) : (
                    <EmptyElements>
                      {formatMessage(messages.empty)}
                    </EmptyElements>
                  )}
                </ClipartsLayers>
              </>
            )}
          </div>
        )}
      </Container>
    )
  }

  handleMoveLayer = (dragId: string, dropId: string) => {
    const { elements, moveLayer } = this.props
    const { index } = elements[dropId]
    moveLayer(dragId, index)
  }

  addSymbol = () => {
    this.setState({ addSymbol: true })
  }

  goBackToLayer = () => {
    this.setState({ addSymbol: false })
  }

  hoverLayer = (evt: React.MouseEvent<EventTarget>) => {
    const { hoverBlurLayer } = this.props
    const {
      currentTarget: { id }
    } = evt
    hoverBlurLayer(id, true)
  }

  blurLayer = (evt: React.MouseEvent<EventTarget>) => {
    const { hoverBlurLayer } = this.props
    const {
      currentTarget: { id }
    } = evt
    hoverBlurLayer(id, false)
  }

  onSelectLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onSelectEl } = this.props
    onSelectEl(id, 'path')
  }

  onDeleteLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onDeleteLayer } = this.props
    onDeleteLayer(id)
  }

  handleOnUpdateText = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt

    this.searchrAfterTyping(value)
  }

  changePage = (page: number, option: number) => () => {
    const { page: oldPage } = this.state
    if (!page && !oldPage) {
      const { onSelectEl } = this.props
      onSelectEl('', 'path')
    }
    this.setState({ page, option, addSymbol: false })
  }

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
  handleOnLockElement = () => {
    const { selectedElement, onLockElement } = this.props
    onLockElement(selectedElement.id, CanvasElements.Path)
    this.forceUpdate()
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
