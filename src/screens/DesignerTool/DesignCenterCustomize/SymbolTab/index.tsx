/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import indexOf from 'lodash/indexOf'
import debounce from 'lodash/debounce'
import message from 'antd/lib/message'
import { getFileExtension } from '../../../../utils/utilsFiles'
import SwipeableViews from 'react-swipeable-views'
import DraggerWithLoading from '../../../../components/DraggerWithLoading'
import Icon from 'antd/lib/icon'
import { compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import WithError from '../../../../components/WithError'
import OptionText from '../../../../components/OptionText'
import { CanvasElements } from '../../../../screens/DesignCenter/constants'
import TextEditor from '../TextEditor'
import Symbol from '../ClipArt'
import {
  QueryProps,
  ClipArt,
  CanvasElement,
  MessagePayload
} from '../../../../types/common'
import { clipArtsQuery, updateClipartMutation } from './data'
import messages from './messages'
import backIcon from '../../../../assets/leftarrow.svg'
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
  ButtonContainer,
  DraggerContainer
} from './styledComponents'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  selectedElement: CanvasElement
  selectedItem: number
  disableTooltip: boolean
  uploadingSymbol: boolean
  searchClipParam: string
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
  onUploadFile: (file: any) => void
  updateClipart: (variables: {}) => Promise<MessagePayload>
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
  async componentWillReceiveProps(nextProps: any) {
    if (!nextProps.uploadingSymbol) {
      const { data } = this.props
      data.refetch()
    }
  }

  render() {
    const { page, option } = this.state
    const {
      data: { loading, clipArts },
      selectedElement,
      formatMessage,
      selectedItem,
      uploadingSymbol
    } = this.props

    const artList =
      clipArts && !!clipArts.length ? (
        clipArts.map(({ id, url, hidden }) => (
          <Col key={id}>
            <Symbol
              {...{ url, id, hidden }}
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
          {selectedElement && (
            <LockContainer onClick={this.handleOnLockElement}>
              <Icon type={selectedElement.lock ? 'lock' : 'unlock'} />
            </LockContainer>
          )}
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
            <DraggerContainer>
              <DraggerWithLoading
                className="upload"
                loading={uploadingSymbol}
                onSelectImage={this.beforeUpload}
                formatMessage={formatMessage}
                extensions={['.svg']}
              >
                <Button>
                  <ButtonContainer>
                    <Icon type="upload" />
                  </ButtonContainer>
                </Button>
              </DraggerWithLoading>
            </DraggerContainer>
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

  handleOnApplyArt = async (url: string, fileId: number) => {
    const { updateClipart } = this.props
    await updateClipart({
      variables: { id: fileId }
    })
  }
  handleOnLockElement = () => {
    const { selectedElement, onLockElement } = this.props
    onLockElement(selectedElement.id, CanvasElements.Path)
    this.forceUpdate()
  }
  beforeUpload = async (file: any) => {
    const { formatMessage, onUploadFile } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (indexOf(['.svg'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file)
    }
    return false
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
  graphql(updateClipartMutation, { name: 'updateClipart' }),
  WithError
)(SymbolTab)

export default SymbolTabEnhance
