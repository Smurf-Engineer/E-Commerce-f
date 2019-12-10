/**
 * SymbolTab Component - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import indexOf from 'lodash/indexOf'
import debounce from 'lodash/debounce'
import message from 'antd/lib/message'
import { getFileExtension } from '../../../utils/utilsFiles'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import Icon from 'antd/lib/icon'
import { compose } from 'react-apollo'
import Spin from 'antd/lib/spin'
import WithError from '../../../components/WithError'
import { CanvasElements } from '../../../screens/DesignCenter/constants'
import Symbol from '../ClipArt'
import {
  QueryProps,
  ClipArt,
  CanvasElement,
  MessagePayload
} from '../../../types/common'
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
  NotFound,
  ButtonContainer,
  DraggerContainer
} from './styledComponents'

interface Data extends QueryProps {
  clipArts: ClipArt[]
}

interface Props {
  data: Data
  uploadingSymbol: boolean
  searchClipParam: string
  symbols: ClipArt[]
  hiddenSymbols: { [id: string]: boolean }
  hideSymbol: (id: string) => void
  formatMessage: (messageDescriptor: any) => string
  setSearchClipParamAction: (searchParam: string) => void
  onUploadFile: (file: any) => void
}

class SymbolTab extends React.PureComponent<Props, {}> {
  searchrAfterTyping = debounce(
    param => this.props.setSearchClipParamAction(param),
    300
  )
  state = {
    page: 0
  }
  async componentWillReceiveProps(nextProps: any) {
    if (!nextProps.uploadingSymbol) {
      const { data } = this.props
      data.refetch()
    }
  }

  render() {
    const { page } = this.state
    const {
      data: { loading, clipArts },
      formatMessage,
      hideSymbol,
      hiddenSymbols,
      symbols,
      uploadingSymbol
    } = this.props
    const symbolArray = [...symbols, ...(clipArts || [])]
    const artList = symbolArray.length ? (
      symbolArray.map(
        ({ id, url, hidden }: ClipArt) =>
          !(hiddenSymbols[id] || hidden) && (
            <Col key={id}>
              <Symbol {...{ url, id }} onClickApply={hideSymbol} />
            </Col>
          )
      )
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
              <FormattedMessage {...messages.addSymbol} />
            </Title>
          </Row>
        </Header>
        <>
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
          <List>{symbolsList}</List>
        </>
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

  beforeUpload = (file: any) => {
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
  WithError
)(SymbolTab)

export default SymbolTabEnhance
