/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import SwipeableViews from 'react-swipeable-views'
import { compose } from 'react-apollo'
import withLoading from '../../WithLoading'
import WithError from '../../WithError'
import OptionText from '../../OptionText'
import TextEditor from '../TextEditor'
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
  Icon
} from './styledComponents'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  formatMessage: (messageDescriptor: any) => string
  selectedElement: CanvasElement
  onApplyArt: (url: string, style?: CanvasElement) => void
  onSelectArtFormat: (key: string, value: string | number) => void
}

class SymbolTab extends React.PureComponent<Props, {}> {
  state = {
    option: 0,
    page: 0
  }
  render() {
    const { page, option } = this.state
    const { data: { clipArts }, selectedElement, formatMessage } = this.props

    const artList = clipArts.map(({ id, url }) => (
      <Col key={id}>
        <Icon src={url} onClick={this.handleOnApplyArt(url)} />
      </Col>
    ))

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
          <SwipeableViews index={page}>
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
                // TODO: Commented until implement search function.
                // value={text}
                // onChange={this.handleOnUpdateText}
                placeholder={formatMessage(messages.searchInputPlaceholder)}
                addonAfter={<Button onClick={() => {}}>Search</Button>}
              />
            </InputWrapper>
            <List height={50}>
              <RowList>{artList}</RowList>
            </List>
          </div>
        )}
      </Container>
    )
  }

  changePage = (page: number, option: number) => () =>
    this.setState({ page, option })

  handleOnSelectFill = (fillColor: string) => {
    const { selectedElement, onSelectArtFormat, onApplyArt } = this.props
    onSelectArtFormat('fill', fillColor)
    this.setState({ page: 0 })
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
    this.setState({ page: 0 })
  }

  handleOnApplyArt = (url: string) => () => {
    const { onApplyArt } = this.props
    onApplyArt(url)
  }
}

const SymbolTabEnhance = compose(clipArtsQuery, WithError, withLoading)(
  SymbolTab
)

export default SymbolTabEnhance
